import React from 'react'
import '../../styles/Login.css'

function Login() { 
  const client_id = "5832f41d4634b598305eaa378a104b94"
  const redirect_url = "http://i6c107.p.ssafy.io:3000/oauth/login/response"

  return(
    <div className='login_section'>
      
      <div className='login_heading'>Login</div>
      <div className="loginBtn">
        <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code`} >
          <img src="/img/kakaoLogin.png" alt=''></img>
        </a>
      </div>
    </div>
  )
}
 
 
export default Login;