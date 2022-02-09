import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "react-redux";
import {Link, useParams} from "react-router-dom"
import "../../styles/PostList.css"
import axios from "axios";


function PostListComponent(){
  const POST_LIST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post/new'
  const BEER_DETAIL_POST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post/member'
  const [newPost, setNewPost] = useState([])
  const [newPostImage, setNewPostImage] = useState([])
  const storage = getStorage()
  const {beerid} = useParams();
  
  useEffect(()=> {
    if (newPost.length === 0){
      return
    }
    const fetchData = async() =>{
      const imageList = []
      for (let i = 0; i < newPost.length; i++) {
        const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${newPost[i].postId}/${newPost[i].photo.data}`)
        await getDownloadURL(storageRef)
        .then((res)=>{
          if (!newPostImage.some((url)=>url===res)){
            imageList.push({id:newPost[i].postId, res})
          }
        })
        
    }
    setNewPostImage(imageList)
  }
    fetchData();
  //eslint-disable-next-line
  }, [newPost])
  const fetchPostListData = async() =>{
    const data = await axios.get(POST_LIST_URL)
    setNewPost(data.data)
  }

  const fetchBeerDetailData = async() =>{
    const data =await axios.get(`${BEER_DETAIL_POST_URL}/${beerid}`)
    setNewPost(data.data)
  }
  useEffect(()=>{
    if (beerid) {
      fetchBeerDetailData();
    } else {
      fetchPostListData();
    }

  }, [POST_LIST_URL])



  return(
    
    <div className="row grid postlist_component">

    {/* 포스트 카드 각각 */}
      { newPost === undefined ? <div> 포스트가 없어요!! </div> : newPost.map((post) =>
        <div className="col-md-6 col-lg-4 fadein" key={post.postId}>
          <div className="box">
            <div className="postlist_box">
                            
              {/* 포스트 이미지 */}
              {newPostImage&&newPostImage.map((data, i)=> data.id === post.postId ? 
              
              <div key={i} className="img-box">
                {/* 기본이미지 하나 구해야겠네요 */}
                <img src={data.res} alt=""></img>
                {/* <img src={post.photo.data}></img> */}
                
              </div> : null
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
  )
}
export default PostListComponent;
