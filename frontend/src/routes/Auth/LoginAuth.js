import axios from "axios";
import { useRef, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useCookies } from "react-cookie"

function LoginAuth() {
  const userData = useRef()
  const history = useHistory()
  const dispatch = useDispatch()

  const setCookie = useCookies(["AccessToken"])[1]
  
  const date = new Date(Date.now() + (60 * 60 * 60 * 60))

  const requestAuth = useCallback (async () => {
    try{
      const code = new URL(window.location.href).searchParams.get("code")
      const { data : responseData } = await axios.get(`http://i6c107.p.ssafy.io:8888/oauth/login/response?code=${code}`)
      userData.current = responseData
      if (userData.current.first_check === true ) {
        history.replace({pathname:"/user/signup", userData:userData.current})
      } else {
        dispatch({type:"loginSuccess", userData:userData.current}) 
        setCookie("AccessToken", userData.current.AccessToken, {path: "/", expire:date.toUTCString()})

        history.replace("/home")
        window.location.reload()
      }
    }catch(err){
      console.log(err)
      history.replace("/user/login")
    }
  }, [dispatch, history, setCookie]) 

  useEffect( () => {
    requestAuth()
  }, [history, dispatch, requestAuth])

  return(
    <>
      <Box hidden id="spinner" sx={{ display: 'flex' }} style={{justifyContent:'center', marginTop:100, marginBottom:100}}>
        <CircularProgress size={200}/>
      </Box>
    </>
  )
}

export default LoginAuth;
