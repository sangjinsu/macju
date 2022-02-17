import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "CustomAxios";
const BestBeer = (props) => {
  const [rankingBeerList, setRanking] = useState()


  const settings = props.settings
  settings.fade = true
  settings.slidesToShow = 1

  const PopBeer = async () => {
    try {
      const RANKING_POPBEER = process.env.REACT_APP_SERVER + ':8888/beer/popbeer'
      const { data: rankingBeer } = await axiosInstance.get(RANKING_POPBEER)
      const rankingBeerId = rankingBeer.map((beer) => beer.beerId)
      setRanking(rankingBeerId)
    } catch {
      setRanking(false)
    }
  }
  useEffect(() => {
    PopBeer()
  }, [])

  return (
    <div className="SlickTest">
      <h3 className="bestbeer pt-4" align="center">Best Beer</h3>
      {
        rankingBeerList
          ?
          <Slider {...settings}>
            {
              rankingBeerList && rankingBeerList.map((beerid, i) =>
                <CustomSlide beerid={beerid} key={i} />
              )
            }
          </Slider>
          :
          <div className="main_none">
            <div>맥주에게 관심을 주세요!!</div>
          </div>
      }
    </div>
  )
}



function CustomSlide(props) {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + ':8888/v1/beer'
  const [imgSrc, setImgSrc] = useState()
  const [beerName, setName] = useState()
  const [urlBeerId, setBeerId] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const { data: beerDetail } = await axiosInstance.get(`${BEER_DETAIL_URL}/${props.beerid}`)
      setImgSrc(beerDetail.photoPath)
      setName(beerDetail.name)
      setBeerId(beerDetail.beerId)
    }
    fetchData();
  }, [BEER_DETAIL_URL, props.beerid])
  return (
    <div {...props} className="best_beers row text-center">
      <img className="slideImg best_beer_img col w-50 " src={imgSrc} alt="" style={{ maxHeight: 400, maxWidth: 300 }} />
      <div className="slideDiv best_beer_content col text-center mb-5">
        <h3 className="beer_name">{beerName}</h3>
      </div>
    </div>
  )
}

export default BestBeer;
