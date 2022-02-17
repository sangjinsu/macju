import axios from "axios";

const axiosInstance = axios.create({
  headers:{
    AccessToken:document.cookie.split("=")[1],
    "Accept":"application/json;charset=UTF-8",
    "Content-Type":"application/json;charset=UTF-8"
  }
})

export default axiosInstance