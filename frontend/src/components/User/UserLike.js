import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import '../../styles/UserLike.css'
import {useStore} from "react-redux"
const UserLike = () => {
  const USER_LIKE_URL = process.env.REACT_APP_SERVER + ':8888/v1/member'
  const memberId = 1
  const [likebeers, setLikeBeers] = useState([])
  const store = useStore((state) => state);
  useEffect(() =>{
    const fetchData = async () =>{
    const memberbeers = await axios.get(`${USER_LIKE_URL}/${memberId}/like/beer`)
    console.log(memberbeers)
    setLikeBeers(memberbeers.data)
    }
    if (store.getState().userLikeReducer.length === 0){
      fetchData();
    } else {
      setLikeBeers(store.getState().userLikeReducer.data.data)
    }
    
  },[USER_LIKE_URL])
  return (
    <div className="memberbeerlike_container">
      <div className="container" justify-content="space-around">
        <h1>Like Beers</h1>
        <div className="row grid">
          {likebeers === [] ? likebeers.map((beer)=>
              <div className="col-4 col-lg-2 likebeer" key={beer.beerId}>
                <div>
                  {/* 여기도 기본이미지가 필요하네용 */}
                  <img className="likebeer_img" src={beer.photoPath} alt=""></img>
                  {/* <div>{beer.beerName}</div> */}
                </div>
              </div>
            )
            : <div> 없음.</div> }
        </div>
        
      </div>
    </div>


  )
}
export default UserLike;