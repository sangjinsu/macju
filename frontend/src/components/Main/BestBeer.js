import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";


const BestBeer = () => {
  const [rankingBeerList, setRanking] = useState()

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

  const PopBeer = async () => {
    const RANKING_POPBEER = process.env.REACT_APP_SERVER + ':8081/beer/popbeer'
    const headers = {
      'Accept': "application/json; charset=UTF-8"
    }
    const { data : rankingBeer } = await axios.get(RANKING_POPBEER, headers)
    const rankingBeerId = rankingBeer.map( (beer) => beer.beerId )
    setRanking(rankingBeerId)
  }
  
  useEffect( () => {
    PopBeer()
  }, [])

  return(
    <div className="SlickTest">
      <h3 className="bestbeer" align="center">Best Beer</h3>
      <Slider {...settings}>
        {
          rankingBeerList&&rankingBeerList.map((beerid, i) => 
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
  useEffect( () => {
    const fetchData = async ()=>{
      const { data : beerDetail } = await axios.get(`${BEER_DETAIL_URL}/${props.beerid}`)
      setImgSrc(beerDetail.photoPath)
      setName(beerDetail.name)
    }
    fetchData();
  }, [BEER_DETAIL_URL, props.beerid])
  return(
    <div {...props} className="row">
      <img className="slideImg" src={imgSrc} alt=""/>
      <div className="slideDiv">
        <h3 className="beer_name">{beerName}</h3>
      </div>
    </div>
  )
}

export default BestBeer;
