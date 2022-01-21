import { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function PostDetail() {


//   const dispatch = useDispatch()
  const [postnow, setpostnow] = useState()
  const { num } = useParams();

  useEffect(async ()=>{
    try{
      //api : http://localhost:3000//v1/post/{postId}
      const json = await axios.get("http://localhost:3000/data/postData.json")

      const postnum = json.data.find(function(post){
          return post.postId == num
      });
      setpostnow(postnum)
    }catch{
      console.log('오류')
    }
  }, [])


  return (
    <>
      <h1>POST detail</h1>   
      {
        postnow && 
        <div>
          <img src={postnow.img } alt="detail 이미지"></img>
          <div>{ postnow.content }</div>
          <div>좋아요 : { postnow.likes }</div>
          {
            postnow.Tag.map((tag)=>{
              return(<div>#{tag}</div>)
            })
          }
          <div>{ postnow.created_at } 작성</div>
        </div>
      }  
      
    </>
  )
  }
export default PostDetail;