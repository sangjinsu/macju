import React, { useEffect, useState } from "react"
import { useDispatch, useStore } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import "../../styles/CommentList.css"

function CommentList(props) {
  const [comments, setcomments] = useState([]);
  const [inputComment, inputCommentChange] = useState();
  const [addCommentList, setaddCommentList] = useState();
  const [dispatchComment, setDispatchComment] = useState();
  
  const postId = props.postId;

  const nickname = "nickname";
  // api 주소
  let apiUrl = "http://i6c107.p.ssafy.io:8080/v1/post/" + postId + "/comment"

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
      const jsonData = await axios.get(apiUrl)
      console.log(jsonData.data)
      dispatch({type:"dataLoading", jsonData : jsonData.data})
      setcomments(store.getState().commentReducer)
    }
    catch{
      console.log("오류")
    }
    }, []
  )

  useEffect( () => {
    setDispatchComment({"postId" : parseInt(postId), "nickname" : nickname, "comment":inputComment})
  }, [inputComment])



  return(
    
    <div className="CommentList">
      <section className="comment_section layout_padding_comment">
        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <div className="comment-box">
                <div className="heading_container">
                  <h2>Comment</h2>
                </div>
                {/* 댓글 작성 폼 */}
                <form action="">
                  <input
                    type="text"
                    name="inputComment"
                    className="comment_input"
                    placeholder="댓글 입력..."
                    value={ inputComment }
                    onChange={ changeComment }
                    required
                  />
                  {/* 비어있을때 addComment 함수 작동 안되게해야함 */}
                  <button class="comment_button" onClick={ addComment }>Add</button>
                </form>

                {/* 댓글 목록 */}
                {
                  comments.map( (post, i) => {
                    return(
                      <div className="commentList" key={i}>
                        <div> { post.comment } </div>
                        <button className="deletebtn" type="button" commentid={i} onClick={ deleteComment }>삭제</button>
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