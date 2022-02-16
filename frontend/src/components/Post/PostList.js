import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import {Link, useParams} from "react-router-dom"
import "../../styles/PostList.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axiosInstance from "CustomAxios";


function PostListComponent(){
  const POST_LIST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post/new'
  const BEER_DETAIL_POST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post/beer'
  const USER_PROFILE_URL = process.env.REACT_APP_SERVER + `:8888/v1/member/profile/`
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
        
        const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${newPost[i].photo.data}`)
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

  // 전체 포스트 리스트
  const fetchPostListData = async() =>{
    const data = await axiosInstance.get(POST_LIST_URL)
    setNewPost(data.data)
  }

  // 맥주 디테일 - 포스트 리스트
  const fetchBeerDetailData = async() =>{
    const data =await axiosInstance.get(`${BEER_DETAIL_POST_URL}/${beerid}`)
    setNewPost(data.data)
  }

  useEffect(()=>{
    if (beerid) {
      fetchBeerDetailData();  // 각 맥주 포스트
    } else {
      fetchPostListData();    // 전체 포스트
    }
  }, [POST_LIST_URL])


  return(
    
    <div className="row grid postlist_component">

    {/* 포스트 카드 각각 */}
    
      { newPost.length ===0 ? <div> 포스트가 없어요!! </div> : newPost.map((post) =>
        <div className="col-md-6 col-lg-4 fadein" key={post.postId}>
          <div className="box">
            <div className="postlist_box">
            <div className="img-box">
              {/* 포스트 이미지 */}
              {newPostImage.length === 0 ? <Box sx={{ display: 'flex' }} style={{justifyContent:'center', margin:'auto'}}><CircularProgress size={100}/></Box>:newPostImage.map((data, i)=> data.id === post.postId ? 
              <div key={i} className="img-box box">
                {/* 기본이미지 하나 구해야겠네요 */}
                <img src={data.res} alt="" style={{maxHeight:210, maxWidth:350 }}></img>
                {/* <img src={post.photo.data}></img> */}
                
              </div> : null
              )
              }
              </div>
              
              
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
                <div className="post-meta">
  
                  <Link to={`/profile/${post.member.memberId}/post`} style={{ textDecoration: 'none' }}><p>{post.member.nickName}</p></Link> <br/>                   작성시간 : {post.updatedAt[0]}/{post.updatedAt[1]}/{post.updatedAt[2]}
                </div>
              </div>
            </div>
          </div>
        </div> 
      )}

    </div>
  )
}
export default PostListComponent;
