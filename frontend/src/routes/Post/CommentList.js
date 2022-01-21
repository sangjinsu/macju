import React, { useEffect, useState } from "react"
import { useDispatch, useStore } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

function CommentList() {
  const [comments, setcomments] = useState([]);
  const [inputComment, inputCommentChange] = useState();
  const [addCommentList, setaddCommentList] = useState();
  const [dispatchComment, setDispatchComment] = useState();
  
  const { num } = useParams();
  const nickname = "nickname";

  // let state = useSelector((state)=>state)
  const store = useStore((state)=>state)
  let dispatch = useDispatch();

  

  const changeComment = (e) => {
    inputCommentChange(e.target.value);
  }
  

  const addComment = e => {
    setaddCommentList([...addCommentList], e.tatget.value);
  }

  

  useEffect(async ()=>{
    try{
      //api : http://localhost:3000/v1/post/{postId}/comment
      const jsonData = await axios.get("http://localhost:3000/data/commentData.json")
      dispatch({type:"dataLoading", jsonData : jsonData.data})
      setcomments(store.getState().commentReducer)
    }
    catch{
      console.log("오류")
    }
    }, []
  )

  useEffect( () => {
    setDispatchComment({"postId" : parseInt(num), "nickname" : nickname, "comment":inputComment})
  }, [inputComment])



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