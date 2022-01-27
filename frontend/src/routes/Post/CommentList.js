import React, { useEffect, useState } from "react"
import { useDispatch, useStore } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import "../../styles/CommentList.css"

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

  const addComment = () => {
    dispatch({ type : "add", inputComment : dispatchComment })
    setcomments(store.getState().commentReducer)
  }

  const deleteComment = (e) => {
    dispatch({ type : "delete", i : e.target.attributes.commentid.value })
    setcomments(store.getState().commentReducer)
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
      <section class="comment_section layout_padding">
        <div class="container">

          <div class="row">
            <div class="col-md-12">
              <div class="detail-box">
                <div class="heading_container">
                  <h2>Comment</h2>
                </div>
                <form action="">
                  <input
                    type="text"
                    name="inputComment"
                    value={ inputComment }
                    onChange={ changeComment }
                  />
                  <button type="button" onClick={ addComment }>Add</button>
                </form>
                {
        
                  comments.map( (post, i) => {
                    return(
                      <div className="commentList" key={i}>
                        <p> { post.comment } </p>
                        <button class="deletebtn" type="button" commentid={i} onClick={ deleteComment }>삭제</button>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <form action="">
        <input
          type="text"
          name="inputComment"
          value={ inputComment }
          onChange={ changeComment }
        />
        <button type="button" onClick={ addComment }>Add</button>
      </form>

      {
        
        comments.map( (post, i) => {
          return(
            <div className="list" key={i}>
              <p> { post.comment } </p>
              <button type="button" commentId={i} onClick={ deleteComment }>삭제</button>
            </div>
          );
        })
      } */}

    </div>
  )
}

export default CommentList;