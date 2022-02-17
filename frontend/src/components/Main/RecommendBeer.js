import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useState } from "react";
import { useCallback } from "react";


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
    const RECOMMEND_BEER = process.env.REACT_APP_SERVER + ':8000/v1/recommend/3' // memberId 추후 수정
    const headers = {
      'Accept': "application/json; charset=UTF-8"
    }
    
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
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + ':8080/v1/beer'
  const [imgSrc, setImgSrc] = useState()
  const [beerName, setName] = useState()

  const imgData = useCallback( async ()=>{
    const { data : beerDetail } = await axios.get(`${BEER_DETAIL_URL}/${props.beerid}`)
    setImgSrc(beerDetail.photoPath)
    setName(beerDetail.name)
  },[BEER_DETAIL_URL, props.beerid])
  
  useEffect( () => {
    imgData();
  }, [BEER_DETAIL_URL, props.beerid, imgData])

  return(
    <div {...props} className="row">
      <img className="slideImg" src={imgSrc} alt=""/>
      <div className="slideDiv">
        <h3>{beerName}</h3>
      </div>
    </div>
  )
}

export default RecommendBeer;
