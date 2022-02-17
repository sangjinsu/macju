import React, { useEffect, useRef, useState, useCallback } from "react"
import { useDispatch, useSelector, useStore } from 'react-redux';
import "../../styles/CommentList.css"
import axiosInstance from "CustomAxios";

function CommentList(props) {
  const postId = props.postId; 

  const COMMENT_LIST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post'
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8888/v1/member/profile'
  const commentApiUrl = `${COMMENT_LIST_URL}/${postId}/comment` 
  const loginMemberId = useSelector(state => state.userReducer).memberId
  const dispatchComment = useRef();
  const newCommentId = useRef("");
  const store = useStore((state)=>state)
  const dispatch = useDispatch();
  const [comments, setcomments] = useState([]);
  const [inputComment, inputCommentChange] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const commentPerPage = 10;
  const indexOfLastComment = currentPage * commentPerPage  
  const indexOfFirstPost = indexOfLastComment - commentPerPage
  const currentComments = comments.slice(indexOfFirstPost, indexOfLastComment)
  const pageNumbers = [];
  for (let i=1; i<=Math.ceil(comments.length / commentPerPage); i++){
    pageNumbers.push(i)
  }

  const paginate = pageNum => setCurrentPage(pageNum)
  const changeComment = (e) => {
    inputCommentChange(e.target.value);
  }
  const addComment = useCallback (async (e) => {
    e.preventDefault()
    if (inputComment) {
      try{
        const postData = {
          "content": inputComment,
          "memberId": loginMemberId
        }
        const { data : addData} = await axiosInstance.post(commentApiUrl, postData)
        newCommentId.current = addData 
        dispatchComment.current = {
          "commentId": newCommentId.current,
          "content": inputComment,
          "memberId": loginMemberId,
          "nickname": "kimdongiln" 
        }
        dispatch({ type : "addComment", inputComment : dispatchComment.current })
        setcomments(store.getState().commentReducer)
        inputCommentChange("")
      }
      catch(err){
        console.log(err)
      }
    }
  }, [USER_UPDATE_PROFILE, commentApiUrl, dispatch, inputComment, store, loginMemberId])
  const deleteComment = useCallback( async (e) => {
    try{
      const commentId = e.target.attributes.commentid.value
      const deleteApiUrl = `${COMMENT_LIST_URL}/${postId}/comment/${commentId}`

      await axiosInstance.delete(deleteApiUrl)
      dispatch({ type : "deleteComment", commentKey : commentId })
      setcomments(store.getState().commentReducer)
    }
    catch(err){
      console.log(err)
    }
  }, [COMMENT_LIST_URL, USER_UPDATE_PROFILE, dispatch, postId, store])
  const fetchData = useCallback( async () =>{
    try{
      const responseData = await axiosInstance.get(commentApiUrl)
      dispatch({type:"dataLoading", responseData : responseData.data})
      setcomments(store.getState().commentReducer)
    }
    catch(err){
      console.log(err)
    }
  }, [commentApiUrl, dispatch, store])

  useEffect(()=>{
    fetchData();
    }, [commentApiUrl, dispatch, store, fetchData])

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
                  <i className="fas fa-location-arrow fa-lg" onClick={ addComment }></i>
                </form>
                {
                  currentComments.map( (comment, i) => {
                    return(
                      <div className="commentList" key={i}>
                        {loginMemberId === comment.memberId ?
                        <div>
                          {comment.nickname} : { comment.content }  <i className="fas fa-trash trash-icon" commentid={comment.commentId} onClick={deleteComment}></i>
                        </div>
                        : 
                        <div>
                          {comment.nickname} : { comment.content }
                        </div>
                        }
                      </div>
                    )
                  })
                }
                { comments && 
                  <nav>
                    <ul className="pagination">
                      {pageNumbers.map(num => <li key={num}>
                      <a onClick={() => paginate(num)}>{num}</a>
                      </li>)} 
                    </ul>
                  </nav>
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
