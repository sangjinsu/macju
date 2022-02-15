import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "react-redux";
import { useParams } from "react-router-dom"
import axios from "axios"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function PostDetailImages(){
  const POST_DETAIL_URL = process.env.REACT_APP_SERVER + ':8888/v1/post'
  
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    fade:true,
    autoplaySpeed: 5000,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: "col-md-6"
  };

  const [postDetailImage, setPostDetailImage] = useState([])

  const postId = useParams().postId;

  const store = useStore((state)=>state)
  const storage = getStorage()
  
  const images = store.getState().postDetailReducer.photos

  const fetchData = useCallback( async() =>{
    const imageList = [...postDetailImage]
    for (let i = 0; i < images.length; i++){
      const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${images[i].data}`)
      await getDownloadURL(storageRef)
      .then((res) =>{
        if (!postDetailImage.some((url)=>url===res)) {
          imageList.push(res)
        }
      })
    }
    setPostDetailImage(imageList)
  }, [images, postDetailImage, storage])

  const fetchPostDetailData = useCallback ( async () =>{
    const postDetail = await axios.get(`${POST_DETAIL_URL}/${postId}`)
    const imageList = [...postDetailImage]
    for (let i = 0; i < postDetail.data.photos.length; i++){
      const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${postDetail.data.photos[i].data}`)
      await getDownloadURL(storageRef)
      .then((res) =>{
        if (!postDetailImage.some((url)=>url===res)) {
          imageList.push(res)
        }
      })
    }
    setPostDetailImage(imageList)
  }, [POST_DETAIL_URL, postDetailImage, postId, storage])

  //useEffect
  useEffect(()=>{
    if (images) {
      fetchData();
    } else  {
      fetchPostDetailData();
    }
  }, [fetchData, fetchPostDetailData, images])

  return(
    <>
    <Slider {...settings}>
      {postDetailImage.length === 0 ? <Box sx={{ display: 'flex' }} style={{justifyContent:'center', marginLeft:200 , marginTop:100}}><CircularProgress size={100}/></Box> : postDetailImage.map((data, i)=>
        <img src={data} key={i} alt=''></img> 
      )}
    </Slider>
    </>
  )
}

export default PostDetailImages;