import axios from "axios";


const axiosInstance = axios.create({
  headers:{
    AccessToken:  window.localStorage.getItem("AccessToken")
  }
})

export default axiosInstance