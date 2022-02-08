import React, { useEffect, useState } from 'react'
import '../../styles/Signup.css'

function Signup() {
  
  const [nickname, nicknameChange] = useState("");
  const [age, ageChange] = useState("");
  const [radioChecked, setRadioChecked] = useState("");
  const [useNickName, addNickName] = useState(['Dongil', 'Kimdongil'])
  const [nickBtn, deactivateNickBtn] = useState(false)
  const [submitBtn, deactivateSubmitBtn] = useState(true)
  const changeNickName = (e) => {
    nicknameChange(e.target.value);
  }

  const changeRadioChecked = e => {
    if (e.target.checked) { // e.target.checked는 radio버튼 클릭되면 true
      setRadioChecked(e.target.id); 
    }
  }

  const changeAge = e => {
    ageChange(e.target.value);
  }

  const checkNickName = () => { //중복여부에 따른 버튼활성화
    // 닉네임 중복에 대한 결과값을 Back에서 받아온다.
    let resultOverlap = false
    for (let nick of useNickName){
      if (nickname === nick) {
        resultOverlap = true
      }
    }
    if ( resultOverlap ) {
      return (
        alert("중복입니다")
      )
    } else {
      addNickName( [...useNickName, nickname] )
      deactivateNickBtn(true)
      return (
        alert("사용가능합니다")
      )
    }
  }

  useEffect( () => { // 닉네임 수정할 때 버튼 막아놓기
    deactivateNickBtn(false)
    deactivateSubmitBtn(true)
    console.log(nickname)
    }, [nickname]
  )

  useEffect( () => { // 수정필요
    if (nickBtn && radioChecked && age) {
      deactivateSubmitBtn(false)
    }
    }, [nickBtn, nickname, radioChecked, age]
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
                    <select className="form-control nice-select wide">
                      <option value="" disabled selected>
                        성별
                      </option>
                      <option value="남자">
                        남자
                      </option>
                      <option value="여자">
                        여자
                      </option>
                    </select>
                  </div>

                  {/* 회원가입 완료 버튼 */}
                  <div className="btn_box">
                    <button>
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
      
      {/* <form action='./login'>
        <h2>회원가입</h2>
        <label>별명:</label>
        <input
          type="text"
          name="nickname"
          value={ nickname }
          onChange={ changeNickName }
        />
        <button type="button" onClick={ checkNickName } disabled={ nickBtn }>중복확인</button> <br/>
        <label>성별:</label>
        <label>
          <input
            type="radio"
            id = "men"
            name="radioChecked"
            value={ radioChecked }
            onChange={ changeRadioChecked }
          />
          남
        </label>
        <label>
          <input
            type="radio"
            id = "women"
            name="radioChecked"
            value={ radioChecked }
            onChange={changeRadioChecked}
          />
          여
        </label><br/>
        <label>나이:</label>
        <input
          placeholder="나이를 입력해주세요"
          type="text"
          name="age"
          value={ age }
          onChange={ changeAge }
        /><br/>
        <button type="submit" disabled={ submitBtn }>완료</button>
      </form> */}
  
    </div>
  )
}

export default Signup;