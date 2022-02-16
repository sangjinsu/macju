import { Button } from "react-bootstrap";
import "../../styles/UserPost.css"
import FadeIn from 'react-fade-in';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import { useStore } from "react-redux";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "../../styles/UserPost.css"
import axiosInstance from "CustomAxios";
import UserIcon from "./UserIcon"

const UserPost = (props) => {
  const USER_POST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post/member'
  const store = useStore((state) => state)


  const memberId = props.state

  const [userPosts, setUserPosts] = useState([])

  const [userPostImages, setUserPostImages] = useState([])
  const storage = getStorage();
  useEffect(() => {
    const fetchData = async() =>{
      const memberPosts = await axiosInstance.get(`${USER_POST_URL}/${memberId}`)
      console.log(memberPosts)
      setUserPosts(memberPosts.data)
    }
    fetchData();

  ////// 포스트 이미지 가져오기
  
  },[USER_POST_URL, memberId])
  
  


  useEffect(()=> {
    const fetchData = async() =>{
      const imageList = []
      for (let i = 0; i < userPosts.length; i++) {
        const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${userPosts[i].postId}/${userPosts[i].photo.data}`)
        await getDownloadURL(storageRef)
        .then((res)=>{
          if (!userPostImages.some((url)=>url===res)){
            imageList.push({id:userPosts[i].postId, res})
          }
        })
        
    }
    setUserPostImages(imageList)
  }

    fetchData();
  //eslint-disable-next-line
  }, [userPosts])




  return (
    <section className="userpost_section layout_padding_postlist">

    <div className="container">
      <h1 className="font">Posts</h1>
      <div className="row grid postlist_component">
    {console.log(userPosts)}
      { userPosts.length === 0 ? <div className="noPost"> 포스트를 작성해주세요~! </div> : userPosts.map((post) =>
        <div className="col-md-6 col-lg-4 fadein" key={post.postId}>
          <div className="box">
            <div className="postlist_box">
                            
              {/* 포스트 이미지 */}
              {userPostImages&&userPostImages.map((data, i)=> data.id === post.postId ? 
              
                <div key={i} className="img-box">
                  {/* 기본이미지 하나 구해야겠네요 */}
                  <img src={data.res} alt=""></img>
                  {/* <img src={post.photo.data}></img> */}
                </div> : <>
            <UserIcon grade={2500}/>

            <div id="text" style={{marginTop:50 ,textAlign:'center'}}>아직 작성한 게시글이 없습니다.</div>
            </>
                )
              }
          
              
              
              {/* 포스트 카드 내용 */}
              <div className="postdetail-box">
                {/* 포스트 내용 + 자세히 버튼 */}
                <div className="postdetail-title">
                  {/* <h5>{post.content}</h5> */}
                  <h5>{post.content && post.content.length > 15 ? post.content.substr(0, 15) + "....": post.content}</h5>
                  <Link to={`/post/${post.postId}`} className='detailBtn'>자세히</Link>
                </div>

                {/* 포스트 좋아요 */}
                <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
                
                {/* 포스트 작성 정보 */}
                <p className="post-meta">
                  작성자 :{post.member.nickName} <br/> 
                  작성시간 : {post.updatedAt[0]}/{post.updatedAt[1]}/{post.updatedAt[2]}
                </p>
              </div>
            </div>
          </div>
        </div> 
      )}
 
      </div>
    </div>
    </section>
  )
}
export default UserPost;
