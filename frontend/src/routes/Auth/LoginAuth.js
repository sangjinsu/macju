import axios from "axios";
import { useRef, useCallback, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function LoginAuth() {
  const userData = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  
  const store = useStore((state)=>state)
  
  const requestAuth = useCallback (async () => {
    try{
      const code = new URL(window.location.href).searchParams.get("code")
      const user = await axios.get(`http://i6c107.p.ssafy.io:8752/oauth/login/response?code=${code}`)
      if (user.data.memberId === null) {
        dispatch({type:"kakaoId", userKaKaoId:user.data.kakaoId})
        dispatch({type:'header', AccessToken:user.data.AccessToken})
        history.replace({pathname:"/user/signup"})
      } else {
        dispatch({type:"loginSuccess", userdata:user.data})
        dispatch({type:"kakaoId", userKaKaoId:user.data.kakaoId})
        dispatch({type:'header', AccessToken:user.data.AccessToken})
        history.replace("/home")
      }
    }catch(err){
      console.log(err)
      history.replace("/user/login")
    }
  }, [dispatch, history])

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