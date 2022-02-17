import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "react-redux";
import {  useHistory, useLocation } from "react-router-dom";
import "../../styles/ProfileEdit.css"
import axiosInstance from "CustomAxios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox"
import TextField  from "@mui/material/TextField"
import { useCallback } from "react";

const ProfileEdit = () => {
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8888/v1/member/profile'
  const USER_NICKNAME_CHECK = process.env.REACT_APP_SERVER +  ':8888/v1/member/validatenickname'
  const [editUserNickname, setEditUserNickname] = useState('')
  const [beforeNickname, setBeforeNickname] = useState('')
  const [introduce, setIntroduce] =useState('')
  const [labelNickname, setLabelNickname] = useState('success')
  const [flavors, setFlavors] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false])
  const [aromas, setAromas] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])
  const flavorName = ["단맛", "쓴맛", "신맛", "감칠맛", "떫은맛", "드라이함", "알싸한맛", "고소한맛", "상큼한맛", "시큼한맛", "씁쓸한맛", "새콤한맛", "청량한맛"]
  const aromaName = ["무향", "꽃향", "캐러멜향", "허브향", "커피향", "소나무향", "초콜릿향", "건포도향", "스모크향", "바닐라향", "코코넛향", "홉향", "옥수수향", "보리향", "귀리향", "풀향", "곡물향", "민트향", "과일향", "바나나향", "오렌지향", "자두향", "자몽향", "복숭아향", "망고향", "귤향", "레몬향", "청포도향", "살구향"]
  const store = useStore((state)=>state)
  const user = store.getState().userReducer
  const history = useHistory();
  const location = useLocation();
  const userId = location.state
  const profileData = {
    "memberId": user.memberId,
    "nickName": editUserNickname,
    "intro":introduce,
    "aromas":[],
    "flavors":[],
  }
  const submitProfile = () =>{
    if (introduce && editUserNickname){
      profileData['aromas'] = aromas
      profileData['flavors'] = flavors
      axiosInstance.put(USER_UPDATE_PROFILE, profileData)
      .then((res)=>{
        console.log(res)
        history.push(`/profile/${user.memberId}/profile`)
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      alert('내용을 입력하세요')
    }
   }
  const nickNameCheck = useCallback( async () =>{
    if (!(editUserNickname === '')){
      const data = await axiosInstance.get(`${USER_NICKNAME_CHECK}/${editUserNickname}`)
      setLabelNickname(data.data)
    }
  }, [USER_NICKNAME_CHECK, editUserNickname])

  const editIntroduce = (e) =>{
    setIntroduce(e.target.value)
  }
  const editNickname = (e)=>{
    setEditUserNickname(e.target.value)
  }
  const fetchData = async() =>{
    const data = await axiosInstance.get(`http://i6c107.p.ssafy.io:8888/v1/member/profile/${user.memberId}`)
    setEditUserNickname(data.data.nickName)
    setBeforeNickname(data.data.nickName)
    setIntroduce(data.data.intro)
    const checkedFlavor = data.data.flavors
    const checkedAroma = data.data.aromas
    const copiedFlavor = [...flavors]
    const copiedAroma = [...aromas]
    for (let i = 1; i < copiedFlavor.length + 1; i++){
      if (i in checkedFlavor) {
        copiedFlavor[i - 1] = true 
      }
    }
    setFlavors(copiedFlavor)
    for (let i = 1; i < copiedAroma.length + 1; i++){
      if (i in checkedAroma) {
        copiedAroma[i - 1] = true
      }
    }
    setAromas(copiedAroma)
  }
  useEffect(()=>{
    fetchData();
  }, [])


  useEffect(()=>{
    nickNameCheck();
  }, [editUserNickname, nickNameCheck])


  useEffect(()=>{
		if (Number(userId) !== Number(store.getState().userReducer.memberId)){
			alert('권한이 없습니다.')
			history.push('/home')
		}
	}, [])

  useEffect(()=>{
    if (labelNickname === "fail"){
      document.getElementsByClassName('profile-btn').disabled = true
    }
    if (labelNickname === 'success'){
      document.getElementsByClassName('profile-btn').disabled = false
    }
  }, [labelNickname])
  function handleChange(e){
    if (parseInt(e) < 14){
    const flavorData = [...flavors]
    flavorData[e - 1] = true
    setFlavors(flavorData)
    } else {
      const aromaData = [...aromas]
      aromaData[e - 1] = true
      setAromas(aromaData)
    }
    
  }
  return (
    <div className="container edit-box" >
      <h1>{editUserNickname}'s Profile</h1>
      <br></br>
      <form>
      <div className="">
        <div className="name-box ">
          <TextField className="input_box" id="nickname" label="닉네임" value={editUserNickname} onKeyUp={editNickname} onChange={editNickname}/>
          <label className={labelNickname} htmlFor="nickname">{ (labelNickname === "success") || (beforeNickname === editUserNickname) ? '사용 가능한 닉네임입니다.': '사용할 수 없는 닉네임입니다.'}</label>
        </div>
        <div className="content_box ">
          <TextField placeholder="150자 이내로 작성해주세요" className="input_box" id="outlined-basic" label="소개" variant="outlined" value={introduce} onKeyUp={editIntroduce} onChange={editIntroduce}/>
        </div>
      </div>
      
      <br></br>
        
      <div className="intro-box">
        <div>
          <h3>Select Choices[Flavor]</h3>
          <div style={{backgroundColor:'#f9d06880', borderStyle:"solid", borderColor:"#F9CF68", borderRadius:'15px'}}>
            
            <div className="container">
              
            {flavors.length !== 0 ? flavors.map((flavor, i)=>
              <FormControlLabel key={i} control={<Checkbox checked={flavor} onChange={handleChange(i + 1)} />} label={flavorName[i]} /> 
            ):null}

            </div>
          </div>
          <br/>
          <h3>Select Choices[Aroma]</h3>
          <div style={{backgroundColor:'#f9d06880', borderStyle:"solid", borderColor:"#F9CF68", borderRadius:'15px'}}>
          <div className="container">
          {aromas.length !== 0 ? aromas.map((aroma, i)=>
              <FormControlLabel key={i} control={<Checkbox checked={aroma} onChange={handleChange(i + 13)} />} label={aromaName[i]} /> 
            ):null}
          </div>  
          </div>

        </div>
      </div>
      <br></br>
      <div id="btn-box">
      
      <div role={'button'} className="profile-btn" onClick={submitProfile}>완료</div>
      
      </div>
      </form>
    </div>
  )
}
export default ProfileEdit;