const cookieList = document.cookie.split(";")
let accessCookie = ""

for (let i = 0; i < cookieList.length; i++) {
  const nowCookie = cookieList[i].split("=")[0]
  if (nowCookie === "AccessToken") {
    accessCookie = cookieList[i].split("=")[1]
  }
}

export default accessCookie