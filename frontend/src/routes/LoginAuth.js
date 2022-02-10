import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function LoginAuth() {
  const [userData, setUser] = useState()
  const history = useHistory()
  const dispatch = useDispatch()
  
  useEffect( () => { // "http://i6c107.p.ssafy.io:8752/oauth/login/response"
    const test = async () => {
      try{
        let code = new URL(window.location.href).searchParams.get("code")
        const { data : responseData } = await axios.get(`http://i6c107.p.ssafy.io:8752/oauth/login/response?code=${code}`) // `http://http://i6c107.p.ssafy.io:8752:8752/oauth/login/response?code=${code}`
        console.log(responseData)
        setUser(responseData)
        if (userData.first_check === true ) {
          history.replace({pathname:"/user/signup", userData:userData})
        } else {
          dispatch({type:"loginSucess", userData:userData})
          history.replace("/home")
        }
      }catch{
        history.replace("/user/login")
      }
    }
    test()
  }, [])

  // useEffect( () => {
  //   if (userData.first_check === true ) {
  //     history.replace({pathname:"/user/signup", state:{userData:userData}})
  //   } else {
  //     dispatch({type:"loginSucess", userData:userData})
  //     history.replace("/home")
  //   }
  // }, [])

  return(
    <>
      <p>Spining 띄울 거!</p>
    </>
  )
}

export default LoginAuth;