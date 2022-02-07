import { Button } from "react-bootstrap";
import PostList from "routes/Post/PostList";
import "../../styles/UserPost.css"
import FadeIn from 'react-fade-in';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const UserPost = (s) => {
  // const memberId = s.location.state.memberId
  const memberId = 1
  const [userPosts, setUserPosts] = useState([])
  const [postimgs, setPostimgs] = useState([])    // 포스트 이미지들
  useEffect(async () => {
    const memberPosts = await axios.get(`http://i6c107.p.ssafy.io:8080/v1/post/member/${memberId}`)
    setUserPosts(memberPosts.data)


  ////// 포스트 이미지 가져오기
  // const storage = getStorage()
  //   for(var i=0, j=datalist.length; i<j; i++) {
  //     // console.log(datalist[i])
  //     const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${userpostdata[i].postId}/${userpostdata[i].photo.data}`)
  //     getDownloadURL(storageRef)
  //     .then((url)=>{
  //       setPostimgs((prev)=>[...prev,url])
  //     })
  //   }
  


  },[])
  
  return (
    <>
    <FadeIn>
        <div className="row grid">
          
          {/* 포스트 카드 각각 */}
          { userPosts&&userPosts.map((post, index) =>
            <div className="col-md-6 col-lg-4 fadein" key={post.postId}>
              <div className="box">
                <div className="postlist_box">

                  {/* 포스트 이미지 */}
                  <div className="img-box">
                    <img src={post.photo.data}></img>
                  </div>
                  
                  {/* 포스트 카드 내용 */}
                  <div className="postdetail-box">
                    {/* 포스트 내용 + 자세히 버튼 */}
                    <div className="postdetail-title">
                      <h5>{post.content&&post.content.length > 15 ? post.content.substr(0, 15) + "....": post}</h5>
                      <Link to={`/post/${post.postId}`} className='detailBtn'>자세히</Link>
                    </div>

                    {/* 포스트 좋아요 */}
                    <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
                    
                    {/* 포스트 작성 정보 */}
                    <p className="post-meta">작성한 사람 :{null} <br/> 작성 시간 : {post.created_at}</p>
                  </div>
                </div>
              </div>
            </div> 
          )}

        </div>
        </FadeIn>
    <div className="post-btn"><Button>see more</Button></div>
    </>
  )
}
export default UserPost;