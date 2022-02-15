import React, { useEffect } from 'react';
import { useState } from "react";
import '../../styles/BeerList.css'
import { Link } from "react-router-dom"
import FadeIn from 'react-fade-in';
import axios from "axios"
import "../../firebase_config"
import { useDispatch, useStore } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip'

function BeerList(){
  //url
  const BEER_LIST_URL = process.env.REACT_APP_SERVER + ':8888/v1/beer'
  
  //// usestate

  // 맥주 데이터
  const [beerdata, setbeerdata] = useState([])
  const [tempdata, setTempdata] = useState([])
  const [nowbeerArr, setnowbeerArr] = useState([])
  const [categoryBeer, setCategoryBeer] = useState([])


  // 현재 활성화된 카테고리 (기본값:all)
  const [isActive, setIsActive] = useState('all')  

  //store
  const store = useStore((state)=>state)
  const dispatch = useDispatch();
  // 카테고리에 맞는 맥주 데이터




  //function
  //스크롤 이벤트 시 실행할 함수
  const ScrollBottom = () =>{
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement
    if (scrollHeight - Math.round(scrollTop) <= 2*clientHeight){
      const data = tempdata.splice(0, 20)
      if (JSON.stringify(data) !== JSON.stringify (nowbeerArr)) {
        setnowbeerArr((prev)=>prev.concat(data))
      }   
    }
  }


  // 클릭한 카테고리버튼 배경색 바꾸기 : 카테고리 클릭시 해당 카테고리 class에 .active 추가 
  const toggleActive = ((e) => {
    setIsActive(e.target.attributes.beerfilter.value)   // isActive를 beerfilter값으로 바꿈
  })
  // 활성화된 카테고리의 맥주만 보이게 하기 : style에 'display: none' 추가
  const eachbeer = document.getElementsByClassName("all")   // 전체 맥주 가져옴
  for(var i=0, j=eachbeer.length; i<j; i++) {
    if (eachbeer[i].classList.contains(isActive)) {         // classList에 현재 활성화된 카테고리의 포함여부
      eachbeer[i].classList.remove('displaynone')           // 포함되어있으면 displaynone 제거 (보이게)
    } else { 
      eachbeer[i].classList.add('displaynone')              // 없으면 displaynone 추가 (안보이게)
    }
  }
  // const openClose = () => {
  //   dispatch({type:"navClose"})
  // }
  const fetchBeerlist = async () =>{
    const data = await axios.get(`${BEER_LIST_URL}?size=500`)
    dispatch({type:"getBeerList", data:data})
    setTempdata(data.data)
    setbeerdata(store.getState().beerListReducer.data)
  }




  // 카테고리 바뀔때 마다 보여주는 맥주리스트 수정
  useEffect(()=>{
    if (isActive === 'Ale') {
      const nowbeer = nowbeerArr.filter(beer => {
        return beer.beerType.en_main === 'Ale'
      })
      setCategoryBeer(nowbeer)
    } else if (isActive === 'Lager'){
      const nowbeer = nowbeerArr.filter(beer => {
        return beer.beerType.en_main === 'Lager'
      })
      setCategoryBeer(nowbeer)
    } else if (isActive === 'Radler'){
      const nowbeer = nowbeerArr.filter(beer => {
        return beer.beerType.en_main === 'Radler'
      })
      setCategoryBeer(nowbeer)
    } else if (isActive === 'all') {
      setCategoryBeer(nowbeerArr)
    }
  },[isActive, nowbeerArr])

  // scroll event listener 추가
  useEffect(()=>{
    window.addEventListener('scroll', ScrollBottom);
    return () =>{
      window.removeEventListener('scroll', ScrollBottom)
    }
  })

  useEffect(()=>{
    fetchBeerlist();
  },[])


  //화면에서 스크롤 없이도 보여줄 초기값
  useEffect(()=> {
    setnowbeerArr(beerdata.slice(0, 20))   
  }, [beerdata])
  

  
  // 오류 : 카테고리 클릭할 때 리스트에 없던 맥주들만 fadein효과 적용되서 원래 리스트에 있던건 fadein이 안됌
  return(
    <div>
      <section className="beerlist_section layout_padding_beerlist">
        <div className="container">
          {/* 맥주 리스트 제목 */}
          <div className="heading_container heading_center">
            <h2>
              Our Beer
            </h2>
          </div>
          {/* 맥주 카테고리 */}
          <ul className="filters_menu">            
            {/* isActive값이 beerfilter와 같을 때 .active 클래스 추가 */}
            <li className={isActive==='all' ? 'active' : null} beerfilter="all" onClick={toggleActive}>All</li>
            <li className={isActive==='Ale' ? 'active' : null} beerfilter="Ale" onClick={toggleActive}>Ale</li>
            <li className={isActive==='Lager' ? 'active' : null} beerfilter="Lager" onClick={toggleActive}>Lager</li>
            <li className={isActive==='Radler' ? 'active' : null} beerfilter="Radler" onClick={toggleActive}>Radler</li>
          </ul>
          <FadeIn>
            <div className="row grid">
            
            { categoryBeer.length === 0 ? <Box sx={{ display: 'flex' }} style={{justifyContent:'center', marginTop:100}}><CircularProgress size={200}/></Box>
            : categoryBeer.map((beer) => 
              <div className={`col-sm-6 col-md-4 col-lg-3 fadein all ${beer.beerType.en_main}`} key={beer.beerId} >
                <Link to={`/beer/${beer.beerId}`} style={{ textDecoration: 'none', color: 'white' }} className='detailBtn'>          
                  <div className="beerlist_box">
                    <div className='boderbox'>
                      {/* 맥주 이미지 */}
                      <div className="img-box"> 
                        {/* 여기도 기본 이미지가 필요하네용 */}
                        <img src={beer.photoPath} alt=''></img>
                      </div>
                      {/* 맥주 설명란 */}
                      <div className="beerdetail-box">
                        {/* 맥주 이름 + 자세히 버튼 */}
                        <div className='beerdetail-title'>
                          <h5>{beer.name}</h5>
                          {/* <Link to={`/beer/${beer.beerId}`} onClick={openClose} className='detailBtn'>자세히</Link> */}
                        </div>
                        {/* 맥주 별점 */}
                        <div className="star-ratings">
                          <div 
                            className="star-ratings-fill space-x-2 text-lg"
                            style={{width:`${beer.averageRate*20}%` }}
                          >
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                          </div>
                          <div className="star-ratings-base space-x-2 text-lg">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                          </div>
                        </div>
                        {/* 맥주 설명 */}
                        <div className='beer_content'>
                          {/* {beer.content.length > 15 ? beer.content.substr(0, 15) + "....": beer.content} */}
                          {/* {beer.content.length > 15 } */}
                        </div>
                        {/* <div className='beer_volume'>
                          ALC : {beer.volume}%
                        </div> */}
                        {/* 맥주 해시태그 */}
                        <div className='beer_hashtag_all'>
                          { beer.aromaHashTags.length > 2 
                            ? beer.aromaHashTags.slice(0,2).map((aroma,a) => 
                              <div className='beer_hashtag' key={a}>#{aroma}</div>
                              )
                            : beer.aromaHashTags.map((aroma,a) => 
                              <div className='beer_hashtag' key={a}>#{aroma}</div>
                              )
                          }
                        </div>
                        <div className='beer_hashtag_all'>
                          { beer.flavorHashTags.length > 2 
                            ? beer.flavorHashTags.slice(0,2).map((flavor,f) => 
                              <div className='beer_hashtag' key={f}>#{flavor}</div>
                              )
                            : beer.flavorHashTags.map((flavor,f) => 
                              <div className='beer_hashtag' key={f}>#{flavor}</div>
                              )
                          }
                        </div>
                        {/* 맥주 카테고리 */}
                        <div className="options">
                          {/* <Chip label={beer.beerType.en_main} /> */}
                            <div className='beerCategory'>
                              {beer.beerType.en_main}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            
            </div>
            
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default BeerList;
