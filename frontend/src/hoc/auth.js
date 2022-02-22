import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import AccessToken from "../AccessToken.js"

const auth = (Component, option) => {
  const AuthenticateCheck = (props) => {
    const userToken = AccessToken

    // 로그인한 유저 아이디
   const loginMemberId = useSelector(state => state.userReducer).memberId
    
    useEffect(() => {
      if ((userToken === null || loginMemberId === null) && option) { 
        props.history.push("/user/login");
      } else if (userToken && loginMemberId && !option) {  
        props.history.push("/")
      }
    }, [userToken, props.history, loginMemberId]);
    return (
      <Component {...props} />
    )
  }
  return AuthenticateCheck
}

export default auth;