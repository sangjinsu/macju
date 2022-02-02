import {useEffect, useState} from "react"
import { getDownloadURL, getStorage , ref } from "firebase/storage";
import "../../firebase_config"
const BeerTest = () =>{
  const [imageTab, setImageTab] = useState([])
  const storage = getStorage()
  const storageRef = ref(storage, "gs://ssafy-01-beer-image.appspot.com/")
  getDownloadURL(storageRef)
  .then((url)=>{
    console.log(url)
  })
  return (
    <div>
      ㅎㅇ
    </div>
  )
}
export default BeerTest