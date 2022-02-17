import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "CustomAxios";
import { useSelector, useStore } from "react-redux";
import { Link } from "react-router-dom"
import "../../styles/RecommendBeer.css"
const RecommendBeer = (props) => {
  const store = useStore((state) => state)
  const userid = store.getState().userReducer.memberId
  const [beerList, setBeer] = useState()

  const settings = props.settings
  settings.slidesToShow = 1
  const userData = useSelector(state => state.userReducer)
  const memberId = Number(userData.memberId)

  const getRecommend = useCallback(async () => {
    try {
      const RECOMMEND_BEER = process.env.REACT_APP_SERVER + `:8888/v1/recommend/${memberId}`
      const { data: recommendBeer } = await axiosInstance.get(RECOMMEND_BEER)
      setBeer(recommendBeer.recommend)
    } catch {
      setBeer(false)
    }
  }, [memberId])

  useEffect(() => {
    getRecommend()
  }, [getRecommend])

  return (
    <div className="SlickTest">
      <h3 className="recommendtitle pt-4" align="center">Recommend Beer</h3>
      {beerList
        ?
        <Slider {...settings}>
          {
            beerList && beerList.map((beerid, i) =>
              <CustomSlide beerid={beerid} key={i} />
            )
          }
        </Slider>
        :
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div >  <div className="main_none">맥주 취향을 모르겠나요?</div>

            <Link to={{
              pathname: `/profile/edit`,
              state: userid
            }} style={{ textDecoration: 'none', justifyContent: 'center' }}
            ><div id="btn" style={{ maxWidth: 200 }}><p>프로필 페이지로 이동</p></div>  </Link>
          </div>

        </div>
      }
    </div>
  )
}

function CustomSlide(props) {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + ':8888/v1/beer'
  const [imgSrc, setImgSrc] = useState()
  const [beerName, setName] = useState()

  const imgData = useCallback(async () => {
    const { data: beerDetail } = await axiosInstance.get(`${BEER_DETAIL_URL}/${props.beerid}`)
    setImgSrc(beerDetail.photoPath)
    setName(beerDetail.name)
  }, [BEER_DETAIL_URL, props.beerid])
  useEffect(() => {
    imgData();
  }, [BEER_DETAIL_URL, props.beerid, imgData])
  return (
    <div {...props} className="recommend_beers row text-center ">
      <Link to={`/beer/${props.beerid}`}>
        <img className="slideImg beer_img col w-50 " src={imgSrc} alt="" />
        <div className="slideDiv beer_content col text-center mb-5">
          <h3 className="beer_name main_name_color">{beerName}</h3>
        </div>
      </Link>
    </div>
  )
}
export default RecommendBeer;
