import { useEffect, useState } from "react";
import StarRate from './StartRate.js'
import Modal from 'react-modal';
import '../../styles/BeerRate.css'
import axios from "axios";

function BeerRate(props){
  const BEER_RATE_URL = process.env.REACT_APP_SERVER + ':8080/v1/beer'
  const memberId = 1    // test용 멤버 아이디
  const starrate = props.starrate
  const beerid = props.beerid
  
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
  // 맛 해시태그 
  const [flavorArr, setFlavorArr] = useState([])      //보여주기용
  const [flavorIdArr, setFlavorIdArr] = useState([])  //데이터전송용 아이디배열
  const addflavor = ((e)=>{
    console.log(e)
    const nowtag = e.target.innerText.substring(1)
    const nowid = e.target.value
    if (flavorArr.indexOf(nowtag) == -1) {
      setFlavorArr((flavorArr) => [...flavorArr, nowtag])
      setFlavorIdArr((flavorid) => [...flavorid, nowid])
    }
    // console.log(aromaArr)
  })
  const deleteFlavor = (e) => {
    const nowtag = e.target.outerText.substring(1)
    setFlavorArr(flavorArr.filter((flavor) => flavor !== nowtag ))
    // console.log(flavorArr)
  }

  // 향 해시태그 
  const [aromaArr, setAromaArr] = useState([])      //보여주기용
  const [aromaIdArr, setAromaIdArr] = useState([])  //데이터전송용 아이디배열
  const addAroma = ((e)=>{
    const nowtag = e.target.innerText.substring(1)
    const nowid = e.target.value
    if (aromaArr.indexOf(nowtag) == -1) {
      setAromaArr((aromaArr) => [...aromaArr, nowtag])
      setAromaIdArr((aromaid) => [...aromaid, nowid])
    }
    // console.log(aromaArr)
  })
  const deleteAroma = (e) => {
    const nowtag = e.target.outerText.substring(1)
    console.log(nowtag)
    setAromaArr(aromaArr.filter((aroma) => aroma !== nowtag ))
    // console.log(aromaArr)
  }

  /////// 평가수정 = put 보내기
  const submitRate = ()=> {
    const newrate = {
      aromaHashTags : aromaIdArr,
      flavorHashTags : flavorIdArr,
      rate : starrate
    }
    console.log(newrate)
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': "application/json; charset=UTF-8"
    }
    // console.log(aromaArr, flavorArr)
    if (aromaArr.length && flavorArr.length && starrate) {
      console.log(newrate)
      axios.put(`${BEER_RATE_URL}/${beerid}/member/${memberId}`, newrate, {headers}) 
      .then((res) => {
        console.log(res)
        props.set_rateModal(false)
      })
    } else {
      alert('평가를 완료해주세요!')
    }
  }

  // 평가했던 값들 불러오기
  const [rateDetail, setRateDetail] = useState()
  useEffect(()=>{
    const fetchData = async ()=>{
      const {data:ratedata} = await axios.get(`${BEER_RATE_URL}/${beerid}/member/${memberId}`)
      setRateDetail(ratedata)
      setAromaArr(ratedata.aromaHashTags)
      setFlavorArr(ratedata.flavorHashTags)
      props.setStarrate(ratedata.rate)

      // setAromaIdArr(ratedata.aromaHashTags.id)
      // setFlavorIdArr(ratedata.flavorHashTags.id)

    }

    fetchData();
  }, [BEER_RATE_URL])


  return(
    // <Modal isOpen={props.rateModal} onRequestClose={() => props.set_rateModal(false)} style={modal_style} ariaHideApp={false} >
    <Modal isOpen={props.rateModal} style={modal_style} ariaHideApp={false} >
    <div className="ratemodal_section">
      <h4 className="modal_heading">Beer Rate</h4>
      <StarRate setStarrate={props.setStarrate} starrate={props.starrate}></StarRate>

      <div className="row"> 

        {/* 맛 해시태그 선택 */}
        <div className="selecttag_box col-6"> 
          <h4>Flavor</h4>
          <select className="rate_select"  multiple>
            <option value="" disabled>
              맛 선택!
            </option>
            <option onClick={addflavor} value="1" >#단맛</option>
            <option onClick={addflavor} value="2" >#쓴맛</option>
            <option onClick={addflavor} value="3" >#신맛</option>
            <option onClick={addflavor} value="4" >#감칠맛</option>
            <option onClick={addflavor} value="5" >#떫은맛</option>
            <option onClick={addflavor} value="6" >#드라이함</option>
            <option onClick={addflavor} value="7" >#알싸한맛</option>
            <option onClick={addflavor} value="8" >#고소한맛</option>
            <option onClick={addflavor} value="9" >#상큼한맛</option>
            <option onClick={addflavor} value="10">#시큼한맛</option>
            <option onClick={addflavor} value="11">#씁쓸한맛</option>
            <option onClick={addflavor} value="12">#새콤한맛</option>
            <option onClick={addflavor} value="13">#청량한맛</option>
          </select>
          <div className="flavortag_div">
            { flavorArr && flavorArr.map((flavor, i)=>{
              return (
                <div key={i} className="flavor_wrap_inner" onClick={deleteFlavor}>#{flavor}</div>
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
            <option onClick={addAroma} value="1">#무향</option>
            <option onClick={addAroma} value="2">#꽃향</option>
            <option onClick={addAroma} value="3">#캐러멜향</option>
            <option onClick={addAroma} value="4">#허브향</option>
            <option onClick={addAroma} value="5">#커피향</option>
            <option onClick={addAroma} value="6">#소나무향</option>
            <option onClick={addAroma} value="7">#초콜릿향</option>
            <option onClick={addAroma} value="8">#건포도향</option>
            <option onClick={addAroma} value="9">#스모크향</option>
            <option onClick={addAroma} value="10">#바닐라향</option>
            <option onClick={addAroma} value="11">#코코넛향</option>
            <option onClick={addAroma} value="12">#홉향</option>
            <option onClick={addAroma} value="13">#옥수수향</option>
            <option onClick={addAroma} value="14">#보리향</option>
            <option onClick={addAroma} value="15">#귀리향</option>
            <option onClick={addAroma} value="16">#풀향</option>
            <option onClick={addAroma} value="17">#곡물향</option>
            <option onClick={addAroma} value="18">#민트향</option>
            <option onClick={addAroma} value="19">#과일향</option>
            <option onClick={addAroma} value="20">#바나나향</option>
            <option onClick={addAroma} value="21">#오렌지향</option>
            <option onClick={addAroma} value="22">#자두향</option>
            <option onClick={addAroma} value="23">#자몽향</option>
            <option onClick={addAroma} value="24">#복숭아향</option>
            <option onClick={addAroma} value="25">#망고향</option>
            <option onClick={addAroma} value="26">#귤향</option>
            <option onClick={addAroma} value="27">#레몬향</option>
            <option onClick={addAroma} value="28">#청포도향</option>
            <option onClick={addAroma} value="29">#살구향 </option>
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
