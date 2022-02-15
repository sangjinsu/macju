import axios from "axios";

const axiosInstance = axios.create({
  headers:{
    AccessToken:window.localStorage.getItem("AccessToken"),
    "Accept":"application/json;charset=UTF-8",
    "Content-Type":"application/json;charset=UTF-8"
  }
})

export default axiosInstance