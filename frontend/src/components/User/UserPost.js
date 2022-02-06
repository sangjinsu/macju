import { Button } from "react-bootstrap";
import PostList from "routes/Post/PostList";
import "../../styles/UserPost.css"
import FadeIn from 'react-fade-in';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const UserPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  // useEffect(async () => {
  //   const json = await axios.get(`http://i6c107.p.ssafy.io:8080/v1/post/member/${memberId}`)
  //   .then((res)=>{
  //     console.log('zz')
  //   })
  // })
  return (
    <>
    <FadeIn>
        <div className="row grid">

          {/* 포스트 카드 각각 */}
          { userPosts&&userPosts.map((post) =>
            <div className="col-md-6 col-lg-4 fadein" key={post.id}>
              <div className="box">
                <div className="postlist_box">

                  {/* 포스트 이미지 */}
                  <div className="img-box">
                    <img src={post.img}></img>
                  </div>
                  
                  {/* 포스트 카드 내용 */}
                  <div className="postdetail-box">
                    {/* 포스트 내용 + 자세히 버튼 */}
                    <div className="postdetail-title">
                      <h5>{userPosts&&userPosts.post.length > 15 ? userPosts.post.substr(0, 15) + "....": userPosts.post}</h5>
                      <Link to={`/post/${userPosts.id}`} className='detailBtn'>자세히</Link>
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