import { useEffect, useState } from "react";
import axios from "axios"
import { useParams, Link, Route, Switch, useHistory } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import '../../styles/PostDetail.css'
import CommentList from "./CommentList";
import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useDispatch, useStore } from "react-redux";
// import { useHistory } from 'react-router-dom';

function PostDetail() {
  const POST_DETAIL_URL = process.env.REACT_APP_POST_DETAIL_URL
  const POST_DETAIL_LOG_URL = process.env.REACT_APP_POST_DETAIL_LOG_URL
  const [postData, setPost] = useState()
  const [postImg, setPostImg] = useState()
  const [isLike, setisLike] = useState(false)
  const [updateContent, setText] = useState();
  const [hashtagArr, setHashtagArr] = useState([])
  const [hashtag, setHashtag] = useState("")

  const postId = useParams().postId;
  const store = useStore((state)=>state)
  const dispatch = useDispatch();
  const history = useHistory();
  
  const UpdateContent = (e) => {
    setText(e.target.value)
  }

  const DeletePost = async() => {
    try{
      const postDeleteUrl = `${POST_DETAIL_URL}/${postId}`
      await axios.delete(postDeleteUrl)
      dispatch({ type : "postDelete"})
      history.push("/post")
    }catch{
      console.log("오류")
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


  const addHashTag = ((e)=>{
    e.preventDefault()
    if (hashtag.trim() !== "") {
      setHashtagArr([hashtag, ...hashtagArr])
    }
  })

  const deleteHashTag = ((e)=>{
    e.preventDefault()
    const hashTagKey = e.target.attributes.hashTagKey.value // 중복확인? pass!
    const hashContent = e.target.textContent
    const existHashList = hashtagArr.filter((hash)=> hash !== hashContent)
    setHashtagArr(existHashList)
  })

  const changePost = (async (e)=>{
    try{
      e.preventDefault() //우선 그냥 막아놨음
      const putPostApiUrl = `${POST_DETAIL_URL}${postId}`
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
      const putData = await axios.put(putPostApiUrl, requestUpdatePostDto, headers)
      dispatch({type:"updatePost", updateContent:updateContent, updateHashTag:hashtagArr})
      setPost(store.getState().postDetailReducer)
      history.push(`post/${postId}`)
    }catch{
      console.log("오류")
    }
  })

  // postDetail 불러오는 것 (리덕스에 저장)
  useEffect(async ()=>{
    try{
      const responseDetail = await axios.get(`${POST_DETAIL_URL}/${postId}`)
      // const responseDetail = await axios.get(`http://13.125.157.39:8080/v1/post/${postId}`)
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
      axios.post(POST_DETAIL_LOG_URL, newdata, {headers})
        // .post("http://i6c107.p.ssafy.io:8080/v1/log", newpost, {headers})
      
      // const storage = getStorage()
      // const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${postDetail.postId}/`)
      // getDownloadURL(storageRef)
      // .then((url)=>{
      //   console.log(url)
      //   setPostImg(url)
      // })
      // console.log(postData)

      dispatch({type:"postDetailLoading", postDetail: postDetail}) // 추후 이미지도 추가?
      setPost(store.getState().postDetailReducer)
      setText(store.getState().postDetailReducer.content) // update
      setHashtagArr(store.getState().postDetailReducer.userHashTags) // update
    }catch (error) {
      console.log(error)
    }
  }, [])

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

              {/* 이미지(수정필요) */}
              <div className="col-md-6 ">
                <div className="img-box">
                  <img src='\img\5.0_오리지날_라거_medium_-removebg-preview.png'></img> {/* postImg */}
                </div>
              </div>

              {/* 포스트 디테일 */}
              <div className="col-md-6">
                <div className="detail-box">

                  <div className="postdetail_heading">

                    <div className="postdetail_likecomment">
                      {/* 좋아요 하트 (수정필요) */}
                      <div className="heartInline">
                        {
                          isLike === true
                          ? <BsHeart className="heartIcon" size="23" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                          : <BsHeartFill className="heartIcon" size="23" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                        }
                        <div className="count">{ postData.likeMembers.length }</div>
                      </div>
                      {/* 댓글 */}
                      <div className="commentInline">
                        <i className="fas fa-comment fs-4"></i>
                        <div className="count">{postData.comments.length}</div>
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
                          {console.log(hashtagArr)}
                          <button type="submit" className="addHashBtn" onClick={addHashTag}>추가</button>
                        </div>
                        {/* 해시태그 */}
                        {hashtagArr.map((hash, i)=>{
                          return(<div className="hashtag_wrap_inner" hashTagKey={i} onClick={deleteHashTag}>{hash}</div>)
                        })}        
                      </div>
                      <button onClick={changePost}>완료</button>

                    </Route>
                    <Route path="/post/:postId">
                      {/* 해시태그 */}
                      <div className="postdetail_hashtag">
                        {postData.userHashTags.map((hash, i)=>{
                          return(<span className="postTag" hashTagKey={i}>#{hash}</span>)
                        })}
                      </div>

                      {/* 포스트 내용 */}
                      <p>{ postData.content }</p>

                      {/* 작성날짜 */}
                      <div className="userdetail">
                        <div>작성자 : { postData.member.nickName } </div>
                        {/* <div>작성날짜 : { postData.created_at }</div> */}
                      </div>

                      {/* 본인 일때만 수정, 삭제 가능하게 해야함 */}
                      <Link to={`/post/${postId}/update`}>수정하기</Link>
                      <button onClick={DeletePost}>삭제하기</button>

                      {/* <div className="updateBtn">수정하기</div> */}
                      <div className="deleteBtn">수정하기</div>
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
