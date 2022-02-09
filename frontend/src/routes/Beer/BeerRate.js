import { useState } from "react";
import StarRate from './StartRate.js'
import Modal from 'react-modal';
import '../../styles/BeerRate.css'
import axios from "axios";


function BeerRate(props){
  const BEER_RATE_URL = process.env.REACT_APP_BEER_DETAIL_URL
  const memberId = 1    // test용 멤버 아이디
  const starrate = props.starrate
  const beerid = props.beerid
  // console.log(props)

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
  // 맛 해시태그 배열
  const [flavorArr, setFlavorArr] = useState([])
  const addflavor = ((e)=>{
    const nowtag = e.target.value
    if (flavorArr.indexOf(nowtag) == -1) {
      setFlavorArr((flavorArr) => [...flavorArr, nowtag])
    }
    // console.log(aromaArr)
  })
  const deleteFlavor = (e) => {
    const nowtag = e.target.outerText.substring(1)
    setFlavorArr(flavorArr.filter((flavor) => flavor !== nowtag ))
    // console.log(flavorArr)
  }
  // const addflavor = ((e)=>{
  //   // e.preventDefault()
  //   const nowtag = e.target.value
  //   /* 요소 불러오기, 만들기*/
  //   const flavorWrapOuter = document.querySelector('.flavortag_div')
  //   const flavorWrapInner = document.createElement('div')
  //   flavorWrapInner.className = 'flavor_wrap_inner'
  //   // /* 태그를 클릭 = 삭제 */
  //   flavorWrapInner.addEventListener('click', () => {
  //     flavorWrapOuter.removeChild(flavorWrapInner)
  //     // console.log(flavorWrapInner.innerHTML)
  //     setFlavorArr(flavorArr.filter((flavor) => flavor !== nowtag ))
  //     console.log(flavorArr)
  //   })
  //   // // 비어있지 않으면 해시태그 추가
  //   if (nowtag.trim() !== '') {
  //     // console.log('해시태그 추가', nowtag)
  //     flavorWrapInner.innerHTML = '#' + nowtag
  //     flavorWrapOuter?.appendChild(flavorWrapInner)
  //     setFlavorArr((flavorArr) => [...flavorArr, nowtag])
  //     // setHashtag('')
  //   }
  // })

  // 향 해시태그 
  
  const [aromaArr, setAromaArr] = useState([])
  const addAroma = ((e)=>{
    const nowtag = e.target.value
    if (aromaArr.indexOf(nowtag) == -1) {
      setAromaArr((aromaArr) => [...aromaArr, nowtag])
    }
    // console.log(aromaArr)
  })
  const deleteAroma = (e) => {
    const nowtag = e.target.outerText.substring(1)
    console.log(nowtag)
    setAromaArr(aromaArr.filter((aroma) => aroma !== nowtag ))
    // console.log(aromaArr)
  }

  /////// 평가완료 = post 보내기
  const submitRate = ()=> {
    const newrate = {
      aromaHashTags : aromaArr,
      flavorHashTags : flavorArr,
      rate : starrate
    }
    console.log(newrate)
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': "application/json; charset=UTF-8"
    }
    console.log(aromaArr, flavorArr)
    if (aromaArr.length && flavorArr.length && starrate) {
      axios.post(`${BEER_RATE_URL}/${beerid}/member/${memberId}`, newrate, {headers}) 
      .then((res) => {
        console.log(res)
        props.set_rateModal(false)
      })
    } else {
      alert('평가를 완료해주세요!')
    }
  }

  return(
    <Modal isOpen={props.rateModal} onRequestClose={() => props.set_rateModal(false)} style={modal_style} ariaHideApp={false} >
    {/* <Modal isOpen={props.rateModal} style={modal_style} ariaHideApp={false} > */}
    <div className="ratemodal_section">
      <h4 className="modal_heading">Beer Rate</h4>
      <StarRate setStarrate={props.setStarrate}></StarRate>

      <div className="row"> 

        {/* 맛 해시태그 선택 */}
        <div className="selecttag_box col-6"> 
          <h4>Flavor</h4>
          <select className="rate_select"  multiple>
            <option value="" disabled>
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
            { flavorArr && flavorArr.map((flavor, i)=>{
              return (
                <div key={i}>
                  <div className="flavor_wrap_inner" onClick={deleteFlavor}>#{flavor}</div>
                </div>
              )
            }) }
          </div>
        </div>
      

        {/* 향 해시태그 선택 */}
        <div className="selecttag_box col-6"> 
          <h4>Aroma</h4>
          <div></div>
          <select className="rate_select"  multiple>
            <option value="" disabled>
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
            {/* {console.log(aromaArr)} */}
            {aromaArr && aromaArr.map((aroma, i)=>{
              return (
                  <div key={i} className="aroma_wrap_inner" onClick={deleteAroma}>#{aroma}</div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 평가완료버튼 */}
      <button className="submitRateBtn" onClick={submitRate}>완료</button>
    </div>
  </Modal>
  )
}

export default BeerRate;
