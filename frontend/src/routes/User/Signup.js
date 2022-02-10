import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import '../../styles/Signup.css'

function Signup(props) {
  const VALIDATE_NICKNAME_URL = process.env.REACT_APP_SERVER + ':8080/v1/member/validatenickname'
  const USER_SIGNUP_URL = process.env.REACT_APP_SERVER + ':8080/v1/member/signup'
  const userData = props.location.userData
  const dispatch = useDispatch()
  
  const [nickname, nicknameChange] = useState("");
  const [age, ageChange] = useState("");
  const [gender, setGender] = useState("");
  const [AvailableNick, setAvailable] = useState()
  const [submitBtn, deactivateSubmitBtn] = useState(true)
  
  const changeNickName = e => {
    nicknameChange(e.target.value);
  }

  const selectValue = e => {
    if (e.target.value) {
      setGender(e.target.value); 
    }
  }

  const changeAge = e => {
    ageChange(e.target.value);
  }

  const signupBtn = e => {
    e.preventDefault()
    const signup = async() => {
      try{
        const singupData = { // 액세스 토큰 나중에 넣어줘야 함
          // "memberId": userData.member.kakaoMemberId,
          "age": age,
          "name": userData.member.nickName,
          "nickName": nickname
        }
        const headers = {
          headers: {
            "Accept" : "application/json;charset=UTF-8",
            "Content-Type" : "application/json;charset=UTF-8"
          }
        }
        await axios.post(USER_SIGNUP_URL, singupData, headers)

      }catch{
        console.log("회원가입 실패")
      }
    }
    signup()
    dispatch({type:"loginSucess", userData:userData})
  }

  useEffect( () => { // 닉네임 수정할 때 버튼 막아놓고 시작
    deactivateSubmitBtn(true)
    }, [nickname]
  )

  useEffect( () => {
    const validationNinkname = async () => {
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
    }
    validationNinkname()
    }, [nickname]
  )

  useEffect( () => { // 수정필요
    if (AvailableNick && gender && age) {
      deactivateSubmitBtn(false)
    }
    }, [AvailableNick, nickname, gender, age]
  )

  return(
    <div className="Signup">
      <section className="signup_section layout_padding_signup">
        <div className="container">
          {/* Signup 제목 */}
          <div className="signup_heading_container">
            <h2>
              Signup
            </h2>
          </div>

          {/* 회원가입 입력창 */}
          <div className="row">
            <div className="col-md-6">
              <div className="form_container">
                <form action="./login">

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
                  {/* <button type="button" onClick={ checkNickName } disabled={ nickBtn }>중복확인</button> <br/> */}
                  
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

                  {/* 성별 입력 */}
                  <div>
                    <select className="form-control nice-select wide" name="choice" onChange={selectValue}>
                      <option value="" disabled selected>
                        성별
                      </option>
                      <option value="man">
                        남자
                      </option>
                      <option value="woman">
                        여자
                      </option>
                    </select>
                  </div>

                  {/* 회원가입 완료 버튼 */}
                  <div className="btn_box">
                    <button disabled={submitBtn} onClick={signupBtn}>
                      SignUp Now
                    </button>
                  </div>
                </form>

              </div>
            </div>

            {/* 추후 추가될 것 (이미지?) */}
            <div className="col-md-6">
              <div className="map_container ">
                <div id="signupImg">image띄우는 곳</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup;