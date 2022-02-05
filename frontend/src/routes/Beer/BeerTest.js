import { useState } from "react"
import { getStorage, ref, updateMetadata } from "firebase/storage";
import "../../firebase_config"
import { useEffect } from "react";
import axios from "axios";
const BeerTest = () => {
  const storage = getStorage();
  
  const [beerdata, setbeerdata] = useState([])
  useEffect(async () =>{
    const data = await axios.get("http://i6c107.p.ssafy.io:8080/v1/beer")
    setbeerdata([data][0].data)
    
  })
  return (
    <div>

    </div>
  )
}
export default BeerTest