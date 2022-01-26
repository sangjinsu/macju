import React from 'react'
import { Link } from 'react-router-dom';

function Login() { // 회원가입 넘어가는 링크만 걸어뒀음
  return(
    <Link to="./signup">
      <button type="button">
        <img src="img/kakaoLogin.png"></img>
      </button>
    </Link>
  )
}
 
 
export default Login;