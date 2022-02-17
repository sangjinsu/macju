import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import {Link, useParams} from "react-router-dom"
import "../../styles/PostList.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axiosInstance from "CustomAxios";
import { useCallback } from "react";


function PostListComponent(){
  const POST_LIST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post/new'
  const BEER_DETAIL_POST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post/beer'
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

  const fetchPostListData = useCallback( async() =>{
    const data = await axiosInstance.get(POST_LIST_URL)
    setNewPost(data.data)
  }, [POST_LIST_URL])

  const fetchBeerDetailData = useCallback( async() =>{
    const data =await axiosInstance.get(`${BEER_DETAIL_POST_URL}/${beerid}`)
    setNewPost(data.data)
  }, [BEER_DETAIL_POST_URL, beerid])

  useEffect(()=>{
    if (beerid) {
      fetchBeerDetailData();
    } else {
      fetchPostListData();    
    }
  }, [POST_LIST_URL, beerid, fetchBeerDetailData, fetchPostListData])


  return(
    
    <div className="row grid postlist_component">    
      { newPost.length ===0 ? <div className="noPost">포스트가 없어요!</div> 
      : newPost.map((post) =>
        <div className="col-md-6 col-lg-4 fadein" key={post.postId}>
            <div className="box">
              <div className="postlist_box">
              <Link to={`/post/${post.postId}`} className='detailBtn' style={{ textDecoration: 'none', color: 'black' }}>
              <div className="img-box">
                {newPostImage.length === 0 ? <Box sx={{ display: 'flex' }} style={{justifyContent:'center', margin:'auto'}}><CircularProgress size={100} style={{color:'#F9CF68'}}/></Box>
                :newPostImage.map((data, i)=> data.id === post.postId ? 
                <div key={i} className="img-box box">
                  <img src={data.res} alt="" style={{maxHeight:210, maxWidth:350 }}></img>                  
                </div> : null
                )
                }
                </div>
                </Link>
                <div className="postdetail-box">
                  <div className="postdetail-title">
                    <h5>{post.content && post.content.length > 15 ? post.content.substr(0, 15) + "....": post.content}</h5>
                    <p className="fontaws"><i className="fas fa-heart" style={{color:"red"}}></i> {post.likes}</p>
                  </div>                 
                  <div className="post-meta">
                  
                    <Link to={`/profile/${post.member.memberId}/post`} style={{ textDecoration: 'none', color:'black' }} className="user">
                      <div><i className="fas fa-user"></i> {post.member.nickName}</div>
                    </Link>
                    <div>{post.updatedAt[0]}.{post.updatedAt[1]}.{post.updatedAt[2]}</div>
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
