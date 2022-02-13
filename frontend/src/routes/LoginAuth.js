import axios from "axios";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function LoginAuth() {
  const userData = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  

  const requestAuth = useCallback (async () => {
    try{
      const code = new URL(window.location.href).searchParams.get("code")
      const { data : responseData } = await axios.get(`http://i6c107.p.ssafy.io:8752/oauth/login/response?code=${code}`)
      userData.current = responseData
      if (userData.current.first_check === true ) {
        history.replace({pathname:"/user/signup", userData:userData.current})
      } else {
        dispatch({type:"loginSucess", userData:userData.current})
        console.log(userData.current)
        history.replace("/home")
      }
    }catch(err){
      console.log(err)
      // history.replace("/user/login")
    }
  }, [dispatch, history])

  useEffect( () => {
    requestAuth()
  }, [history, dispatch, requestAuth])

  return(
    <>
      <p>Spining 띄울 거!</p>
    </>
  )
}

export default LoginAuth;