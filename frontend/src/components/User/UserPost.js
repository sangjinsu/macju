import "../../styles/UserPost.css"
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "../../styles/UserPost.css"
import axiosInstance from "CustomAxios";
import UserIcon from "./UserIcon"

const UserPost = (props) => {
  const USER_POST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post/member'
  const memberId = props.state
  const [userPosts, setUserPosts] = useState([])
  const [userPostImages, setUserPostImages] = useState([])
  const storage = getStorage();
  useEffect(() => {
    const fetchData = async() =>{
      const memberPosts = await axiosInstance.get(`${USER_POST_URL}/${memberId}`)
      setUserPosts(memberPosts.data)
    }
    fetchData();
  },[USER_POST_URL, memberId])
  
  useEffect(()=> {
    const fetchData = async() =>{
      const imageList = []
      for (let i = 0; i < userPosts.length; i++) {
        const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${userPosts[i].photo.data}`)
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

    <div className="container" style={{justifyContent:'space-around'}}>
      <h1 className="font">Posts</h1>
      <div className="postlist_component">
        <div className="row grid" style={{justifyContent:'center'}} >
        { userPosts.length === 0 ?  
          <>
            <UserIcon grade={2500} />
            <div id="text" className="noPost" style={{marginTop:50 ,textAlign:'center'}}>아직 작성한 게시글이 없습니다.</div>
          </> : userPosts.map((post) =>
          <div className="col-md-6 col-lg-4 fadein" key={post.postId}>
            <div className="box">
              <div className="postlist_box">            
                {userPostImages&&userPostImages.map((data, i)=> data.id === post.postId ? 
                  <div key={i} className="img-box">
                    <img src={data.res} alt="" style={{maxHeight:210, maxWidth:350 }}></img>
                  </div> : null
                )}       

                <div className="postdetail-box">
                  <div className="postdetail-title">
                    <h5>{post.content && post.content.length > 15 ? post.content.substr(0, 15) + "....": post.content}</h5>
                    <Link to={`/post/${post.postId}`} className='detailBtn'>자세히</Link>
                  </div>
                  <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i>{post.likes}</p>
                  <div className="post-meta">
                    작성자 :{post.member.nickName} <br/> 
                    작성시간 : {post.updatedAt[0]}/{post.updatedAt[1]}/{post.updatedAt[2]}
                  </div>
                </div>
              </div>
            </div>
          </div> 
        )}
  
        </div>
    </div>
    </div>
    </section>
  )
}
export default UserPost;
