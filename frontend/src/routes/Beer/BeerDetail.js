import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import "../../firebase_config"
import '../../styles/BeerDetail.css'
import PostListComponent from "../../components/Post/PostList"
import BeerRate from "./BeerRate.js"
import BeerRateUpdate from "./BeerRateUpdate.js"
import { useDispatch, useSelector } from "react-redux";
import Chip from '@mui/material/Chip'
import axiosInstance from "CustomAxios";

function BeerDetail() {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + ':8888/v1/beer'
  const BEER_DETAIL_POST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post/beer'
  const RATED_BEER_URL = process.env.REACT_APP_SERVER + ':8888/v1/member'
  const BEER_DETAIL_LOG_URL = process.env.REACT_APP_SERVER + ':8888/v1/log'
  const RANKING_BEER_URL = process.env.REACT_APP_SERVER + ':8888/beer/view'
  const RANKING_BEER_LIKE_URL = process.env.REACT_APP_SERVER + ':8888/beer/like'
  const BEER_LIKE_URL = process.env.REACT_APP_SERVER + ':8888/v1/member'
  const userData = useSelector(state => state.userReducer)
  const memberId = Number(userData.memberId)
  const dispatch = useDispatch();  
  const [beer, setbeer] = useState()
  const [isRated, setIsRated] = useState(false)
  const [rateModal, set_rateModal] = useState(false)
  const [likebeers, setLikebeers] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [beerlikeNum, setBeerlikeNum] = useState()
  const { beerid } = useParams();
  const [starrate, setStarrate] = useState()

  




  useEffect(()=>{
    const fetchData = async ()=>{
      const { data : beerdetail } = await axiosInstance.get(`${BEER_DETAIL_URL}/${beerid}`)
      setbeer(beerdetail)
      const beer_postdetail = await axiosInstance.get(`${BEER_DETAIL_POST_URL}/${beerid}`)
      dispatch({type:'beerDetailPost', beerdetaildata:beer_postdetail})
      const { data : rated_beer } = await axiosInstance.get(`${RATED_BEER_URL}/${memberId}/rates`)
      const rated = rated_beer.data
      for (let i in rated) {
        if (rated[i].beer.beerId === Number(beerid)) {
          setIsRated(true)   
        }
      }
      const { data : beerlikedata } = await axiosInstance.get(`${BEER_LIKE_URL}/${memberId}/like/beer`)
      setLikebeers(beerlikedata.data)
      for (let i in beerlikedata.data) {
        if (beerlikedata.data[i].beerId === Number(beerid)) {
          setIsLiked(true)   
        } 
      }
      setBeerlikeNum(beerdetail.likes)  
      const hashTagArr = [beerdetail.beerType.en_main, ...beerdetail.aromaHashTags , ...beerdetail.flavorHashTags]
      
      const newdata = {
        id : memberId,
        tags : hashTagArr
      }
      axiosInstance.post(BEER_DETAIL_LOG_URL, newdata)    
    }
    fetchData();
  }, [BEER_DETAIL_POST_URL, BEER_DETAIL_URL, RATED_BEER_URL, BEER_LIKE_URL, beerid, starrate])
  { rateModal ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset" } 
  const likeButton = async () => {
    try{
      setIsLiked(!isLiked)
      if (isLiked) {
        setBeerlikeNum(beerlikeNum-1)
      } else {
        setBeerlikeNum(beerlikeNum+1)
      }


      axiosInstance.post(`${BEER_LIKE_URL}/beer/${memberId}/like/${beerid}`)
      

      const rankingBeerLikeeUrl = `${RANKING_BEER_LIKE_URL}/${beerid}/1`
      const headers = {
        'Accept': "application/json; charset=UTF-8"
      }
      await axiosInstance.get(rankingBeerLikeeUrl, headers)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const spendData = async () => {
      try{
        const rankingBeerUrl = `${RANKING_BEER_URL}/${beerid}/${memberId}` 
        const headers = {
          'Accept': "application/json; charset=UTF-8"
        }
        await axiosInstance.get(rankingBeerUrl, headers)
      }catch(err){
        console.log(err)
      }
    }
    spendData()
  }, [])

  return (
    <div className="BeerDetail">
      {beer &&
        <div>
        <section className="beerdetail_section layout_padding_beer">
          <div className="container">
            <div className='backBtn'>
              <Link className='btnText' to='/beer'><i className="fas fa-angle-double-left fa-lg"></i> 목록으로</Link>
            </div>
            <div className="row">
              <div className="col-md-6 ">
                <div className="img-box">
                  <img src={beer.photoPath} alt=""></img>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-box">
                  <Chip className="maintype" label={beer.beerType.en_main} variant="outlined" />
                  { beer.beerType.ko_detail !== null
                    ? <Chip className="maintype" label={beer.beerType.en_detail} variant="outlined" />
                    : null }
                  <div className="heading_title">
                    <h2>{beer.name}</h2>
                    <div className="heartInline">
                      {
                        isLiked === true
                        ? <BsHeartFill className="heartIcon" size="23" onClick={likeButton}></BsHeartFill>
                        : <BsHeart className="heartIcon" size="23" onClick={likeButton}></BsHeart>
                      }
                      <div className="like_count">({beerlikeNum})</div>
                    </div>
                  </div>
                  <div className="rate_spacebetween">
                    <div className='starInline'>
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
                      <div>({beer.averageRate})</div>
                    </div>
                    <button className="RateBtn" onClick={()=> set_rateModal(true)}>평가하기</button>
                  </div>
                  { isRated 
                    ? <BeerRateUpdate 
                        starrate={starrate}
                        setStarrate={setStarrate} 
                        rateModal={rateModal} 
                        set_rateModal={set_rateModal} 
                        beerid={beerid}
                      />
                    : <BeerRate 
                        setIsRated={setIsRated}
                        starrate={starrate}
                        setStarrate={setStarrate} 
                        rateModal={rateModal} 
                        set_rateModal={set_rateModal} 
                        beerid={Number(beerid)}
                      />
                  }
                  {
                  <div className='beer_volume'>
                    ALC : {beer.volume}%
                  </div>}
                  <p className="beer_content">{ beer.content }</p>
                  <div className="hashtag_all">
                    {
                      beer.aromaHashTags.map((tag, i)=>{
                        return(<span className="hashtag" key={i}>#{tag}</span>)
                      })
                    }
                  </div>
                  <div className="hashtag_all">
                    {
                      beer.flavorHashTags.map((tag, i)=>{
                        return(<span className="hashtag" key={i}>#{tag}</span>)
                      })
                    }
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>


        <section className="postlist_section">
          <div className="container">
            <div className='heading_posts'>
              <h1>Post</h1>

              <div className='newPostBtn'>
                <Link 
                  className='btnText' 
                  to={{
                    pathname: '/post/new',
                    state: {beerid: beer.beerId},
                  }}
                >포스팅하기</Link>
              </div>
            </div>
              <PostListComponent />
          </div>

        </section>
        </div>
      }

      
    </div>
  )
  }

 

export default BeerDetail;
