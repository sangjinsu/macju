import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "CustomAxios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import "../../styles/RecommendBeer.css"
const RecommendBeer = (props) => {
  const [beerList, setBeer] = useState()
  const [userProfile, setProfile] = useState()

  const settings = props.settings
  settings.slidesToShow = 1
  const userData = useSelector(state => state.userReducer)
  const memberId = Number(userData.memberId)

  const USER_PROFILE_URL = process.env.REACT_APP_SERVER + `:8888/v1/member/profile/${memberId}`

  const getRecommend = useCallback(async () => {
    try {
      const RECOMMEND_BEER = process.env.REACT_APP_SERVER + `:8888/v1/recommend/${memberId}`
      const { data: recommendBeer } = await axiosInstance.get(RECOMMEND_BEER)
      setBeer(recommendBeer.recommend)

      const {data : profileData} = await axiosInstance.get(`${USER_PROFILE_URL}`)
      setProfile(profileData)
    } catch {
      setBeer(false)
    }
  }, [memberId, USER_PROFILE_URL])

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
        : <Link className="reco_none" align="center">취향 설정을 하러 가시겠나요?</Link>
      }
      {beerList
      ?null
      :
      <Link className="reco_none" align="center" to={{pathname: `/profile/edit`, state: [memberId, userProfile]}}>프로필 페이지로 이동</Link>
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
        <img className="slideImg beer_img col w-50 " src={imgSrc} alt="" style={{ maxHeight: 400, maxWidth: 300 }}/>
        <div className="slideDiv beer_content col text-center mb-5">
          <h3 className="beer_name reco_name_color">{beerName}</h3>
        </div>
      </Link>
    </div>
  )
}
export default RecommendBeer;
