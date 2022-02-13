import React, { useEffect, useRef, useState, useCallback } from "react"
import { useDispatch, useStore } from 'react-redux';
import axios from 'axios';
import "../../styles/CommentList.css"

function CommentList(props) {
  const postId = props.postId; // PostDetail 에서 postId값을 props로 받기

  const COMMENT_LIST_URL = process.env.REACT_APP_SERVER + ':8080/v1/post'
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8080/v1/member/profile'
  const commentApiUrl = `${COMMENT_LIST_URL}/${postId}/comment` // 조회, 추가 때 사용

  const dispatchComment = useRef();
  const newCommentId = useRef("");
  const store = useStore((state)=>state)
  const dispatch = useDispatch();
  const [comments, setcomments] = useState([]);
  const [inputComment, inputCommentChange] = useState("");

  // input의 Comment 값 저장
  const changeComment = (e) => {
    inputCommentChange(e.target.value);
  }

  // Comment 추가 버튼 누를시 동작
  const addComment = useCallback (async (e) => {
    e.preventDefault()
    if (inputComment) {
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
        
        const { data : addData} = await axios.post(commentApiUrl, postData, headers)
        newCommentId.current = addData // comment가 생성될 때 comment id값 받아와서 사용 -> redux 관리 위해
        dispatchComment.current = {
          "commentId": newCommentId.current,
          "content": inputComment,
          "memberId": 1, // 수정 필요
          "ninkname": "kimdongiln" // 수정필요
        }
        dispatch({ type : "addComment", inputComment : dispatchComment.current })
        setcomments(store.getState().commentReducer)
        inputCommentChange("")
  
        // 댓글 작성될 때 회원점수 적립
        const profiledata = store.getState().profileReducer
        profiledata['grade'] = profiledata['grade'] + 3
        axios.put(USER_UPDATE_PROFILE, profiledata)
      }
      catch{
        console.log("오류")
      }
    }
  }, [USER_UPDATE_PROFILE, commentApiUrl, dispatch, inputComment, store])

  // 삭제 버튼 누를시 동작
  const deleteComment = useCallback( async (e) => {
    try{
      const commentId = e.target.attributes.commentid.value
      const deleteApiUrl = `${COMMENT_LIST_URL}/${postId}/comment/${commentId}`

      await axios.delete(deleteApiUrl)
      dispatch({ type : "deleteComment", commentKey : commentId })
      setcomments(store.getState().commentReducer)

      // 댓글 삭제시 회원점수 감소
      const profiledata = store.getState().profileReducer
      profiledata['grade'] = profiledata['grade'] - 3
      axios.put(USER_UPDATE_PROFILE, profiledata)
    }
    catch{
      console.log("오류")
    }
  }, [COMMENT_LIST_URL, USER_UPDATE_PROFILE, dispatch, postId, store])
  
  // Comment 데이터 불러오기
  const fetchData = useCallback( async () =>{
    try{
      const responseData = await axios.get(commentApiUrl)
      dispatch({type:"dataLoading", responseData : responseData.data})
      setcomments(store.getState().commentReducer)
    }
    catch{
      console.log("데이터 불러오기 실패")
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
                  <button className="comment_button" onClick={ addComment }>Add</button>
                </form>

                {/* 댓글 목록 */}
                {
                  comments.map( (comment, i) => {
                    return(
                      <div className="commentList" key={i}>
                        <div>{comment.nickname} : { comment.content } </div>
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
