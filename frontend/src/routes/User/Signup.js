import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../styles/Signup.css'

function Signup(props) {
  const VALIDATE_NICKNAME_URL = process.env.REACT_APP_SERVER + ':8888/v1/member/validatenickname'
  const USER_SIGNUP_URL = process.env.REACT_APP_SERVER + ":8888/v1/member/signup"
  const userData = props.location.userData
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [nickname, nicknameChange] = useState("");
  const [age, ageChange] = useState("");
  const [name, setName] = useState("");
  const [AvailableNick, setAvailable] = useState()
  const [submitBtn, deactivateSubmitBtn] = useState(true)
  
  
  // nickname 변경
  const changeNickName = e => {
    nicknameChange(e.target.value);
  }

  // name 변경
  const changeName = e => {
    setName(e.target.value);
  }

  // 나이 변경
  const changeAge = e => {
    ageChange(e.target.value);
  }

  // 회원가입 버튼 누를시 동작
  const signupBtn = useCallback( async (e) => {
    e.preventDefault()
    try{
      if (age < 20) {
        alert("미성년자는 가입 할 수 없습니다")
        history.replace("/home")
        return // histroy로 home 넘어가면 DB update랑 store 막아놓기
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
      
      window.localStorage.setItem("AccessToken", userData.AccessToken)

      userData.memberId = singupResponse.memberId
      dispatch({type:"loginSuccess", userData:userData})

      history.push("/home")
      window.location.reload() 
    }catch(err){
      // 회원가입 실패시 알람 + 로그인 페이지 다시 이동
      console.log(err)
      alert("회원가입 실패")
      history.replace("/user/login")
    }
  }, [age, userData, nickname, name, USER_SIGNUP_URL, dispatch, history])

  // 닉네임 수정할 때 버튼 막아놓고 시작
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
    }catch{
      console.log("중복확인 실패")
    }
  }, [nickname, VALIDATE_NICKNAME_URL, userData.AccessToken])

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
            {/* 추후 추가될 것 (이미지?) */}
            <div className="col-md-6">
              <div className="map_container ">
                <img id="signupImg" src="/img/logo/MacJu.png" alt="" />
              </div>
            </div>
          {/* Signup 제목 */}
          <div className="signup_heading_container col-md-6">
            <div className='signup_heading'>
              Signup
            </div>
            <div className="">
              <div className="form_container">
                <form>

                  {/* 별명 입력 */}
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

                  {/* 성별 입력 */}
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
                  
                  {/* 나이 입력 */}
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

                  {/* 회원가입 완료 버튼 */}
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
