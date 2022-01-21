import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

function CommentList() {
  const [comments, setcomments] = useState([]);
  const [inputComment, inputCommentChange] = useState();
  const [addCommentList, setaddCommentList] = useState();
  const { num } = useParams();
  const nickname = "nickname";

  let state = useSelector((state)=>state.commentReducer)
  let dispatch = useDispatch();

  console.log(state)

  const changeComment = (e) => {
    inputCommentChange(e.target.value);
  }

  const dispatchComment = {"postId" : parseInt(num), "nickname" : nickname, "comment":inputComment}
  // const changeComment = e => {
  //   inputCommentChange({
  //     "postId" : num,
  //     "nickname" : nickname,
  //     "comment" : e.tatget.value
  //   });
  // }
  

  const addComment = e => {
    setaddCommentList([...addCommentList], e.tatget.value);
  }

  

  useEffect(async ()=>{
    try{
      //api : http://localhost:3000/v1/post/{postId}/comment
      const jsonData = await axios.get("http://localhost:3000/data/commentData.json")
      setcomments(jsonData.data)

    }
    catch{
      console.log("오류")
    }
    }, []
  )
  console.log(comments)
  return(
    
    <div className="CommentList">
      <form action="">
        <input
          type="text"
          name="inputComment"
          value={ inputComment }
          onChange={ changeComment }
        />
        <button type="button" onClick={ () => dispatch({ type : "add", comments: comments, inputComment : dispatchComment }) }>Add</button> <br/>
        
        <button type="submit" onClick={ addComment }>완료</button>
      </form>

      {
        
        comments.map( (post, i) => {
          return(
            <div className="list" key={i}>
              <p> { post.comment } </p>
              {/* <button type="button" onClick={ () => dispatch({ type : "change", comments: comments, i : i }) }></button> */}
            </div>
          );
        })
      }

    </div>
  )
}

export default CommentList;