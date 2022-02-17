import React, { useEffect, useState, useCallback } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "CustomAxios";

const HotPost = (props) => {
  const [rankingPostList, setRanking] = useState()
  const [slideNum, setSlideNum] = useState()

  const settings = props.settings
  settings.fade = false
  settings.slidesToShow = slideNum <= 2? slideNum : 2
  
  const hotPost = async () => {
    try{
      const RANKING_HOTPOST = process.env.REACT_APP_SERVER + ':8888/post/hotpost'

      const { data : rankingPost } = await axiosInstance.get(RANKING_HOTPOST)
      const rankingPostId = rankingPost.map( (post) => post.postId )
      
      setRanking(rankingPostId)
      setSlideNum(rankingPost.length)
    }catch(err){
      setSlideNum(false)
    }
  }

  useEffect( () => {
    hotPost()
  }, [])

  return(
    <div className="SlickTest">
      <h3 className="hotPost pt-4" align="center">Hot Post</h3>
      {
        slideNum
        ?
        <Slider {...settings}>
          {
            rankingPostList&&rankingPostList.map((postid, i) => 
              <CustomSlide postid={postid} key={i} />
            )
          }
        </Slider>
        :
        <div className="main_none">맥주 마시러 갈 사람!?</div>
      }
    </div>
  )
}


function CustomSlide(props) {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + `:8888/v1/post/${props.postid}`
  const storage = getStorage()
  const [imgSrc, setImgSrc] = useState()
  const [hotPostHashTag, setHashTag] = useState()

  const imgData = useCallback( async ()=>{
    const { data : postDetail } = await axiosInstance.get(`${BEER_DETAIL_URL}`)
    setHashTag(postDetail.userHashTags[0].content)
    const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/${postDetail.photos[0].data}`)
    const storageResponse = await getDownloadURL(storageRef)
    setImgSrc(storageResponse)
  }, [BEER_DETAIL_URL, storage])

  useEffect( () => {
    imgData();
  }, [BEER_DETAIL_URL, storage, imgData])
  
  return(
    <div {...props} className="row text-center">
      <h6 className="hot_post_hashtag">#{hotPostHashTag}</h6>
      <img className="hot_post_img col-6 mb-5 " src={imgSrc} alt=""/>
    </div>
  )
}


export default HotPost;
