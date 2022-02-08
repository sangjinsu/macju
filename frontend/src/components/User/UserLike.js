import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import '../../styles/UserLike.css'

const UserLike = () => {
  const USER_LIKE_URL = process.env.REACT_APP_USER_LIKE_URL
  const memberId = 1
  const [likebeers, setLikeBeers] = useState([])
  useEffect(() =>{
    const fetchData = async () =>{
    const memberbeers = await axios.get(`${USER_LIKE_URL}/${memberId}/like/beer`)
    setLikeBeers(memberbeers.data.data)
    }
    fetchData();
    
    // console.log(memberbeers.data.data)
  },[USER_LIKE_URL])
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
                  {/* 여기도 기본이미지가 필요하네용 */}
                  <img className="likebeer_img" src={beer.photoPath} alt=""></img>
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