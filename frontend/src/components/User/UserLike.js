import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import '../../styles/UserLike.css'

const UserLike = () => {
  const memberId = 1
  const [likebeers, setLikeBeers] = useState([])
  useEffect(async () =>{
    const memberbeers = await axios.get(`http://i6c107.p.ssafy.io:8080/member/beer/${memberId}`)
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