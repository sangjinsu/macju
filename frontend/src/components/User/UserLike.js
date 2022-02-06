import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const UserLike = () => {
  const [likebeers, setLikeBeers] = useState([])
  // useEffect(async () =>{
  //   const json = await axios.get(`http://i6c107.p.ssafy.io:8080/v1/member/beer/${memberId}/{beerId}`)
  // })
  return (

    <div className="container" justify-content="space-around">
      <h1>Beer</h1>
      <div className="row gx-5">
        {/* <div className="col-1"></div> */}
        {/* 사진이 왼쪽에 있어서 정렬 안된 것처럼 보이는 것 같습니다.. */}
        <div className="col">
          <img src="/img/terra.png" width="150px"></img>
        </div>
        <div className="col">
        <img src="/img/terra.png" width="150px"></img>
        </div>
        <div className="col">
          <img src="/img/terra.png" width="150px"></img>
        </div>
        {/* <div className="col-1"></div> */}
      </div>
    </div>

  )
}
export default UserLike;