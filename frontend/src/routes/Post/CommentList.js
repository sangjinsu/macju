import React, { useEffect, useRef, useState, useCallback } from "react"
import { useDispatch, useSelector, useStore } from 'react-redux';
import "../../styles/CommentList.css"
import axiosInstance from "CustomAxios";

function CommentList(props) {
  const postId = props.postId; // PostDetail 에서 postId값을 props로 받기

  const COMMENT_LIST_URL = process.env.REACT_APP_SERVER + ':8888/v1/post'
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8888/v1/member/profile'
  const commentApiUrl = `${COMMENT_LIST_URL}/${postId}/comment` // 조회, 추가 때 사용

  // 로그인한 유저 아이디
  const loginMemberId = useSelector(state => state.userReducer).memberId

  const dispatchComment = useRef();
  const newCommentId = useRef("");
  const store = useStore((state)=>state)
  const dispatch = useDispatch();
  const [comments, setcomments] = useState([]);
  const [inputComment, inputCommentChange] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const commentPerPage = 10; // 페이지당 포스트 개수

  const indexOfLastComment = currentPage * commentPerPage // 1 * 10 
  const indexOfFirstPost = indexOfLastComment - commentPerPage
  const currentComments = comments.slice(indexOfFirstPost, indexOfLastComment)
  const pageNumbers = [];
  for (let i=1; i<=Math.ceil(comments.length / commentPerPage); i++){
    pageNumbers.push(i)
  }

  const paginate = pageNum => setCurrentPage(pageNum)

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
          "memberId": loginMemberId
        }
        
        const { data : addData} = await axiosInstance.post(commentApiUrl, postData)
        newCommentId.current = addData // comment가 생성될 때 comment id값 받아와서 사용 -> redux 관리 위해
        dispatchComment.current = {
          "commentId": newCommentId.current,
          "content": inputComment,
          "memberId": loginMemberId,
          "nickname": "kimdongiln" // 수정필요
        }
        dispatch({ type : "addComment", inputComment : dispatchComment.current })
        setcomments(store.getState().commentReducer)
        inputCommentChange("")
  
        // 댓글 작성될 때 회원점수 적립
        // const profiledata = store.getState().profileReducer
        // profiledata['grade'] = profiledata['grade'] + 3
        // axios.put(USER_UPDATE_PROFILE, profiledata)
      }
      catch{
        console.log("오류")
      }
    }
  }, [USER_UPDATE_PROFILE, commentApiUrl, dispatch, inputComment, store, loginMemberId])

  // 삭제 버튼 누를시 동작
  const deleteComment = useCallback( async (e) => {
    try{
      const commentId = e.target.attributes.commentid.value
      const deleteApiUrl = `${COMMENT_LIST_URL}/${postId}/comment/${commentId}`

      await axiosInstance.delete(deleteApiUrl)
      dispatch({ type : "deleteComment", commentKey : commentId })
      setcomments(store.getState().commentReducer)

      // 댓글 삭제시 회원점수 감소
      // const profiledata = store.getState().profileReducer
      // profiledata['grade'] = profiledata['grade'] - 3
      // axiosInstance.put(USER_UPDATE_PROFILE, profiledata)
    }
    catch{
      console.log("오류")
    }
  }, [COMMENT_LIST_URL, USER_UPDATE_PROFILE, dispatch, postId, store])
  
  // Comment 데이터 불러오기
  const fetchData = useCallback( async () =>{
    try{
      const responseData = await axiosInstance.get(commentApiUrl)
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
                  <i className="fas fa-location-arrow fa-lg" onClick={ addComment }></i>
                  {/* <button className="comment_button" onClick={ addComment }>Add</button> */}
                </form>

                {/* 댓글 목록 */}
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
