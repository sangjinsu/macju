import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "react-redux";

const UserReview = () =>{
  const USER_REVIEW_URL = process.env.REACT_APP_SERVER + ':8888/v1/member'
  const memberId = 1
  const [userReviews, setUserReviews] = useState([])
  const store = useStore((state)=>state)

  const fetchData = async() =>{
    const data = await axios.get(`${USER_REVIEW_URL}/${memberId}/rates`)
    
    setUserReviews(data.data.data)
  }





  useEffect(() =>{
    if (store.getState().userReviewReducer.length === 0){
      fetchData();
    } else {
      setUserReviews(store.getState().userReviewReducer.data.data)
    }    
	},[])


  return (
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
  )
}
export default UserReview;