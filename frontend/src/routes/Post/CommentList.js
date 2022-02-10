import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useStore } from 'react-redux';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import "../../styles/CommentList.css"
import { useHistory } from "react-router-dom";

function CommentList(props) {
  const COMMENT_LIST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post'
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8080/v1/member/profile'
  const [comments, setcomments] = useState([]);
  const [inputComment, inputCommentChange] = useState("");
  const dispatchComment = useRef();
  const history = useHistory();
  // const [dispatchComment, setDispatchComment] = useState();
  const newCommentId = useRef("");
  
  const postId = props.postId;
  const nickname = "nickname";
  // http://13.125.157.39:8080/v1/post
  const apiUrl = `${COMMENT_LIST_URL}/${postId}/comment`
  // const apiUrl = `http://13.125.157.39:8080/v1/post/${postId}/comment`

  // let state = useSelector((state)=>state)
  const store = useStore((state)=>state)
  let dispatch = useDispatch();

  const changeComment = (e) => {
    inputCommentChange(e.target.value);
  }

  const addComment = async (e) => {
    e.preventDefault()
    try{
      const postData = {
        "content": inputComment,
        "memberId": 1
      }
      const headers = {
        headers: {
          "Accept" : "application/json;charset=UTF-8",
          "Content-Type" : "application/json;charset=UTF-8"
        }
      }

      
      const addData = await axios.post(apiUrl, postData, headers)
     
      newCommentId.current = addData.data

      dispatchComment.current = {
        "commentId": newCommentId.current,
        "content": inputComment,
        "memberId": 1,
        "ninkname": "kimdongiln"
      }

      dispatch({ type : "addComment", inputComment : dispatchComment.current })
      setcomments(store.getState().commentReducer)
      inputCommentChange("")
      const profiledata = store.getState().profileReducer
      profiledata['grade'] = profiledata['grade'] + 3
      axios.put(USER_UPDATE_PROFILE, profiledata)
      .then((res)=>{
        axios.get(`${USER_UPDATE_PROFILE}/1`)
        .then((res)=>{
          console.log(res)
          
        })
      })
    }
    catch{
      console.log("오류")
    }
  }

  const deleteComment = async (e) => {
    try{
      const commentId = e.target.attributes.commentid.value
      const deleteApiUrl = `${COMMENT_LIST_URL}/${postId}/comment/${commentId}`
      const deleteData = await axios.delete(deleteApiUrl)
      dispatch({ type : "deleteComment", commentKey : commentId })
      setcomments(store.getState().commentReducer)
      const profiledata = store.getState().profileReducer
      profiledata['grade'] = profiledata['grade'] - 3
      axios.put(USER_UPDATE_PROFILE, profiledata)
      .then((res)=>{
        axios.get(`${USER_UPDATE_PROFILE}/1`)
        .then((res)=>{
          console.log(res)
          
        })
      })
    }
    catch{
      alert("삭제 실패")
    }
    
  }
  

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const responseData = await axios.get(apiUrl)
        dispatch({type:"dataLoading", responseData : responseData.data})
        setcomments(store.getState().commentReducer)
      }
      catch{
        alert("데이터 불러오기 실패")
      }
    }
    fetchData();
    
    }, [])

  return(
    
    <div className="CommentList">
      <section className="comment_section layout_padding_comment">
        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <div className="comment-box">
                <div className="heading_container">
                  {/* <i className="fas fa-comment fs-4"></i> */}
                  <h2>Comment</h2>
                </div>

                {/* 댓글 작성 폼 */}
                <form>
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
                  <button className="comment_button" onClick={ addComment }>Add</button>
                </form>

                {/* 댓글 목록 */}
                {
                  comments.map( (comment, i) => {
                    return(
                      <div className="commentList" key={i}>
                        <div> { comment.content } </div>
                        <button className="deletebtn" type="button" commentid={comment.commentId} onClick={ deleteComment }>삭제</button>
                      </div>
                    );
                  })
                }

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CommentList;
