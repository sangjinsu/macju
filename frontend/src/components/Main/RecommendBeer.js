import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "CustomAxios";

const RecommendBeer = (props) => { // 변수명 수정필요
  const [beerList, setBeer] = useState()
  
  const settings = props.settings

  const getRecommend = async () => {
    const RECOMMEND_BEER = process.env.REACT_APP_SERVER + ':8888/v1/recommend/15' // memberId 추후 수정
    
    const { data: recommendBeer} = await axiosInstance.get(RECOMMEND_BEER)
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
    const { data : beerDetail } = await axiosInstance.get(`${BEER_DETAIL_URL}/${props.beerid}`)
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
