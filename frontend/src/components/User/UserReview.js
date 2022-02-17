import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "react-redux";
import {useParams} from "react-router-dom"
import axiosInstance from "CustomAxios";
import UserIcon from "./UserIcon"
const UserReview = (props) =>{
  const USER_REVIEW_URL = process.env.REACT_APP_SERVER + ':8888/v1/member'
  const memberId = props.state
  const [userReviews, setUserReviews] = useState([])
  const store = useStore((state)=>state)

  const fetchData = async() =>{
    const data = await axiosInstance.get(`${USER_REVIEW_URL}/${memberId}/rates`)
    
    setUserReviews(data.data.data)
  }





  useEffect(() =>{
    if (store.getState().userReviewReducer.data.data.length === 0){
      fetchData();
    } else {
      
      setUserReviews(store.getState().userReviewReducer.data.data)
    }    
	},[])


  return (
    <div className="container">
      <div className="row grid review_box" style={{justifyContent:'center', paddingBottom:'40px'}}>
        <h1 className="font">Reviews</h1>
        {userReviews.length === 0 ?<>
                <UserIcon grade={50}/>

                <div id="text" style={{marginTop:50 ,textAlign:'center'}}>아직 평가 한 맥주가 없습니다.</div>
                </> : 
        <div className="container">
        <Table striped bordered hover>
          {/* 각 테이블별로 맥주 detail page 링크 달기. */}
        
          <thead>
            <tr>
              <th>#</th>
              <th>맥주 이름</th>
              <th>AVG</th>
              <th>평점</th>
            </tr>
          </thead>
          <tbody>
            {userReviews&&userReviews.map((res, idx)=>
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{res.beer.name}</td>
              <td>{res.beer.averageRate}</td>
              <td>{res.rate}</td>
            </tr>
          )}
          </tbody>
        
        </Table>    
        </div>
      }
    </div>
  </div>
  )
}
export default UserReview;