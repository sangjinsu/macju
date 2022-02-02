import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/login.css'

function Login() { // 회원가입 넘어가는 링크만 걸어뒀음
  return(
    <>
      <div className='login_heading'>Login</div>
      <div className='loginBtn'>
        <Link to="./signup">
            <img src="img/kakaoLogin.png"></img>
        </Link>
      </div>
    </>
  )
}
 
 
export default Login;