import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import Modal from 'react-modal';
import StarRate from './StartRate.js'
import axios from "axios"
// import { getDownloadURL, getStorage , ref } from "firebase/storage";
import "../../firebase_config"
import '../../styles/BeerDetail.css'
import PostListComponent from "../../components/Post/PostList"
// import "../../styles/PostList.css"

function BeerDetail() {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + ':8080/v1/beer'
  const BEER_DETAIL_POST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post/beer'
  const BEER_DETAIL_LOG_URL = process.env.REACT_APP_SERVER +':8080/v1/log'

  // 맥주 data
  const [beer, setbeer] = useState()
  // 맥주의 posts
  const [beerpost, setbeerpost] = useState()
  // const [beerImg, setbeerImg] = useState()
  const { beerid } = useParams();

  useEffect(()=>{
    const fetchData = async ()=>{
      const beerdetail = await axios.get(`${BEER_DETAIL_URL}/${beerid}`)
      // const beerdetail = await axios.get(`http://13.125.157.39:8080/v1/beer/${beerid}`)
      const nowbeerDetail = beerdetail.data
      setbeer(beerdetail.data)

      // 맥주별 포스트 목록
      const beer_postdetail = await axios.get(`${BEER_DETAIL_POST_URL}/${beerid}`)
      setbeerpost(beer_postdetail.data)

      // 로그 보내기
      const hashTagArr = [nowbeerDetail.beerType.main, ...nowbeerDetail.aromaHashTags , ...nowbeerDetail.flavorHashTags]
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
  }, [BEER_DETAIL_POST_URL, BEER_DETAIL_URL, beerid])

  const [isLike, setisLike] = useState(false)
  const [rateModal, set_rateModal] = useState(false)

 
  // 모달창 켜지면 스크롤 안움직이게 함
  { rateModal ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset" }

  //////// 맥주평가모달창
  // 별점
  const [starrate, setStarrate] = useState()

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
                        ? <BsHeart className="heartIcon" size="23" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                        : <BsHeartFill className="heartIcon" size="23" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
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
                  <평가모달 
                    starrate={starrate}
                    setStarrate={setStarrate} 
                    rateModal={rateModal} 
                    set_rateModal={set_rateModal} 
                  />

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
            {beerpost && 
              <PostListComponent postdata={beerpost}/>
            }
          </div>

        </section>
        </div>
      }

      
    </div>
  )
  }

  function 평가모달(props){
    const modal_style = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.9)'
      },
      content: {
        position: 'absolute',
        width: '300px',
        height: '500px',
        top: '200px',
        bottom: '200px',
        margin: 'auto',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        // padding: '20px'
      }
    }
    const [flavorArr, setFlavorArr] = useState([])
    const addflavor = ((e)=>{
      // e.preventDefault()
      const nowtag = e.target.value
      /* 요소 불러오기, 만들기*/
      const flavorWrapOuter = document.querySelector('.flavortag_div')
      const flavorWrapInner = document.createElement('div')
      flavorWrapInner.className = 'flavor_wrap_inner'
      // /* 태그를 클릭 이벤트 관련 로직 */
      flavorWrapInner.addEventListener('click', () => {
        flavorWrapOuter.removeChild(flavorWrapInner)
        // console.log(flavorWrapInner.innerHTML)
        setFlavorArr(flavorArr.filter((flavor) => flavor))
        console.log(flavorArr)
      })
      // // 비어있지 않으면 해시태그 추가
      if (nowtag.trim() !== '') {
        console.log('해시태그 추가', nowtag)
        flavorWrapInner.innerHTML = '#' + nowtag
        flavorWrapOuter?.appendChild(flavorWrapInner)
        setFlavorArr((flavorArr) => [...flavorArr, nowtag])
        // setHashtag('')
      }
    })

    const [aromaArr, setAromaArr] = useState([])
    const addAroma = ((e)=>{
      // e.preventDefault()
      const nowtag = e.target.value
      /* 요소 불러오기, 만들기*/
      const aromaWrapOuter = document.querySelector('.aromatag_div')
      const aromaWrapInner = document.createElement('div')
      aromaWrapInner.className = 'aroma_wrap_inner'
      // /* 태그를 클릭 이벤트 관련 로직 */
      aromaWrapInner.addEventListener('click', () => {
        aromaWrapOuter.removeChild(aromaWrapInner)
        // console.log(aromaWrapInner.innerHTML)
        setFlavorArr(aromaArr.filter((aroma) => aroma))
        console.log(aromaArr)
      })
      // // 비어있지 않으면 해시태그 추가
      if (nowtag.trim() !== '') {
        console.log('해시태그 추가', nowtag)
        aromaWrapInner.innerHTML = '#' + nowtag
        aromaWrapOuter?.appendChild(aromaWrapInner)
        setFlavorArr((aromaArr) => [...aromaArr, nowtag])
        // setHashtag('')
      }
    })

    return(
      // <Modal isOpen={rateModal} onRequestClose={() => set_rateModal(false)}>
      <Modal isOpen={props.rateModal} style={modal_style} ariaHideApp={false} >
      <div className="ratemodal_section">
        <h4 className="modal_heading">Beer Rate</h4>
        <StarRate setStarrate={props.setStarrate}></StarRate>

        <div className="row"> 

          {/* 맛 해시태그 선택 */}
          <div className="selecttag_box col-6"> 
            <h4>Flavor</h4>
            <select className="rate_select"  multiple>
              <option value="" disabled selected>
                맛 선택!
              </option>
              <option onClick={addflavor} value="단맛">#단맛</option>
              <option onClick={addflavor} value="쓴맛">#쓴맛</option>
              <option onClick={addflavor} value="신맛">#신맛</option>
              <option onClick={addflavor} value="감칠맛">#감칠맛</option>
              <option onClick={addflavor} value="떫은맛">#떫은맛</option>
              <option onClick={addflavor} value="드라이함">#드라이함</option>
              <option onClick={addflavor} value="알싸한맛">#알싸한맛</option>
              <option onClick={addflavor} value="고소한맛">#고소한맛</option>
              <option onClick={addflavor} value="상큼한맛">#상큼한맛</option>
              <option onClick={addflavor} value="시큼한맛">#시큼한맛</option>
              <option onClick={addflavor} value="씁쓸한맛">#씁쓸한맛</option>
              <option onClick={addflavor} value="새콤한맛">#새콤한맛</option>
              <option onClick={addflavor} value="청량한맛">#청량한맛</option>
            </select>
            <div className="flavortag_div">
              {/* 여기에 추가한 태그들 보여줌 */}
              {/* 추가한 태그들 class = "flavor_wrap_inner" */}
            </div>
          </div>
        

          {/* 향 해시태그 선택 */}
          <div className="selecttag_box col-6"> 
            <h4>Aroma</h4>
            <div></div>
            <select className="rate_select"  multiple>
              <option value="" disabled selected>
                향 선택!
              </option>
              <option onClick={addAroma} value="무향">#무향</option>
              <option onClick={addAroma} value="꽃향">#꽃향</option>
              <option onClick={addAroma} value="캐러멜향">#캐러멜향</option>
              <option onClick={addAroma} value="허브향">#허브향</option>
              <option onClick={addAroma} value="커피향">#커피향</option>
              <option onClick={addAroma} value="소나무향">#소나무향</option>
              <option onClick={addAroma} value="초콜릿향">#초콜릿향</option>
              <option onClick={addAroma} value="건포도향">#건포도향</option>
              <option onClick={addAroma} value="스모크향">#스모크향</option>
              <option onClick={addAroma} value="바닐라향">#바닐라향</option>
              <option onClick={addAroma} value="코코넛향">#코코넛향</option>
              <option onClick={addAroma} value="홉향">#홉향</option>
              <option onClick={addAroma} value="옥수수향">#옥수수향</option>
              <option onClick={addAroma} value="보리향">#보리향</option>
              <option onClick={addAroma} value="귀리향">#귀리향</option>
              <option onClick={addAroma} value="풀향">#풀향</option>
              <option onClick={addAroma} value="곡물향">#곡물향</option>
              <option onClick={addAroma} value="민트향">#민트향</option>
              <option onClick={addAroma} value="과일향">#과일향</option>
              <option onClick={addAroma} value="바나나향">#바나나향</option>
              <option onClick={addAroma} value="오렌지향">#오렌지향</option>
              <option onClick={addAroma} value="자두향">#자두향</option>
              <option onClick={addAroma} value="자몽향">#자몽향</option>
              <option onClick={addAroma} value="망고향">#망고향</option>
              <option onClick={addAroma} value="귤향">#귤향</option>
              <option onClick={addAroma} value="레몬향">#레몬향</option>
              <option onClick={addAroma} value="청포도향">#청포도향</option>
              <option onClick={addAroma} value="살구향">#살구향 </option>
            </select>
            <div className="aromatag_div">
              {/* 여기에 추가한 태그들 보여줌 */}
              {/* 추가한 태그들 class = "aroma_wrap_inner" */}
            </div>
          </div>
        </div>

        {/* 평가완료버튼 */}
        <button className="submitRateBtn" onClick={()=> props.set_rateModal(false)}>완료</button>
      </div>
    </Modal>
    )
  }


export default BeerDetail;
