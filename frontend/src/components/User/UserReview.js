import { Table } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const UserReview = () =>{
  const USER_REVIEW_URL = process.env.REACT_APP_USER_REVIEW_URL

  const memberId = 1
  const [userReviews, setUserReviews] = useState([])

  // useEffect(async () =>{
	// 	const memberReviews = await axios.get(`${USER_REVIEW_URL}/${memberId}/rate`)
	// 	// console.log(memberReviews.data)
	// 	setUserReviews(memberReviews.data)
	// },[])

  
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
        <tr>
          <td>1</td>
          <td>코젤다크</td>
          <td>4.0</td>
          <td>4.5</td>
        </tr>
        <tr>
          <td>2</td>
          <td>곰표맥주</td>
          <td>2.8</td>
          <td>4.5</td>
        </tr>
        <tr>
          <td>3</td>
          <td>동일맥주</td>
          <td>3.7</td>
          <td>4.5</td>
        </tr>
      </tbody>
    </Table>    
    </div>
  )
}
export default UserReview;