import axios from "axios";
import AccessToken from "./AccessToken.js"

const axiosInstance = axios.create({
  headers: {
    AccessToken: AccessToken,
    "Accept": "application/json;charset=UTF-8",
    "Content-Type": "application/json;charset=UTF-8"
  }
})

export default axiosInstance