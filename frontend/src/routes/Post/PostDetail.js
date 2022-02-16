import { useEffect, useState, useCallback } from "react";
import { useParams, Link, Route, Switch, useHistory } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import '../../styles/PostDetail.css'
import CommentList from "./CommentList";
import { useDispatch, useStore } from "react-redux";
import PostDetailImages from "../../components/Post/PostDetailImages"
import { deleteObject, getStorage, ref } from "firebase/storage";
import axiosInstance from "CustomAxios";

function PostDetail() {
  //url
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8080/v1/member/profile'
  const POST_DETAIL_URL = process.env.REACT_APP_SERVER + ':8080/v1/post'
  const POST_DETAIL_LOG_URL = process.env.REACT_APP_SERVER + ':8080/v1/log'
  const RANKING_POST_DLELETE_URL = process.env.REACT_APP_SERVER + ":8081/post"
  const RANKING_POST_LIKE_URL = process.env.REACT_APP_SERVER + ":8081/post/like"
  const RANKING_POST_URL = process.env.REACT_APP_SERVER + ":8081/post/view"
  const POST_LIKE_URL = process.env.REACT_APP_SERVER + ':8080/v1/member'
  
  //basic data
  
  const history = useHistory();
  const postId = useParams().postId;
  const storage = getStorage(); //firebase

  //redux
  const dispatch = useDispatch();
  const store = useStore((state)=>state)
  
  //useState
  const [postData, setPost] = useState()
  const [updateContent, setText] = useState();
  const [hashtagArr, setHashtagArr] = useState([])
  const [hashtag, setHashtag] = useState("")
  
  // 좋아한 맥주들
  // const [likeposts, setLikeposts] = useState([])
  const [isLiked, setIsLiked] = useState()
  const [postlikeNum, setPostlikeNum] = useState()


  const memberId = store.getState().userReducer.memberId
  console.log(memberId)
  //function
  // Content 수정 (/post/:postId/update)
  const UpdateContent = (e) => {
    setText(e.target.value)
  }

  // Post Delete
  const DeletePost = async() => {
    try{
      const postDeleteUrl = `${POST_DETAIL_URL}/${postId}`
      const rankingPostDeleteUrl = `${RANKING_POST_DLELETE_URL}/${postId}`

      // DB post 삭제
      await axiosInstance.delete(postDeleteUrl)
      dispatch({ type : "postDelete"})

      // firebase image 삭제
      const imgUrl = postData.photos.map((photo)=> photo.data)
      for (let i = 0; i<imgUrl.length; i++) {
        const deleteStorage = ref(storage, imgUrl[i])
        await deleteObject(deleteStorage)
      }

      // ranking
      const headers = {
        'Accept': "application/json; charset=UTF-8"
      }
      await axiosInstance.delete(rankingPostDeleteUrl, headers)

      // 포스트 삭제시 사용자 등급점수 감소
      const profiledata = store.getState().profileReducer
      profiledata['grade'] = profiledata['grade'] - 10
      axiosInstance.put(USER_UPDATE_PROFILE, profiledata)

      // 포스트 삭제 완료되면 post 리스트 페이지로 넘겨준다
      history.push("/post")
    }catch{
      console.log("오류")
      history.push("/post")
    }
  }

  // 해시태그 input 입력값 
  const inputHashTag = ((e)=>{
    setHashtag(e.target.value)
  })

  // space, enter눌렸을 때 막기
  const pressKey = ((e)=>{
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.target.value = e.target.value.replace(' ','')
      e.target.value = e.target.value.replace('\n','')
    }
  })

  // HashTag 추가 (/post/:postId/update)
  const addHashTag = ((e)=>{
    e.preventDefault()
    if (hashtag.trim() !== "") {
      setHashtagArr([hashtag, ...hashtagArr])
      setHashtag("")
    }
  })

  // 해시태그 삭제
  const deleteHashTag = ((e)=>{
    e.preventDefault()
    const hashContent = e.target.textContent
    const existHashList = hashtagArr.filter((hash)=> hash !== hashContent)
    setHashtagArr(existHashList)
  })

  // post 수정 (content, hashtag)
  const changePost = (async (e)=>{
    try{
      const putPostApiUrl = `${POST_DETAIL_URL}/${postId}`
      const requestUpdatePostDto  = {
        "content": updateContent,
        "postId": postId,
        "userHashTags": hashtagArr
      }
      const headers = {
        headers: {
          "Accept" : "application/json;charset=UTF-8",
          "Content-Type" : "application/json;charset=UTF-8"
        }
      }
      await axiosInstance.put(putPostApiUrl, requestUpdatePostDto, headers)
      dispatch({type:"updatePost", updateContent:updateContent, updateHashTag:hashtagArr})
      setPost(store.getState().postDetailReducer)
      history.push(`post/${postId}`)
    }catch{
      console.log("오류")
    }
  })

  // 좋아요
  const likeButton = async () => {
    try{
      setIsLiked(!isLiked)
      if (isLiked) {
        setPostlikeNum(postlikeNum-1)
      } else {
        setPostlikeNum(postlikeNum+1)
      }

      // 좋아요 post 보내기
      axiosInstance.post(`${POST_LIKE_URL}/post/${memberId}/like/${postId}`)
      .then(console.log('좋아요완료'))
      
      // 랭킹 get
      const rankingPostLikeeUrl = `${RANKING_POST_LIKE_URL}/${postId}/1`
      const headers = {
        'Accept': "application/json; charset=UTF-8"
      }
      await axiosInstance.get(rankingPostLikeeUrl, headers)
    }catch{
      console.log("오류")
    }
  }

  // postDetail 데이터 불러오기
  const fetchData = useCallback( async () =>{
    try{
      const responseDetail = await axiosInstance.get(`${POST_DETAIL_URL}/${postId}`)
      
      const postDetail = responseDetail.data

      const hashTagArr = [postDetail.beer.beerType.main, ...postDetail.beer.aromaHashTags , ...postDetail.beer.flavorHashTags]
      const newdata = {
        id : 1,
        tags : hashTagArr
      }
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json; charset=UTF-8"
      }
      axiosInstance.post(POST_DETAIL_LOG_URL, newdata, {headers})  
      dispatch({type:"postDetailLoading", postDetail: postDetail}) // 추후 이미지도 추가?
      setPost(store.getState().postDetailReducer)
      setText(store.getState().postDetailReducer.content) // update
      setHashtagArr(store.getState().postDetailReducer.userHashTags) // update

      // 좋아한 포스트 목록
      const { data : postlikedata } = await axiosInstance.get(`${POST_LIKE_URL}/${memberId}/like/post`)
      // setLikeposts(postlikedata.data)

      for (let i in postlikedata.data) {
        if (postlikedata.data[i].postId === Number(postId)) {
          setIsLiked(true)    // 이 맥주 좋아요 눌렀으면 isLiked=true
        }
      }
      setPostlikeNum(postDetail.likeMembers.length)

    }catch (error) {
      console.log(error)
    }
  }, [POST_DETAIL_LOG_URL, POST_DETAIL_URL, POST_LIKE_URL, dispatch, postId, store])

  // postDetail 불러오는 것 (리덕스에 저장)
  useEffect(()=>{
    fetchData();
  }, [fetchData])

  // 랭킹
  const spendData = useCallback( async () => {
    try{
      const rankingPostUrl = `${RANKING_POST_URL}/${postId}/1` //추후 memberId 수정필요
      const headers = {
        'Accept': "application/json; charset=UTF-8"
      }
      axiosInstance.get(rankingPostUrl, headers)
    }catch{
      console.log("오류입니다")
    }
  }, [RANKING_POST_URL, postId])

  useEffect(() => {
    spendData()
  }, [spendData])

  return (
    <div className="PostDetail">
      {
        postData &&
        <section className="postdetail_section layout_padding_postdetail">
          <div className="container">

            {/* 목록으로 가기 버튼 */}
            <div className='backBtn'>
              <Link className='btnText' to='/post'><i className="fas fa-angle-double-left fa-lg"></i> 목록으로</Link>
            </div>

            <div className="row">
            {/* 포스트 이미지 */}
              <PostDetailImages />            
              {/* 포스트 디테일 */}
              <div className="col-md-6">
                <div className="detail-box">

                  <div className="postdetail_heading">

                    <div className="postdetail_likecomment">
                      {/* 좋아요 하트 (수정필요) */}
                      <div className="heartInline">
                        {
                          isLiked === true
                          ? <BsHeartFill className="heartIcon" size="23" onClick={likeButton}></BsHeartFill>
                          : <BsHeart className="heartIcon" size="23" onClick={likeButton}></BsHeart>
                        }
                        <div className="count">{ postlikeNum }</div>
                      </div>
                      
                    </div>

                    {/* 맥주이름 버튼 */}
                    <Link to={`/beer/${postData.beer.beerId}`}>
                      <div className="beerName" href="">{postData.beer.name}</div>
                    </Link>
                    
                  </div>

                  <Switch>
                    <Route path="/post/:postId/update">
                      <input
                        type="text"
                        value={updateContent}
                        onChange={UpdateContent}
                      ></input>

                      <div className="hashtag_wrap">
                        <div className="hashtag_wrap_outer">
                          <textarea 
                            value={hashtag}
                            onKeyUp={pressKey}
                            onChange={inputHashTag}
                            className="postcreate_textarea hashtag_input"
                            placeholder="해시태그 입력..."
                            rows="1"
                            // cols='50'
                          >
                          </textarea>
                          
                          <button type="submit" className="addHashBtn" onClick={addHashTag}>추가</button>
                        </div>
                        {/* 해시태그 */}
                        {hashtagArr.map((hash, i)=>
                          <div className="hashtag_wrap_inner" key={i} onClick={deleteHashTag}>{hash}</div>
                        )}
                        {/* { postData.userHashTags.map((tag, i)=>{
                            return(<div className="hashtag_wrap_inner" key={i}>{tag.content}</div>)
                          }) } */}
                        
                      </div>
                      <button onClick={changePost}>완료</button>

                    </Route>
                    <Route path="/post/:postId">
                      {/* 해시태그 */}
                      <div className="postdetail_hashtag">
                        {postData.userHashTags.map((hash, i)=>
                          <div className="postTag" key={i}>#{hash}</div>
                        )}
                        {/* { postData.userHashTags.map((tag, i)=>{
                            return(<span className="postTag" key={i}>#{tag.content}</span>)
                          }) } */}
                      </div>

                      {/* 포스트 내용 */}
                      <p>{ postData.content }</p>

                      {/* 작성날짜 */}
                      <div className="userdetail">
                      <Link to={`/profile/${postData.member.memberId}/post`}><div>작성자 : { postData.member.nickName } </div></Link>
                        
                        {/* <div>작성날짜 : { postData.created_at }</div> */}
                      </div>

                      {/* 본인 일때만 수정, 삭제 가능하게 해야함 */}
                      <Link to={`/post/${postId}/update`}>수정하기</Link>
                      <button onClick={DeletePost}>삭제하기</button>

                      {/* <div className="updateBtn">수정하기</div> */}
                      {/* <div className="deleteBtn">수정하기</div> */}
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
