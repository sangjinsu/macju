import { useEffect, useState, useCallback } from "react";
import { useParams, Link, Route, Switch, useHistory } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import '../../styles/PostDetail.css'
import CommentList from "./CommentList";
import { useDispatch, useStore } from "react-redux";
import PostDetailImages from "../../components/Post/PostDetailImages"
import { deleteObject, getStorage, ref } from "firebase/storage";
import Chip from '@mui/material/Chip'
import axiosInstance from "CustomAxios";

function PostDetail() {
  const POST_DETAIL_URL = process.env.REACT_APP_SERVER + ':8888/v1/post'
  const POST_DETAIL_LOG_URL = process.env.REACT_APP_SERVER + ':8888/v1/log'
  const RANKING_POST_DLELETE_URL = process.env.REACT_APP_SERVER + ":8888/post"
  const RANKING_POST_LIKE_URL = process.env.REACT_APP_SERVER + ":8888/post/like"
  const RANKING_POST_URL = process.env.REACT_APP_SERVER + ":8888/post/view"
  const POST_LIKE_URL = process.env.REACT_APP_SERVER + ':8888/v1/member'
  const history = useHistory();
  const postId = useParams().postId;
  const storage = getStorage(); 
  const dispatch = useDispatch();
  const store = useStore((state)=>state)
  const [postData, setPost] = useState()
  const [updateContent, setText] = useState();
  const [hashtagArr, setHashtagArr] = useState([])
  const [hashtag, setHashtag] = useState("")
  const [isLiked, setIsLiked] = useState()
  const [postlikeNum, setPostlikeNum] = useState()
  const memberId = Number(store.getState().userReducer.memberId)
  const UpdateContent = (e) => {
    setText(e.target.value)
  }
  const DeletePost = async() => {
    try{
      const postDeleteUrl = `${POST_DETAIL_URL}/${postId}`
      const rankingPostDeleteUrl = `${RANKING_POST_DLELETE_URL}/${postId}`
      await axiosInstance.delete(postDeleteUrl)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
      dispatch({ type : "postDelete"})
      const imgUrl = postData.photos.map((photo)=> photo.data)
      for (let i = 0; i<imgUrl.length; i++) {
        const deleteStorage = ref(storage, imgUrl[i])
        await deleteObject(deleteStorage)
      }
      await axiosInstance.delete(rankingPostDeleteUrl)
      history.push("/post")
    }catch(err){
      console.log(err)
      history.push("/post")
    }
  }
  const inputHashTag = ((e)=>{
    setHashtag(e.target.value)
  })
  const pressKey = ((e)=>{
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.target.value = e.target.value.replace(' ','')
      e.target.value = e.target.value.replace('\n','')
    }
  })
  const addHashTag = ((e)=>{
    e.preventDefault()
    if (hashtag.trim() !== "") {
      if (!hashtagArr.includes(hashtag.trim())){
        setHashtagArr([hashtag, ...hashtagArr])
      }
      
      setHashtag("")
    }
  })
  const deleteHashTag = ((e)=>{
    // e.preventDefault()
    const hashContent = `#${e.target.textContent}`
    const existHashList = hashtagArr.filter((hash)=> hash !== hashContent)
    setHashtagArr(existHashList)
  })
  const changePost = (async (e)=>{
    if (hashtagArr.length === 0) {
      alert("해시태그를 입력해주세요!!")
    }else{
      try{
        const putPostApiUrl = `${POST_DETAIL_URL}/${postId}`
        const requestUpdatePostDto  = {
          "content": updateContent,
          "postId": postId,
          "userHashTags": hashtagArr
        }
        await axiosInstance.put(putPostApiUrl, requestUpdatePostDto)
        dispatch({type:"updatePost", updateContent:updateContent, updateHashTag:hashtagArr})
        setPost(store.getState().postDetailReducer)
        history.push(`post/${postId}`)
      }catch(err){
        console.log(err)
      }
    }
  })
  const likeButton = async () => {
    try{
      setIsLiked(!isLiked)
      if (isLiked) {
        setPostlikeNum(postlikeNum-1)
      } else {
        setPostlikeNum(postlikeNum+1)
      }
      axiosInstance.post(`${POST_LIKE_URL}/post/${memberId}/like/${postId}`)
      const rankingPostLikeeUrl = `${RANKING_POST_LIKE_URL}/${postId}/${memberId}`
      await axiosInstance.get(rankingPostLikeeUrl)
    }catch(err){
      console.log(err)
    }
  }
  const fetchData = useCallback( async () =>{
    try{
      const responseDetail = await axiosInstance.get(`${POST_DETAIL_URL}/${postId}`)
      const postDetail = responseDetail.data
      const hashTagArr = [postDetail.beer.beerType.en_main, ...postDetail.beer.aromaHashTags , ...postDetail.beer.flavorHashTags]
      const newdata = {
        id : memberId,
        tags : hashTagArr
      }
      axiosInstance.post(POST_DETAIL_LOG_URL, newdata)  
      dispatch({type:"postDetailLoading", postDetail: postDetail}) 
      setPost(store.getState().postDetailReducer)
      setText(store.getState().postDetailReducer.content) 
      setHashtagArr(store.getState().postDetailReducer.userHashTags) 
      const { data : postlikedata } = await axiosInstance.get(`${POST_LIKE_URL}/${memberId}/like/post`)
      for (let i in postlikedata.data) {
        if (postlikedata.data[i].postId === Number(postId)) {
          setIsLiked(true)   
        }
      }
      setPostlikeNum(postDetail.likeMembers.length)

    }catch (error) {
      console.log(error)
    }
  }, [POST_DETAIL_LOG_URL, POST_DETAIL_URL, POST_LIKE_URL, dispatch, postId, store, memberId])
  useEffect(()=>{
    fetchData();
  }, [fetchData])
  const spendData = useCallback( async () => {
    try{
      const rankingPostUrl = `${RANKING_POST_URL}/${postId}/${memberId}`
      axiosInstance.get(rankingPostUrl)
    }catch(err){
      console.log(err)
    }
  }, [RANKING_POST_URL, postId, memberId])

  useEffect(() => {
    spendData();
  }, [spendData])

  return (
    <div className="PostDetail">
      {
        postData &&
        <section className="postdetail_section layout_padding_postdetail">
          <div className="container">
            <div className='backBtn'>
              <Link className='btnText' to='/post'><i className="fas fa-angle-double-left fa-lg"></i> 목록으로</Link>
            </div>
            <div className="row">
              <PostDetailImages />            
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="postdetail_heading">
                    <div className="postdetail_likecomment">
                      <div className="heartInline">
                        {
                          isLiked === true
                          ? <BsHeartFill className="heartIcon" size="23" onClick={likeButton}></BsHeartFill>
                          : <BsHeart className="heartIcon" size="23" onClick={likeButton}></BsHeart>
                        }
                        <div className="count">{ postlikeNum }</div>
                      </div>
                      
                    </div>
                    <Link to={`/beer/${postData.beer.beerId}`} style={{ textDecoration: 'none' }}>
                      <Chip className="maintype" label={postData.beer.name} variant="outlined" />
                    </Link>
                  </div>

                  <Switch>
                    {/* 포스트 수정하기 페이지 */}
                    <Route path="/post/:postId/update">
                      <textarea
                        type="text"
                        value={updateContent}
                        onChange={UpdateContent}
                        className="postupdate_input"
                      ></textarea>
                      <div className="hashtag_wrap">
                        <div className="hashtag_wrap_outer">
                          <textarea 
                            value={hashtag}
                            onKeyUp={pressKey}
                            onChange={inputHashTag}
                            className="postcreate_textarea hashtag_input"
                            placeholder="해시태그를 클릭하면 지워집니다!"
                            rows="7"
                            cols="40"
                          >
                          </textarea>
                          <button type="submit" className="addHashBtn" onClick={addHashTag}>추가</button>
                        </div>
                        {hashtagArr.map((hash, i)=>
                          <div className="hashtag_wrap_inner" key={i} onClick={deleteHashTag}>#{hash}</div>
                        )}
                      </div>
                      <div className="row">
                        <button className="post_sumbit_button col-4 offset-4" onClick={changePost}>완료</button>
                      </div>
                    </Route>

                    {/* 포스트 디테일 페이지 */}
                    <Route path="/post/:postId">
                      <div className="postdetail_hashtag">
                        {postData.userHashTags.map((hash, i)=>
                          <div className="postTag" key={i}>#{hash}</div>
                        )}
                      </div>
                      <p>{ postData.content }</p>
                      <div className="postdetail_spacebetween">
                        <div className="userdetail">
                          <Link to={`/profile/${postData.member.memberId}/post`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div><i className="fas fa-user fa-lg"></i> { postData.member.nickName } </div>
                          </Link>
                          <div className="date">작성 날짜 : {postData.updatedAt[0]}.{postData.updatedAt[1]}.{postData.updatedAt[2]}</div>
                        </div>
                        <div className="update_delete_icon">
                          { memberId === postData.member.memberId
                          ?<Link to={`/post/${postId}/update`}><i className="far fa-edit fa-2x"></i></Link>
                          :null
                          }
                          { memberId === postData.member.memberId
                          ?<i className="fas fa-trash fa-2x trash-icon" onClick={DeletePost}></i>
                          :null
                          }
                        </div>
                      </div>

                    </Route>
                  </Switch>

                  
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      <CommentList postId={postId} />
    </div>
  )
  }
export default PostDetail;
