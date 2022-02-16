import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useStore } from "react-redux";
import { Link, Redirect, Route, useHistory, useLocation, useParams } from "react-router-dom";
import "../../styles/ProfileEdit.css"
import axiosInstance from "CustomAxios";



const ProfileEdit = () => {
  
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8888/v1/member/profile'
  const USER_NICKNAME_CHECK = process.env.REACT_APP_SERVER +  ':8888/v1/member/validatenickname'
  const [editUserNickname, setEditUserNickname] = useState('')
  const [introduce, setIntroduce] =useState('')
  const [labelNickname, setLabelNickname] = useState('fail')
  const store = useStore((state)=>state)
  const memberId = store.getState().userReducer.memberId
  const history = useHistory();
  const location = useLocation();
  const userId = location.state   // id 배열 형식
  
  const profileData = {
    "memberId": memberId, 
    "nickName": editUserNickname,
    "name": "ssafy",
    "intro":introduce,
    "profileColor": "Black"    
  }
  const submitProfile = () =>{
    if (introduce && editUserNickname){
      axiosInstance.put(USER_UPDATE_PROFILE, profileData)
      .then((res)=>{
        // history.push(`/profile/${1}/profile`)
        window.location.replace(`/profile/${memberId}/post`)
      })
    } else {
      alert('내용을 입력하세요')
    }
  }
  const nickNameCheck = async () =>{
    if (!(editUserNickname === '')){
      const data = await axiosInstance.get(`${USER_NICKNAME_CHECK}/${editUserNickname}`)
      //차후 동일 닉네임 요청 전처리 필요
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
      const data = await axiosInstance.get(`http://i6c107.p.ssafy.io:8080/v1/member/profile/${memberId}`)
      setEditUserNickname(data.data.nickName)
      setIntroduce(data.data.intro)
    }
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






  return (
    <div className="edit-box">
      <h1>프로필 수정</h1>
      <form>
      <h3>Username</h3>
      {/* <Link>프로필 색 바꾸기</Link> */}
      {/* 링크 대신 색깔 변경  */}
      <div className="name-box">
        
        <h5>닉네임</h5><input id="nickname" defaultValue={editUserNickname} onKeyUp={editNickname} onChange={editNickname}/>
        <label className={labelNickname} htmlFor="nickname">{ labelNickname === "success" ? '사용 가능한 닉네임입니다.': '사용할 수 없는 닉네임입니다.'}</label>
      </div>
      <div className="intro-box">
        
        <div style={{display: "flex"}}><h5>소개</h5>
        <textarea placeholder={'입력'} defaultValue={introduce} onKeyUp={editIntroduce} onChange={editIntroduce}></textarea>
        </div>
        
      </div>
      <Button onClick={submitProfile}>제출</Button>
      </form>
    </div>
  )
}
export default ProfileEdit;