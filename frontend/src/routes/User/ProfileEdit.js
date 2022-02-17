import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "react-redux";
import {  useHistory, useLocation } from "react-router-dom";
import "../../styles/ProfileEdit.css"
import axiosInstance from "CustomAxios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox"
import TextField  from "@mui/material/TextField"

const ProfileEdit = () => {
  
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8888/v1/member/profile'
  const USER_NICKNAME_CHECK = process.env.REACT_APP_SERVER +  ':8888/v1/member/validatenickname'
  const [editUserNickname, setEditUserNickname] = useState('')
  const [introduce, setIntroduce] =useState('')
  const [labelNickname, setLabelNickname] = useState('fail')
  const store = useStore((state)=>state)
  const user = store.getState().userReducer
  const history = useHistory();
  const location = useLocation();
  const userId = location.state  


  

  const handleChange1 = (e) =>{
    setChecked1(e.target.checked)
  }
  const handleChange2 = (e) =>{
    setChecked2(e.target.checked)
  }
  const handleChange3 = (e) =>{
    setChecked3(e.target.checked)
  }
  const handleChange4 = (e) =>{
    setChecked4(e.target.checked)
  }
  const handleChange5 = (e) =>{
    setChecked5(e.target.checked)
  }
  const handleChange6 = (e) =>{
    setChecked6(e.target.checked)
  }
  const handleChange7 = (e) =>{
    setChecked7(e.target.checked)
  }
  const handleChange8 = (e) =>{
    setChecked8(e.target.checked)
  }
  const handleChange9 = (e) =>{
    setChecked9(e.target.checked)
  }
  const handleChange10 = (e) =>{
    setChecked10(e.target.checked)
  }
  const handleChange11 = (e) =>{
    setChecked11(e.target.checked)
  }
  const handleChange12 = (e) =>{
    setChecked12(e.target.checked)
  }
  const handleChange13 = (e) =>{
    setChecked13(e.target.checked)
  }
  const handleChange14 = (e) =>{
    setChecked14(e.target.checked)
  }
  const handleChange15 = (e) =>{
    setChecked15(e.target.checked)
  }
  const handleChange16 = (e) =>{
    setChecked16(e.target.checked)
  }
  const handleChange17 = (e) =>{
    setChecked17(e.target.checked)
  }
  const handleChange18 = (e) =>{
    setChecked18(e.target.checked)
  }
  const handleChange19 = (e) =>{
    setChecked19(e.target.checked)
  }
  const handleChange20 = (e) =>{
    setChecked20(e.target.checked)
  }
  const handleChange21 = (e) =>{
    setChecked21(e.target.checked)
  }
  const handleChange22 = (e) =>{
    setChecked22(e.target.checked)
  }
  const handleChange23 = (e) =>{
    setChecked23(e.target.checked)
  }
  const handleChange24 = (e) =>{
    setChecked24(e.target.checked)
  }
  const handleChange25 = (e) =>{
    setChecked25(e.target.checked)
  }
  const handleChange26 = (e) =>{
    setChecked26(e.target.checked)
  }
  const handleChange27 = (e) =>{
    setChecked27(e.target.checked)
  }
  const handleChange28 = (e) =>{
    setChecked28(e.target.checked)
  }
  const handleChange29 = (e) =>{
    setChecked29(e.target.checked)
  }
  const handleChange30 = (e) =>{
    setChecked30(e.target.checked)
  }
  const handleChange31 = (e) =>{
    setChecked31(e.target.checked)
  }
  const handleChange32 = (e) =>{
    setChecked32(e.target.checked)
  }
  const handleChange33 = (e) =>{
    setChecked33(e.target.checked)
  }
  const handleChange34 = (e) =>{
    setChecked34(e.target.checked)
  }
  const handleChange35 = (e) =>{
    setChecked35(e.target.checked)
  }
  const handleChange36 = (e) =>{
    setChecked36(e.target.checked)
  }
  const handleChange37 = (e) =>{
    setChecked37(e.target.checked)
  }
  const handleChange38 = (e) =>{
    setChecked38(e.target.checked)
  }
  const handleChange39 = (e) =>{
    setChecked39(e.target.checked)
  }
  const handleChange40 = (e) =>{
    setChecked40(e.target.checked)
  }
  const handleChange41 = (e) =>{
    setChecked41(e.target.checked)
  }
  const handleChange42 = (e) =>{
    setChecked42(e.target.checked)
  }
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [checked3, setChecked3] = useState(false)
  const [checked4, setChecked4] = useState(false)
  const [checked5, setChecked5] = useState(false)
  const [checked6, setChecked6] = useState(false)
  const [checked7, setChecked7] = useState(false)
  const [checked8, setChecked8] = useState(false)
  const [checked9, setChecked9] = useState(false)
  const [checked10, setChecked10] = useState(false)
  const [checked11, setChecked11] = useState(false)
  const [checked12, setChecked12] = useState(false)
  const [checked13, setChecked13] = useState(false)
  const [checked14, setChecked14] = useState(false)
  const [checked15, setChecked15] = useState(false)
  const [checked16, setChecked16] = useState(false)
  const [checked17, setChecked17] = useState(false)
  const [checked18, setChecked18] = useState(false)
  const [checked19, setChecked19] = useState(false)
  const [checked20, setChecked20] = useState(false)
  const [checked21, setChecked21] = useState(false)
  const [checked22, setChecked22] = useState(false)
  const [checked23, setChecked23] = useState(false)
  const [checked24, setChecked24] = useState(false)
  const [checked25, setChecked25] = useState(false)
  const [checked26, setChecked26] = useState(false)
  const [checked27, setChecked27] = useState(false)
  const [checked28, setChecked28] = useState(false)
  const [checked29, setChecked29] = useState(false)
  const [checked30, setChecked30] = useState(false)
  const [checked31, setChecked31] = useState(false)
  const [checked32, setChecked32] = useState(false)
  const [checked33, setChecked33] = useState(false)
  const [checked34, setChecked34] = useState(false)
  const [checked35, setChecked35] = useState(false)
  const [checked36, setChecked36] = useState(false)
  const [checked37, setChecked37] = useState(false)
  const [checked38, setChecked38] = useState(false)
  const [checked39, setChecked39] = useState(false)
  const [checked40, setChecked40] = useState(false)
  const [checked41, setChecked41] = useState(false)
  const [checked42, setChecked42] = useState(false)
  const [userFlavor, setUserFlavor] = useState([checked1, checked2, checked3, checked4, checked5, checked6, checked7, checked8, checked9, checked10, checked11, checked12, checked13])
  const [userAroma, setUserAroma] = useState([
      checked14,
      checked15,
      checked16,
      checked17,
      checked18,
      checked19,
      checked20,
      checked21,
      checked22,
      checked23,
      checked24,
      checked25,
      checked26,
      checked27,
      checked28,
      checked29,
      checked30,
      checked31,
      checked32,
      checked33,
      checked34,
      checked35,
      checked36,
      checked37,
      checked38,
      checked39,
      checked40,
      checked41,
      checked42,
    ])
  const profileData = {
    "memberId": user.memberId,
    "nickName": editUserNickname,
    "intro":introduce,
    "aromas":[],
    "flavors":[],
  }
  const submitProfile = async () =>{
    console.log(userFlavor, userAroma)
    const userAromaData = []
    userAroma.map(async (data, i) =>{
      if (data){
        await userAromaData.push(i + 1)
      }
      return
    })
    const userFlavorData = []
    userFlavor.map(async (data, i) =>{
      if (data){
        await userFlavorData.push(i + 1)
      }
      return
    })
    console.log(Promise.all(userAromaData))
    console.log(userFlavorData)
    if (introduce && editUserNickname){
      
      profileData["aromas"] = userAromaData
      profileData["flavors"] = userFlavorData
      await axiosInstance.put(USER_UPDATE_PROFILE, profileData)
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
  const nickNameCheck = async () =>{
    if (!(editUserNickname === '')){
      const data = await axiosInstance.get(`${USER_NICKNAME_CHECK}/${editUserNickname}`)
      setLabelNickname(data.data)
     
  }
}

  const editIntroduce = (e) =>{
    setIntroduce(e.target.value)
  }

  const editNickname = (e)=>{
    setEditUserNickname(e.target.value)
  }

  useEffect(()=>{
    const fetchData = async() =>{
      const data = await axiosInstance.get(`http://i6c107.p.ssafy.io:8080/v1/member/profile/${user.memberId}`)
      setEditUserNickname(data.data.nickName)
      setIntroduce(data.data.intro)
      const checkedFlavor = data.data.flavors
      const checkedAroma = data.data.aromas
      const copiedFlavor = [...userFlavor]
      const copiedAroma = [...userAroma]
      for (let i = 1; i < copiedFlavor.length + 1; i++){

        if (i in checkedFlavor) {
          copiedFlavor[i - 1] = true 
        }
      }
      setUserFlavor(copiedFlavor)
      for (let i = 1; i < copiedAroma.length + 1; i++){
        if (i in checkedAroma) {
          copiedAroma[i - 1] = true
        }
      }
      setUserAroma(copiedAroma)

    }
    fetchData();
  }, [user])



  useEffect(()=>{
    nickNameCheck();
  }, [editUserNickname, nickNameCheck])

  
  useEffect(()=>{
		if (Number(userId) !== Number(store.getState().userReducer.memberId)){
			alert('권한이 없습니다.')
			history.push('/home')
		}
		
	}, [])





  return (
    <div className="edit-box">
      <h1>{editUserNickname}'s Profile</h1>
      <br></br>
      <form>
      <div className="">
        <div className="name-box ">
          <TextField className="input_box" id="nickname" label="닉네임" defaultValue={editUserNickname} onKeyUp={editNickname} onChange={editNickname}/>
          <label className={labelNickname} htmlFor="nickname">{ labelNickname === "success" ? '사용 가능한 닉네임입니다.': '사용할 수 없는 닉네임입니다.'}</label>
        </div>
        <div className="content_box ">
          <TextField className="input_box" id="outlined-basic" label="소개" variant="outlined" defaultValue={introduce} onKeyUp={editIntroduce} onChange={editIntroduce}/>
        </div>
      </div>
      
      <br></br>
        
      <div className="intro-box">
        <div>
          <h3>Select Choices[Flavor]</h3>
          <div style={{backgroundColor:'#f9d06880', borderStyle:"solid", borderColor:"#F9CF68", borderRadius:'15px'}}>
            
            <div className="container">
            <FormControlLabel color="warning" control={<Checkbox checked={checked1} onChange={handleChange1} />} label="단맛" />
            <FormControlLabel control={<Checkbox checked={checked2} onChange={handleChange2} />} label="쓴맛" />
            <FormControlLabel control={<Checkbox checked={checked3} onChange={handleChange3} />} label="신맛" />
            <FormControlLabel control={<Checkbox checked={checked4} onChange={handleChange4} />} label="감칠맛" />
            <FormControlLabel control={<Checkbox checked={checked5} onChange={handleChange5} />} label="떫은맛" />
            <FormControlLabel control={<Checkbox checked={checked6} onChange={handleChange6} />} label="드라이함" />
            <FormControlLabel control={<Checkbox checked={checked7} onChange={handleChange7} />} label="알싸한맛" />
            <FormControlLabel control={<Checkbox checked={checked8} onChange={handleChange8} />} label="고소한맛" />
            <FormControlLabel control={<Checkbox checked={checked9} onChange={handleChange9} />} label="상큼한맛" />
            <FormControlLabel control={<Checkbox checked={checked10} onChange={handleChange10} />} label="시큼한맛" />
            <FormControlLabel control={<Checkbox checked={checked11} onChange={handleChange11} />} label="씁쓸한맛" />
            <FormControlLabel control={<Checkbox checked={checked12} onChange={handleChange12} />} label="새콤한맛" />
            <FormControlLabel control={<Checkbox checked={checked13} onChange={handleChange13} />} label="청량한맛" />
            </div>
          </div>
          <br/>
          <h3>Select Choices[Aroma]</h3>
          <div style={{backgroundColor:'#f9d06880', borderStyle:"solid", borderColor:"#F9CF68", borderRadius:'15px'}}>
          <div className="container">
            <FormControlLabel control={<Checkbox checked={checked14} onChange={handleChange14} />} label="무향" />
            <FormControlLabel control={<Checkbox checked={checked15} onChange={handleChange15} />} label="꽃향" />
            <FormControlLabel control={<Checkbox checked={checked16} onChange={handleChange16} />} label="캐러멜향" />
            <FormControlLabel control={<Checkbox checked={checked17} onChange={handleChange17} />} label="허브향" />
            <FormControlLabel control={<Checkbox checked={checked18} onChange={handleChange18} />} label="커피향" />
            <FormControlLabel control={<Checkbox checked={checked19} onChange={handleChange19} />} label="소나무향" />
            <FormControlLabel control={<Checkbox checked={checked20} onChange={handleChange20} />} label="초콜릿향" />
            <FormControlLabel control={<Checkbox checked={checked21} onChange={handleChange21} />} label="건포도향" />
            <FormControlLabel control={<Checkbox checked={checked22} onChange={handleChange22} />} label="스모크향" />
            <FormControlLabel control={<Checkbox checked={checked23} onChange={handleChange23} />} label="바닐라향" />
            <FormControlLabel control={<Checkbox checked={checked24} onChange={handleChange24} />} label="코코넛향" />
            <FormControlLabel control={<Checkbox checked={checked25} onChange={handleChange25} />} label="홉향" />
            <FormControlLabel control={<Checkbox checked={checked26} onChange={handleChange26} />} label="옥수수향" />
            <FormControlLabel control={<Checkbox checked={checked27} onChange={handleChange27} />} label="보리향" />
            <FormControlLabel control={<Checkbox checked={checked28} onChange={handleChange28} />} label="귀리향" />
            <FormControlLabel control={<Checkbox checked={checked29} onChange={handleChange29} />} label="풀향" />
            <FormControlLabel control={<Checkbox checked={checked30} onChange={handleChange30} />} label="곡물향" />
            <FormControlLabel control={<Checkbox checked={checked31} onChange={handleChange31} />} label="민트향" />
            <FormControlLabel control={<Checkbox checked={checked32} onChange={handleChange32} />} label="과일향" />
            <FormControlLabel control={<Checkbox checked={checked33} onChange={handleChange33} />} label="바나나향" />
            <FormControlLabel control={<Checkbox checked={checked34} onChange={handleChange34} />} label="오렌지향" />
            <FormControlLabel control={<Checkbox checked={checked35} onChange={handleChange35} />} label="자두향" />
            <FormControlLabel control={<Checkbox checked={checked36} onChange={handleChange36} />} label="자몽향" />
            <FormControlLabel control={<Checkbox checked={checked37} onChange={handleChange37} />} label="복숭아향" />
            <FormControlLabel control={<Checkbox checked={checked38} onChange={handleChange38} />} label="망고향" />
            <FormControlLabel control={<Checkbox checked={checked39} onChange={handleChange39} />} label="귤향" />
            <FormControlLabel control={<Checkbox checked={checked40} onChange={handleChange40} />} label="레몬향" />
            <FormControlLabel control={<Checkbox checked={checked41} onChange={handleChange41} />} label="청포도향" />
            <FormControlLabel control={<Checkbox checked={checked42} onChange={handleChange42} />} label="살구향" />
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
