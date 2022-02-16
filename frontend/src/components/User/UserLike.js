import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import '../../styles/UserLike.css'
import {useStore} from "react-redux"
import axiosInstance from "CustomAxios";
import { useParams } from "react-router-dom";
import UserIcon from "./UserIcon"
const UserLike = (props) => {
  
  const USER_LIKE_URL = process.env.REACT_APP_SERVER + ':8888/v1/member'
  const memberId = props.state
  const [likebeers, setLikeBeers] = useState([])
  const store = useStore((state) => state);
  useEffect(() =>{
    const fetchData = async () =>{
    const memberbeers = await axiosInstance.get(`${USER_LIKE_URL}/${memberId}/like/beer`)
    setLikeBeers(memberbeers.data)
    }
    if (store.getState().userLikeReducer.length === 0){
      fetchData();
    } else {
      setLikeBeers(store.getState().userLikeReducer.data.data)
    }
    
  },[USER_LIKE_URL])

  return (
    <div className="memberbeerlike_container"  >
      <div className="container" justify-content="space-around">
        <h1>Like Beers</h1>
        <div className="row grid" style={{justifyContent:'center'}}>
          
          {likebeers === [] ? likebeers.map((beer)=>
              <div className="col-4 col-lg-2 likebeer" key={beer.beerId}>
                <div>
                  {/* 여기도 기본이미지가 필요하네용 */}
                  <img className="likebeer_img" src={beer.photoPath} alt=""></img>
                  {/* <div>{beer.beerName}</div> */}
                </div>
              </div>
            )
            : 
            <>
            <UserIcon grade={2500}/>

            <div id="text" style={{marginTop:50 ,textAlign:'center'}}>아직 좋아요한 맥주가 없습니다.</div>
            </>
             }
            
        </div>
        
      </div>
    </div>


  )
}
export default UserLike;