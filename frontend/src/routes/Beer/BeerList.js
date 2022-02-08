import React, { useEffect } from 'react';
import { useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import '../../styles/BeerList.css'
import { Link } from "react-router-dom"
import FadeIn from 'react-fade-in';
import axios from "axios"
import { getDownloadURL, getMetadata, getStorage , ref, updateMetadata } from "firebase/storage";
import "../../firebase_config"
import { useDispatch, useStore } from 'react-redux';
// import { default as Fade} from 'react-fade';



function BeerList(){
  const BEER_LIST_URL = process.env.REACT_APP_BEER_LIST_URL
  // console.log(process.env.REACT_APP_BEER_LIST_URL)

  const store = useStore()
  // 맥주 데이터
  const [beerdata, setbeerdata] = useState([])
  const [showBeer, setShowBeer] = useState([])
  // 맥주 사진 URL
  const [beerImgList, setBeerImgList] = useState([])
  // 각 맥주 좋아요
  const [isLike, setisLike] = useState([])
  // 현재 활성화된 카테고리 (기본값:all)
  const [isActive, setIsActive] = useState('all')   
  //store
  const dispatch = useDispatch();
  // 카테고리에 맞는 맥주 데이터
  const [nowbeerArr, setnowbeerArr] = useState([])


  //스크롤 이벤트 시 실행할 함수
  const ScrollBottom = () =>{
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement
    if (scrollHeight - Math.round(scrollTop) <= 2*clientHeight){
      if (showBeer !==beerdata.splice(0, 10)) {
        setShowBeer((prev)=>prev.concat(beerdata.splice(0, 10)))
        setnowbeerArr((prev)=>prev.concat(beerdata.splice(0, 10)))
      }
      }
    
  }

  // 카테고리 바뀔때 마다 보여주는 맥주리스트 수정
  useEffect(()=>{
    if (isActive !== 'all') {
      const nowbeer = showBeer.filter(beer => {
        return beer.beerType.main === isActive
      })
      console.log(nowbeer)
      setnowbeerArr(nowbeer)
    } else {
      setnowbeerArr(showBeer)
    }
  },[showBeer, isActive])
  
  // scroll event listener 추가
  useEffect(()=>{
    window.addEventListener('scroll', ScrollBottom);
    return () =>{
      window.removeEventListener('scroll', ScrollBottom)
    }
  })
  
  //화면에서 스크롤 없이도 보여줄 초기값
  useEffect(async()=> {
    const temp = await axios.get(BEER_LIST_URL)
    setShowBeer(temp.data)
    setnowbeerArr(temp.data)

    const data = await axios.get(`${BEER_LIST_URL}?size=210`)
    dispatch({type:"getBeerList", data:data})
    // console.log(store.getState().beerListReducer.data)
    setbeerdata([data][0].data)
    const datalist = [data][0].data

    // 카테고리 기본값 all
    setIsActive('all')

    // 좋아요 기본값 false
    // const newLike = []
    // for(var i=0, j=datalist.length; i<j; i++) {
    //   newLike.push(false)
    // }
    // console.log(newLike)
    // setisLike(newLike)
  }, [])
  

  
  const changeLike = ((e)=>{
    // console.log(e.target.attributes.beerlikeid)
    setisLike(!isLike)
  })

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
  
  
  // 오류 : 카테고리 클릭할 때 리스트에 없던 맥주들만 fadein효과 적용되서 원래 리스트에 있던건 fadein이 안됌
  // 오류 : navbar의 area-expanded 되어있을때 카테고리누르면 닫히게해야함
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
          
          { nowbeerArr && nowbeerArr.map((beer) =>
            
              <div className={`col-sm-6 col-md-4 col-lg-3 fadein all ${beer.beerType.main}`} key={beer.beerId}>
                {/* <div className={}> */}
                <div className="box">
                {/* {console.log(beer)} */}
                  <div>
                    {/* 맥주 이미지 */}
                    <div className="img-box"> 
                      <img src={beer.photoPath}></img>
                    </div>

                    {/* 맥주 설명란 */}
                    <div className="beerdetail-box">

                      {/* 맥주 이름 + 자세히 버튼 */}
                      <div className='beerdetail-title'>
                        <h5>{beer.name}</h5>
                        <Link to={`/beer/${beer.beerId}`} className='detailBtn'>자세히</Link>
                      </div>

                      {/* 맥주 별점 */}
                      <div className='star'>★★★★☆</div>

                      {/* 맥주 설명 */}
                      <div className='beer_content'>
                        {/* {beer.content.length > 15 ? beer.content.substr(0, 15) + "....": beer.content} */}
                        {/* {beer.content.length > 15 } */}
                      </div>
                      <div className='beer_volume'>
                        ALC : {beer.volume}%
                      </div>

                      {/* 맥주 해시태그 */}
                      <div className='beer_hashtag_all'>
                        {beer.aromaHashTags.map((aroma,a) => {
                          return <div key={a} className='beer_hashtag'>#{aroma}</div>
                        })}
                      </div>
                      <div className='beer_hashtag_all'>
                        {beer.flavorHashTags.map((flavor,f) => {
                          return <div key={f} className='beer_hashtag'>#{flavor}</div>
                        })}
                      </div>

                      {/* 맥주 카테고리 */}
                      <div className="options">
                        <div className='options_space_between'>
                          <h6 className='beerCategory'>
                            {beer.beerType.main}
                          </h6>
                          {/* 좋아요 버튼 */}
                          <a>
                            { isLike === true
                              ? <BsHeart size="18" onClick={changeLike}></BsHeart>
                              : <BsHeartFill size="18" onClick={changeLike}></BsHeartFill>
                            }
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              {/* </div> */}
              </div>
            //  </div>
            )}

          </div>
          
          
          </FadeIn>

        </div>
      </section>




    </div>
  )
}

export default BeerList;
