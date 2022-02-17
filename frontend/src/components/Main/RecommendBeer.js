import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "CustomAxios";
import { useSelector } from "react-redux";

const RecommendBeer = (props) => {
  const [beerList, setBeer] = useState()
  
  const settings = props.settings
  settings.slidesToShow = 1
  const userData = useSelector(state => state.userReducer)
  const memberId = Number(userData.memberId)

  const getRecommend = async () => {
    const RECOMMEND_BEER = process.env.REACT_APP_SERVER + `:8888/v1/recommend/${memberId}`  
    const { data: recommendBeer} = await axiosInstance.get(RECOMMEND_BEER)
    setBeer(recommendBeer.recommend)
  }
  useEffect( () => {
    getRecommend()
  }, [])
  return(
    <div className="SlickTest">
      <h3 className="recommendtitle pt-5" align="center">Recommend Beer</h3>
      <Slider {...settings}>
        {
          beerList&&beerList.map((beerid, i) => 
            <CustomSlide beerid={beerid} key={i} />
          )
        }
      </Slider>
    </div>
  )
}
function CustomSlide(props) {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + ':8888/v1/beer'
  const [imgSrc, setImgSrc] = useState()
  const imgData = useCallback( async ()=>{
    const { data : beerDetail } = await axiosInstance.get(`${BEER_DETAIL_URL}/${props.beerid}`)
    setImgSrc(beerDetail.photoPath)
  },[BEER_DETAIL_URL, props.beerid])
  useEffect( () => {
    imgData();
  }, [BEER_DETAIL_URL, props.beerid, imgData])
  return(
    <div {...props} className="recommend_beers row text-center ">
      <img className="slideImg beer_img col w-50 " src={imgSrc} alt=""/>
      <div className="slideDiv beer_content col text-center mb-5">
        <h3 className="beer_name">곰표맥주</h3>
      </div>
    </div>
  )
}
export default RecommendBeer;
