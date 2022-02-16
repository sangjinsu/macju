import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useCallback } from "react";

const headers = {
  headers:{
    AccessToken:window.localStorage.getItem("AccessToken"),
    "Accept":"application/json;charset=UTF-8",
    "Content-Type":"application/json;charset=UTF-8"
  }
}

const HotPost = () => {
  const [rankingPostList, setRanking] = useState()
  const [slideNum, setSlideNum] = useState()

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    // fade:true, //center랑 중복 불가능
    autoplaySpeed: 5000,
    speed: 5000,
    slidesToShow: slideNum <= 3? slideNum : 3 ,
    slidesToScroll: 1,
    className: "container"
  };

  useEffect( () => {
    const hotPost = async () => {
      try{
        const RANKING_HOTPOST = process.env.REACT_APP_SERVER + ':8888/post/hotpost'

        const { data : rankingPost } = await axios.get(RANKING_HOTPOST, headers)
        const rankingPostId = rankingPost.map( (post) => post.postId )
        setRanking(rankingPostId)
        setSlideNum(rankingPost.length)
      }catch{
        console.log("불러오기 실패")
      }
    }
    hotPost()
  }, [])

  return(
    <div className="SlickTest">
      <h3 className="bestbeer" align="center">Hot Post</h3>
      <Slider {...settings}>
        {
          rankingPostList&&rankingPostList.map((postid, i) => 
            <CustomSlide postid={postid} key={i} />
          )
        }
      </Slider>
    </div>
  )
}


function CustomSlide(props) {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + `:8888/v1/post/${props.postid}`
  const storage = getStorage()
  const [imgSrc, setImgSrc] = useState()

  const imgData = useCallback( async ()=>{
    const { data : postDetail } = await axios.get(`${BEER_DETAIL_URL}`, headers)
    const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${postDetail.photos[0].data}`)
    const storageResponse = await getDownloadURL(storageRef)
    setImgSrc(storageResponse)
  }, [BEER_DETAIL_URL, storage])

  useEffect( () => {
    imgData();
  }, [BEER_DETAIL_URL, storage, imgData])
  
  return(
    <div {...props} className="row">
      {/* <img className="slideImg col-7" src={imgSrc} alt=""/> */}
    </div>
  )
}


export default HotPost;
