import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import Modal from 'react-modal';
import StarRate from './StartRate.js'
import axios from "axios"
import { getDownloadURL, getStorage , ref } from "firebase/storage";
import "../../firebase_config"
import '../../styles/BeerDetail.css'

function BeerDetail() {
  const [beer, setbeer] = useState()
  const [beerImg, setbeerImg] = useState()
  const { beerid } = useParams();

  useEffect(async ()=>{
    //api :  http://i6c107.p.ssafy.io:8080/v1/beer/{beerId}
    const beerdetail = await axios.get(`http://i6c107.p.ssafy.io:8080/v1/beer/${beerid}`)
    setbeer(beerdetail.data)

    const storage = getStorage()
    const storageRef = ref(storage, `gs://ssafy-01-beer-image.appspot.com/${beerdetail.data.photoPath}`)
    getDownloadURL(storageRef)
    .then((url)=>{
      setbeerImg(url)
    })

  }, [])

  const [isLike, setisLike] = useState(false)
  const [rateModal, set_rateModal] = useState(false)

  const modal_style = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    content: {
      position: 'absolute',
      width: '300px',
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
  // 모달창 켜지면 스크롤 안움직이게 함
  { rateModal ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset" }


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
                  <img src={beerImg}></img>
                </div>
              </div>

              {/* 맥주 디테일 */}
              <div className="col-md-6">
                <div className="detail-box">

                  {/* 맥주 종류 */}
                  <div className="beerCategory" href="">{beer.beerType.main}</div>
                  { beer.beerType.detail 
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
                  {/* <Modal isOpen={rateModal} onRequestClose={() => set_rateModal(false)}> */}
                  <Modal isOpen={rateModal} style={modal_style} ariaHideApp={false} >
                    <div className="ratemodal_section">
                      <h4 className="modal_heading">맥주 평가</h4>
                      <StarRate></StarRate>
                      <label> flavor : 
                        <div></div>
                        {/* <br></br> */}
                        <select className="rate_select"  multiple>
                          <option value="" disabled selected>
                            맛을 선택해주세요.
                          </option>
                          <option value="단맛">#단맛</option>
                          <option>#쓴맛</option>
                          <option>#상큼한맛</option>
                          <option>#매운맛</option>
                          <option>#씁쓸한맛</option>
                        </select>
                      </label>
                      {/* <label> aroma : 
                        <input type=""></input>
                      </label> */}
                      <button className="submitRateBtn" onClick={()=> set_rateModal(false)}>완료</button>
                    </div>
                  </Modal>

                  {/* 맥주 detail 내용 */
                  <div className='beer_volume'>
                    (도수 : {beer.volume}도)
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
        <section className="BeerPosts_section">
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
            <div className="row">포스트들</div>
          </div>

        </section>
        </div>
      }

      
    </div>
  )
  }



export default BeerDetail;
