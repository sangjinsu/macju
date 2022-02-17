import React from "react"
import { useEffect } from "react";
import {useCookies} from "react-cookie";

const auth = (Component, option) => {
  const AuthenticateCheck = (props) => {
    const cookies = useCookies(["AccessToken"])[0];
    const AccessToken = cookies.AccessToken
    
    useEffect(() => {
      if (!AccessToken && option) { 
        props.history.push("/user/login");
      } else if (AccessToken && !option) { 
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