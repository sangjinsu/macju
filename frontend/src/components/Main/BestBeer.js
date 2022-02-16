import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "CustomAxios";

const BestBeer = (props) => {
  const [rankingBeerList, setRanking] = useState()

  const settings = props.settings
  settings.fade = true

  useEffect( () => {
    const PopBeer = async () => {
      const RANKING_POPBEER = process.env.REACT_APP_SERVER + ':8888/beer/popbeer'
      const { data : rankingBeer } = await axiosInstance.get(RANKING_POPBEER)
      const rankingBeerId = rankingBeer.map( (beer) => beer.beerId )
      setRanking(rankingBeerId)
    }
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
  const [beerContent, setBeerContent] = useState()
  useEffect( () => {
    const fetchData = async ()=>{
      const { data : beerDetail } = await axiosInstance.get(`${BEER_DETAIL_URL}/${props.beerid}`)
      setImgSrc(beerDetail.photoPath)
      setName(beerDetail.name)
      setBeerContent(beerDetail.content)
    }
    fetchData();
  }, [BEER_DETAIL_URL, props.beerid])
  return(
    <div {...props} className="row">
      <img className="best_beer_img col-7" src={imgSrc} alt=""/>
      <div className="slideDiv col-5">
        <h3>{beerName}</h3>
        <br></br>
        <span>{beerContent}</span>
      </div>
    </div>
  )
}

export default BestBeer;
