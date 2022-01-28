import { useEffect, useState } from "react";
import axios from "axios"
import { useParams, Link } from 'react-router-dom';
import { BsHeartFill, BsHeart, BsSlack, BsFileX } from "react-icons/bs";
// import { Button } from 'react-bootstrap';
import '../../styles/BeerDetail.css'
import Modal from 'react-modal';

function BeerDetail() {
  const [postnow, setpostnow] = useState()
  const { num } = useParams();

  useEffect(async ()=>{
    try{
      //api : http://localhost:3000//v1/beer/{beerId}
      const json = await axios.get("http://localhost:3000/data/postData.json")

      const postnum = json.data.find(function(post){
          return post.postId == num
      });
      setpostnow(postnum)
    }catch{
      console.log('오류')
    }
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

  return (
    <div className="BeerDetail">
      {
        postnow &&
        <section className="beerdetail_section layout_padding_beer">

          <div className="container">
            {/* 목록으로 가기 버튼 */}
            <div className='backBtn'>
              <Link className='btnText' to='/beer'><i className="fas fa-angle-double-left fa-lg"></i> 목록으로</Link>
            </div>

            <div className="row">
              <div className="col-md-6 ">
                <div className="img-box">
                  <img src='\img\5.0_오리지날_라거_medium_-removebg-preview.png'></img>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="beerCategory" href="">Pale Ale</div>

                  {/* 맥주 이름 + 하트 */}
                  <div className="heading_title spaceBetween">
                    <h2>Terra</h2>
                    <div className="heartInline">
                      {
                        isLike === true
                        ? <BsHeart className="heartIcon" size="22" onClick={()=>{setisLike(!isLike)}}></BsHeart>
                        : <BsHeartFill className="heartIcon" size="22" onClick={()=>{setisLike(!isLike)}}></BsHeartFill>
                      }
                      <div>({ postnow.likes })</div>
                    </div>
                  </div>

                  {/* 맥주 별점 + 평가하기버튼 */}
                  <div className="spaceBetween">
                    <div className='starInline'>
                      <div className='star'>★★★★☆</div>
                      <div>(4)</div>
                    </div>
                    <button className="RateBtn" onClick={()=> set_rateModal(true)}>평가하기</button>
                  </div>
                  {/* 평가창 모달 */}
                  {/* <Modal isOpen={rateModal} onRequestClose={() => set_rateModal(false)}> */}
                  <Modal isOpen={rateModal} style={modal_style}>
                    <h4> 평가</h4>

                    <button className="RateBtn" onClick={()=> set_rateModal(false)}>닫기</button>
                  </Modal>

                  {/* 맥주 detail 내용 */}
                  <p>{ postnow.post }</p>

                  {/* 맥주 # 해시태그 */}
                  <div className="hashtag">
                    {
                      postnow.Tag.map((tag, i)=>{
                        return(<span className="hashtag" key={i}>#{tag}</span>)
                      })
                    }
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>
      }

      <section className="BeerPosts_section">
        <div className="container">
          <div className='heading_posts'>
            <h1>Post</h1>
            {/* 포스팅하기 버튼 */}
            <div className='newPostBtn'>
              <Link className='btnText' to='/post/new'>포스팅하기</Link>
            </div>
          </div>

          <div className="row">포스트들</div>

        </div>

        
      </section>
    </div>
  )
  }
export default BeerDetail;
