import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import axios from "axios"
// import { getDownloadURL, getStorage , ref } from "firebase/storage";
import "../../firebase_config"
import '../../styles/BeerDetail.css'
import PostListComponent from "../../components/Post/PostList"
import BeerRate from "./BeerRate.js"
import BeerRateUpdate from "./BeerRateUpdate.js"
import { useDispatch } from "react-redux";

// import "../../styles/PostList.css"


function BeerDetail() {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + ':8080/v1/beer'
  const BEER_DETAIL_POST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post/member'
  const RATED_BEER_URL = process.env.REACT_APP_SERVER + ':8080/v1/member'
  const BEER_DETAIL_LOG_URL = process.env.REACT_APP_SERVER + ':8080/v1/log'
  const RANKING_BEER_URL = process.env.REACT_APP_SERVER + ':8081/beer/view'
  const RANKING_BEER_LIKE_URL = process.env.REACT_APP_SERVER + ':8081/beer/like'


  const memberId = 1    //test용 멤버아이디

  
  // 맥주 data
  const [beer, setbeer] = useState()
  // 맥주의 posts
  const [beerpost, setbeerpost] = useState()
  // 평가한 맥주들
  const [ratebeers, setRatebeers] = useState([])
  const [isRated, setIsRated] = useState(false)

  // const [beerImg, setbeerImg] = useState()
  const { beerid } = useParams();
  
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchData = async ()=>{
      const { data : beerdetail } = await axios.get(`${BEER_DETAIL_URL}/${beerid}`)
      setbeer(beerdetail)
      // const nowbeerDetail = beerdetail.data

      // 맥주별 포스트 목록
      const beer_postdetail = await axios.get(`${BEER_DETAIL_POST_URL}/${beerid}`)
      dispatch({type:'beerDetailPost', beerdetaildata:beer_postdetail})



      // 평가한 맥주 목록
      const { data : rated_beer } = await axios.get(`${RATED_BEER_URL}/${memberId}/rates`)
      rated_beer.data.map((ratebeer, i)=>{
        if (ratebeer.beer.beerId == beerid) {
          setIsRated(true)    // 이 맥주 평가했으면 isRated=true
        }
      })

      // 로그 보내기
      const hashTagArr = [beerdetail.beerType.main, ...beerdetail.aromaHashTags , ...beerdetail.flavorHashTags]
      // console.log(hashTagArr)
      const newdata = {
        id : 1,
        tags : hashTagArr
      }
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json; charset=UTF-8"
      }
      // axios.post(BEER_DETAIL_LOG_URL, newdata, {headers})     // 주석풀면 로그에 post 보냄
      ////// axios.post("http://13.125.157.39:8080/v1/log", newdata, {headers})


      // const storage = getStorage()
      // const storageRef = ref(storage, `gs://ssafy-01-beer-image.appspot.com/${beerdetail.data.photoPath}`)
      // getDownloadURL(storageRef)
      // .then((url)=>{
      //   setbeerImg(url)
      // })
    }
    fetchData();
  }, [BEER_DETAIL_POST_URL, BEER_DETAIL_URL, RATED_BEER_URL, beerid])

  const [isLike, setisLike] = useState(false)
  const [rateModal, set_rateModal] = useState(false)

 
  // 모달창 켜지면 스크롤 안움직이게 함
  { rateModal ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset" }

  //////// 맥주평가모달창
  // 별점
  const [starrate, setStarrate] = useState()

  const likeButton = async () => {
    try{
      setisLike(!isLike)
      const rankingBeerLikeeUrl = `${RANKING_BEER_LIKE_URL}/${beerid}/1`
      const headers = {
        'Accept': "application/json; charset=UTF-8"
      }
      await axios.get(rankingBeerLikeeUrl, headers)
    }catch{
      console.log("오류")
    }
  }

  useEffect(() => {
    const spendData = async () => {
      try{
        const rankingBeerUrl = `${RANKING_BEER_URL}/${beerid}/1` //추후 memberId 수정필요
        const headers = {
          'Accept': "application/json; charset=UTF-8"
        }
        await axios.get(rankingBeerUrl, headers)
      }catch{
        console.log("오류입니다")
      }
    }
    spendData()
  }, [])

  return (
    <div className="BeerDetail">
      {
        beer &&
        <div>
        <section className="beerdetail_section layout_padding_beer">

          <div className="container">
            {/* 목록으로 가기 버튼 */}
            <div className='backBtn'>
              <Link className='btnText' to='/beer'><i className="fas fa-angle-double-left fa-lg"></i> 목록으로</Link>
            </div>

            <div className="row">
              {/* 맥주 이미지 */}
              <div className="col-md-6 ">
                <div className="img-box">
                  {/* <img src={beerImg}></img> */}
                  {/* 여기도 기본이미지가... */}
                  <img src={beer.photoPath} alt=""></img>
                </div>
              </div>

              {/* 맥주 디테일 */}
              <div className="col-md-6">
                <div className="detail-box">
                  
                  {/* 맥주 종류 */}
                  <div className="beerCategory" href="">{beer.beerType.main}</div>
                  { beer.beerType.detail !== null
                    ? <div className="beerCategory_detail" href="">{beer.beerType.detail}</div> 
                    : null }

                  {/* 맥주 이름 + 하트 */}
                  <div className="heading_title">
                    <h2>{beer.name}</h2>
                    {/* <h2>{beer.englishName}</h2> */}
                    <div className="heartInline">
                      {
                        isLike === true
                        ? <BsHeart className="heartIcon" size="23" onClick={likeButton}></BsHeart>
                        : <BsHeartFill className="heartIcon" size="23" onClick={likeButton}></BsHeartFill>
                      }
                      <div className="like_count">(5)</div>
                    </div>
                  </div>

                  {/* 맥주 별점 + 평가하기버튼 */}
                  <div className="rate_spacebetween">
                    <div className='starInline'>
                      <div className='star'>★★★★☆</div>
                      <div>(4)</div>
                    </div>
                    <button className="RateBtn" onClick={()=> set_rateModal(true)}>평가하기</button>
                  </div>

                  {/* 평가창 모달 */}
                  {/* 평가했는지 여부에 따라 보여줄 모달이 다름 */}
                  { isRated 
                    ? <BeerRateUpdate 
                        starrate={starrate}
                        setStarrate={setStarrate} 
                        rateModal={rateModal} 
                        set_rateModal={set_rateModal} 
                        beerid={beerid}
                      />
                    : <BeerRate 
                        starrate={starrate}
                        setStarrate={setStarrate} 
                        rateModal={rateModal} 
                        set_rateModal={set_rateModal} 
                        beerid={beerid}
                      />
                  }
                  


                  {/* 맥주 detail 내용 */
                  <div className='beer_volume'>
                    ALC : {beer.volume}%
                  </div>}
                  <p className="beer_content">{ beer.content }</p>

                  {/* 맥주 # 해시태그 */}
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

        {/* 맥주별 포스트 목록 */}
        <section className="postlist_section">
          <div className="container">
            <div className='heading_posts'>
              <h1>Post</h1>
              {/* 포스팅하기 버튼 */}
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
