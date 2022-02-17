import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie"
import '../../styles/Signup.css'

function Signup(props) {
  const VALIDATE_NICKNAME_URL = process.env.REACT_APP_SERVER + ':8888/v1/member/validatenickname'
  const USER_SIGNUP_URL = process.env.REACT_APP_SERVER + ":8888/v1/member/signup"
  const userData = props.location.userData

  const setCookie = useCookies(["AccessToken"])[1]
  const date = new Date(Date.now() + (60 * 60 * 60 * 60))
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [nickname, nicknameChange] = useState("");
  const [age, ageChange] = useState("");
  const [name, setName] = useState("");
  const [AvailableNick, setAvailable] = useState()
  const [submitBtn, deactivateSubmitBtn] = useState(true)
  const changeNickName = e => {
    nicknameChange(e.target.value);
  }

  const changeName = e => {
    setName(e.target.value);
  }

  const changeAge = e => {
    ageChange(e.target.value);
  }

  const signupBtn = useCallback( async (e) => {
    e.preventDefault()
    try{
      if (age < 20) {
        alert("미성년자는 가입 할 수 없습니다")
        history.replace("/home")
        return 
      } 

      const singupData = {
        "kakaoId":userData.kakaoId,
        "nickName":nickname,
        "age":age,
        "name":name
      }
      

      const headers = {
        headers: {
          "AccessToken":userData.AccessToken,
          "Accept":"application/json;charset=UTF-8",
          "Content-Type":"application/json;charset=UTF-8"
        }
      }
 
      const {data : singupResponse} = await axios.post(USER_SIGNUP_URL, singupData, headers)
      
      setCookie("AccessToken", userData.current.AccessToken, {path: "/", expire:date.toUTCString()})

      userData.memberId = singupResponse.memberId
      dispatch({type:"loginSuccess", userData:userData})

      history.push("/home")
      window.location.reload() 
    }catch(err){
      console.log(err)
      alert("회원가입 실패")
      history.replace("/user/login")
    }
  }, [age, userData, nickname, name, USER_SIGNUP_URL, dispatch, history])
  useEffect( () => { 
    deactivateSubmitBtn(true)
    }, [nickname]
  )

  const validationNinkname = useCallback( async () => {
    try{
      const { data : nicknameStatus } = await axios.get(`${VALIDATE_NICKNAME_URL}/${nickname}`)
      
      if (nicknameStatus === "success") {
        setAvailable(true)
      }else {
        setAvailable(false)
      }
    }catch(err){
      console.log(err)
    }
  }, [nickname, VALIDATE_NICKNAME_URL])

  useEffect( () => {
    if (nickname) {
      validationNinkname()
    }else {
      setAvailable(false)
    }
    }, [nickname, validationNinkname]
  )

  useEffect( () => {
    if (AvailableNick && name && age) {
      deactivateSubmitBtn(false)
    }
    }, [AvailableNick, nickname, name, age]
  )

  return(
    <div className="Signup">
      <section className="signup_section layout_padding_signup container">
        <div className="row">
            <div className="col-md-6">
              <div className="map_container ">
                <img id="signupImg" src="/img/logo/MacJu.png" alt="" />
              </div>
            </div>
          <div className="signup_heading_container col-md-6">
            <div className='signup_heading'>
              Signup
            </div>
            <div className="">
              <div className="form_container">
                <form>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="NickName"
                      name="nickname"
                      value={ nickname }
                      onChange={ changeNickName }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={ name }
                      onChange={ changeName }
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Age"
                      name="age"
                      value={ age }
                      onChange={ changeAge }
                    />
                  </div>
                  <div className='btn_box'>
                    <button className='delbtn' disabled={submitBtn} onClick={signupBtn}>
                      SignUp Now
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>


        </div>
      </section>
    </div>
  )
}

export default Signup;
