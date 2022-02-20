import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "react-redux";
import {  useHistory, useLocation } from "react-router-dom";
import "../../styles/ProfileEdit.css"
import axiosInstance from "CustomAxios";
import TextField  from "@mui/material/TextField"
import UserCheckBox from "components/User/UserCheckBox";
import { useCallback } from "react";
const ProfileEdit = () => {
  
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8888/v1/member/profile'
  const USER_NICKNAME_CHECK = process.env.REACT_APP_SERVER +  ':8888/v1/member/validatenickname'
  const [editUserNickname, setEditUserNickname] = useState('')
  const [introduce, setIntroduce] =useState('')
  const [labelNickname, setLabelNickname] = useState('success')
  const [beforeAroma, setBeforeAroma] = useState([])
  const [beforeFlavor, setBeforeFlavor] = useState([])
  const store = useStore((state)=>state)
  const user = store.getState().userReducer
  const history = useHistory();
  const location = useLocation();
  const beforeName = location.state.nickName
  const userId = location.state 

  


  const [flavors,setFlavors] = useState(["단맛", "쓴맛", "신맛", "감칠맛", "떫은맛", "드라이함", "알싸한맛", "고소한맛",  "상큼한맛" ,"시큼한맛", "씁쓸한맛", "새콤한맛", "청량한맛"])
  const [aromas, setAromas] = useState(["무향", "꽃향", "캐러멜향" , "허브향", "커피향", "소나무향", "초콜릿향", "건포도향", "스모크향", "바닐라향", "코코넛향", "홉향", "옥수수향", "보리향", "귀리향",  "풀향", "곡물향", "민트향", "과일향", "바나나향", "오렌지향",  "자두향", "자몽향", "복숭아향",  "망고향" ,  "귤향", "레몬향" ,"청포도향", "살구향"])
  const [checkedFlavors, setCheckedFlavors]  = useState(Array.from({length:13}, ()=>false))
  const [checkedAromas, setCheckedAromas] = useState(Array.from({length: 29}, ()=>false))
  const profileData = {
    "memberId": user.memberId,
    "nickName": editUserNickname,
    "intro":introduce,
    "aromas":[],
    "flavors":[],
  }
  store.subscribe(()=>{
    profileData.flavors = store.getState().checkBoxFlavorReducer
  })
  store.subscribe(()=>{
    profileData.aromas = store.getState().checkBoxAromaReducer
    
  })
  const submitProfile = async () =>{

    if (introduce && editUserNickname){
      await axiosInstance.put(USER_UPDATE_PROFILE, profileData)
      .then((res)=>{
         history.push(`/profile/${user.memberId}/profile`)
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      alert('내용을 입력하세요')
    }
   }
  const nickNameCheck = async () =>{
    if (!(editUserNickname === '')){
      const data = await axiosInstance.get(`${USER_NICKNAME_CHECK}/${editUserNickname}`)

      
      if (beforeName === editUserNickname){
        return
      } else {

        setLabelNickname(data.data)
      }
     
  }
}

  const editIntroduce = (e) =>{
    setIntroduce(e.target.value)
  }

  const editNickname = (e)=>{
    setEditUserNickname(e.target.value)
  }
  const fetchData = async() =>{
    const data = await axiosInstance.get(`http://i6c107.p.ssafy.io:8080/v1/member/profile/${user.memberId}`)
    const temp = [...checkedFlavors]
    for (let i of data.data.flavors) {
      temp[i - 1] = true
    }

    setCheckedFlavors(temp)
    const temp2 = [...checkedAromas]
    for (let i of data.data.aromas){
      temp2[i - 1] = true
    }
    setCheckedAromas(temp2)


    setEditUserNickname(data.data.nickName)
    setIntroduce(data.data.intro)

    setFlavors([...flavors])
    setAromas([...aromas])
  }



  useEffect(()=>{
    fetchData();
  }, [])


  useEffect(()=>{
    nickNameCheck();
  }, [editUserNickname, nickNameCheck])

  useEffect(()=>{
    console.log(userId)
    console.log(store.getState().userReducer.memberId)
		// if (Number(userId) !== Number(store.getState().userReducer.memberId)){
		// 	alert('권한이 없습니다.')
		// 	history.push('/home')
		// }
		
	}, [])

    


  return (
    <div className="edit-box">
      <h1>{editUserNickname}'s Profile</h1>
      <br></br>
      <form>
      <div className="">
        <div className="name-box ">
          <TextField className="input_box" id="nickname" label="닉네임" value={editUserNickname} onKeyUp={editNickname} onChange={editNickname}/>
          <label className={labelNickname} htmlFor="nickname">{ labelNickname === "success" ? '사용 가능한 닉네임입니다.': '사용할 수 없는 닉네임입니다.'}</label>
        </div>
        <div className="content_box ">
          <TextField className="input_box" id="outlined-basic" label="소개" variant="outlined" value={introduce} onKeyUp={editIntroduce} onChange={editIntroduce}/>
        </div>
      </div>
      
      <br></br>
        
      <div className="intro-box">
        <div>
          <h3>Select Choices[Flavor]</h3>
          <div style={{backgroundColor:'#f9d06880', borderStyle:"solid", borderColor:"#F9CF68", borderRadius:'15px'}}>
            
            <div className="container">
              
            {flavors.map((value, idx)=>{

              return <UserCheckBox key={idx + 1} label={value} idx={idx +1} checked={checkedFlavors[idx]}/>

            })}
            </div>
          </div>
          <br/>
          <h3>Select Choices[Aroma]</h3>
          <div style={{backgroundColor:'#f9d06880', borderStyle:"solid", borderColor:"#F9CF68", borderRadius:'15px'}}>
          <div className="container">

          {aromas.map((value, idx)=>
            <UserCheckBox key={idx+14} label={value} idx={idx+14} checked={checkedAromas[idx]}/>

          )}
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
