import React from "react"
import { useEffect } from "react";


const auth = (Component, option) => {
  const AuthenticateCheck = (props) => {
    // const isUser = useSelector(state => state.getState.userReducermember.merberId)
    const isUser = true
    useEffect(() => {
      if (!isUser && option) { // 로그인이 필요한 page에, 로그인하지 않은 유저가 접근하려고 할 때
        props.history.push("user/login");
      } else if (isUser && !option) { // 로그인이 필요하지 않은 page에, 로그인한 유저가 접근하려고 할 때
        props.history.push("/home")
      }
    }, [isUser, props.history]);
    return (
      <Component {...props} />
    )
  }
  return AuthenticateCheck
}

export default auth;