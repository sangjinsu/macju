import React, { useEffect } from 'react';
import { useState } from "react";
import '../../styles/BeerList.css'
import { Link } from "react-router-dom"
import FadeIn from 'react-fade-in';
import "../../firebase_config"
import { useDispatch, useStore } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axiosInstance from "CustomAxios";


function BeerList(){

  const BEER_LIST_URL = process.env.REACT_APP_SERVER + ':8888/v1/beer'
  



  const [beerdata, setbeerdata] = useState([])
  const [tempdata, setTempdata] = useState([])
  const [nowbeerArr, setnowbeerArr] = useState([])
  const [categoryBeer, setCategoryBeer] = useState([])



  const [isActive, setIsActive] = useState('all')  


  const store = useStore((state)=>state)
  const dispatch = useDispatch();


  const headers = {
    headers: {
      "AccessToken":window.localStorage.getItem("AccessToken"),
      "Accept":"application/json;charset=UTF-8",
      "Content-Type":"application/json;charset=UTF-8"
    }
  }
  const ScrollBottom = () =>{
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement
    if (scrollHeight - Math.round(scrollTop) <= 2*clientHeight){
      const data = tempdata.splice(0, 20)
      if (JSON.stringify(data) !== JSON.stringify (nowbeerArr)) {
        setnowbeerArr((prev)=>prev.concat(data))
      }   
    }
  }
  const toggleActive = ((e) => {
    setIsActive(e.target.attributes.beerfilter.value)
  })
  const eachbeer = document.getElementsByClassName("all")   
  for(var i=0, j=eachbeer.length; i<j; i++) {
    if (eachbeer[i].classList.contains(isActive)) {        
      eachbeer[i].classList.remove('displaynone')        
    } else { 
      eachbeer[i].classList.add('displaynone')         
    }
  }
  const fetchBeerlist = async () =>{
    const data = await axiosInstance.get(`${BEER_LIST_URL}?size=500`)
    dispatch({type:"getBeerList", data:data})
    setTempdata(data.data)
    setbeerdata(store.getState().beerListReducer.data)
  }
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
  useEffect(()=>{
    window.addEventListener('scroll', ScrollBottom);
    return () =>{
      window.removeEventListener('scroll', ScrollBottom)
    }
  })

  useEffect(()=>{
    fetchBeerlist();
  },[])


  useEffect(()=> {
    setnowbeerArr(beerdata.slice(0, 20))   
  }, [beerdata])
  

  
  return(
    <div>
      <section className="beerlist_section layout_padding_beerlist">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              Our Beer
            </h2>
          </div>
          <ul className="filters_menu">            
            <li className={isActive==='all' ? 'active' : null} beerfilter="all" onClick={toggleActive}>All</li>
            <li className={isActive==='Ale' ? 'active' : null} beerfilter="Ale" onClick={toggleActive}>Ale</li>
            <li className={isActive==='Lager' ? 'active' : null} beerfilter="Lager" onClick={toggleActive}>Lager</li>
            <li className={isActive==='Radler' ? 'active' : null} beerfilter="Radler" onClick={toggleActive}>Radler</li>
          </ul>
          <FadeIn>
            <div className="row grid">
            
            { categoryBeer.length === 0 ? <Box sx={{ display: 'flex' }} style={{justifyContent:'center', marginTop:100}}><CircularProgress size={200} style={{color:'#F9CF68'}}/></Box>
            : categoryBeer.map((beer) => 
              <div className={`col-sm-6 col-md-4 col-lg-3 fadein all ${beer.beerType.en_main}`} key={beer.beerId} >
                <Link to={`/beer/${beer.beerId}`} style={{ textDecoration: 'none', color: 'white' }} className='detailBtn'>          
                  <div className="beerlist_box">
                    <div className='boderbox'>
                      <div className="img-box"> 
                        <img src={beer.photoPath} alt=''></img>
                      </div>
                      <div className="beerdetail-box">
                        <div className='beerdetail-title'>
                          <h5>{beer.name}</h5>
                        </div>
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
                        <div className='beer_content'>
                          {/* {beer.content.length > 15 } */}
                        </div>
                        {/* <div className='beer_volume'>
                          ALC : {beer.volume}%
                        </div> */}
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
