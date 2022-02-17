import axios from "axios";

const cookieList = document.cookie.split(";")
let accessCookie = ""
for (let i = 0; i < cookieList.length; i++) {
  const nowCookie = cookieList[i].split("=")[0]
  if (nowCookie === "AccessToken") {
    accessCookie = cookieList[i].split("=")[1]
  }
}

const axiosInstance = axios.create({
  headers: {
    AccessToken: accessCookie,
    "Accept": "application/json;charset=UTF-8",
    "Content-Type": "application/json;charset=UTF-8"
  }
})

export default axiosInstance