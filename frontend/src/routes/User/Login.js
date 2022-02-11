import React from 'react'
import '../../styles/Login.css'

function Login() { // 회원가입 넘어가는 링크만 걸어뒀음
  const client_id = "5832f41d4634b598305eaa378a104b94"
  const redirect_url = "http://localhost:3000/oauth/login/resopnse"

  return(
    <>
      <div className='login_heading'>Login</div>
      <div className="loginBtn">
        <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code`} >
          <img src="/img/kakaoLogin.png" alt=''></img>
        </a>
      </div>
    </>
  )
}
 
 
export default Login;