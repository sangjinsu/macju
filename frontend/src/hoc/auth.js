import React from "react"
import { useEffect } from "react";
import {useCookies} from "react-cookie";

const auth = (Component, option) => {
  const AuthenticateCheck = (props) => {
    const cookies = useCookies(["AccessToken"])[0];
    const AccessToken = cookies.AccessToken
    
    useEffect(() => {
      if (!AccessToken && option) { // 로그인이 필요한 page에, 로그인하지 않은 유저가 접근하려고 할 때
        props.history.push("/user/login");
      } else if (AccessToken && !option) { // 로그인이 필요하지 않은 page에, 로그인한 유저가 접근하려고 할 때
        props.history.push("/home")
      }
    }, [AccessToken, props.history]);
    return (
      <Component {...props} />
    )
  }
  return AuthenticateCheck
}

export default auth;