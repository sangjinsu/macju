import React from "react"
import { useEffect } from "react";
import { useSelector } from "react-redux";


const auth = (Component, option) => {
  const AuthenticateCheck = (props) => {
    const isUser = useSelector(state => state.userReducer)
    const memberId = isUser.memberId
    useEffect(() => {
      if (!memberId && option) { 
        props.history.push("/user/login");
      } else if (memberId && !option) { 
        props.history.push("/home")
      }
    }, [memberId, props.history]);
    return (
      <Component {...props} />
    )
  }
  return AuthenticateCheck
}

export default auth;