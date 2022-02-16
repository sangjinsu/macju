import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const headers = {
  headers:{
    AccessToken:window.localStorage.getItem("AccessToken"),
    "Accept":"application/json;charset=UTF-8",
    "Content-Type":"application/json;charset=UTF-8"
  }
}

const RecommendBeer = () => { // 변수명 수정필요
  const [beerList, setBeer] = useState()
  
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    fade:true, //center랑 중복 불가능
    autoplaySpeed: 5000,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "container"
  };

  const getRecommend = async () => {
    const RECOMMEND_BEER = process.env.REACT_APP_SERVER + ':8888/v1/recommend/15' // memberId 추후 수정
    
    const { data: recommendBeer} = await axios.get(RECOMMEND_BEER, headers)
    setBeer(recommendBeer.recommend)
  }
  
  useEffect( () => {
    getRecommend()
  }, [])
  
  return(
    <div className="SlickTest">
      <h3 className="recommendtitle" align="center">Recommend Beer</h3>
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
    const { data : beerDetail } = await axios.get(`${BEER_DETAIL_URL}/${props.beerid}`, headers)
    setImgSrc(beerDetail.photoPath)
  },[BEER_DETAIL_URL, props.beerid])
  
  useEffect( () => {
    imgData();
  }, [BEER_DETAIL_URL, props.beerid, imgData])

  return(
    <div {...props} className="row">
      <img className="slideImg col-7" src={imgSrc} alt=""/>
      <div className="slideDiv col-5">
        <h3>곰표맥주</h3>
        <br></br>
        <span>조회 수 : ??</span>
      </div>
    </div>
  )
}

export default RecommendBeer;
