import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import '../../styles/UserLike.css'

const UserLike = () => {
  const USER_LIKE_URL = process.env.REACT_APP_USER_LIKE_URL
  const memberId = 1
  const [likebeers, setLikeBeers] = useState([])
  useEffect(async () =>{
    const memberbeers = await axios.get(`${USER_LIKE_URL}/${memberId}`)
    setLikeBeers(memberbeers.data.data)
    // console.log(memberbeers.data.data)
  },[])
  return (
    <div className="memberbeerlike_container">
      <div className="container" justify-content="space-around">
        <h1>Like Beers</h1>
        <div className="row grid">
          {likebeers && likebeers.map((beer)=>{
            return(
              <div className="col-4 col-lg-2 likebeer">
                {console.log(beer.beerName)}
                <div>
                  <img className="likebeer_img" src={beer.photoPath}></img>
                  {/* <div>{beer.beerName}</div> */}
                </div>
              </div>
            )
          })}
        </div>
        
      </div>
    </div>


  )
}
export default UserLike;