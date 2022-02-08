import { Button } from "react-bootstrap";
import "../../styles/UserPost.css"
import FadeIn from 'react-fade-in';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const UserPost = (s) => {
  const USER_POST_URL = process.env.REACT_APP_USER_POST_URL
  // const POST_LIST_URL = process.env.REACT_APP_POST_LIST_URL
  // const memberId = s.location.state.memberId
  const memberId = 1
  const [userPosts, setUserPosts] = useState([])
  
  useEffect(() => {
    const fetchData = async() =>{
      const memberPosts = await axios.get(`${USER_POST_URL}/${memberId}`)
      setUserPosts(memberPosts.data)
    }
    fetchData();
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
  },[USER_POST_URL])
  
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
                  {/* 여기도 기본 이미지가 필요하네용 */}
                  <div className="img-box">
                    {/* <img src={post.photo.data}></img> */}
                    <img src='\img\f2.png' alt=""></img>
                  </div>
                  
                  {/* 포스트 카드 내용 */}
                  <div className="postdetail-box">
                    {/* 포스트 내용 + 자세히 버튼 */}
                    <div className="postdetail-title">
                      <h5>{post.content&&post.content.length > 15 ? post.content.substr(0, 15) + "....": post.content}</h5>
                      <Link to={`/post/${post.postId}`} className='detailBtn'>자세히</Link>
                    </div>

                    {/* 포스트 좋아요 */}
                    <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
                    
                    {/* 포스트 작성 정보 */}
                    <p className="post-meta">작성한 사람 :{post.member.nickName} <br/> 
                      {/* 작성 시간 : {post.created_at} */}
                    </p>
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