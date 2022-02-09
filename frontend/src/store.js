import { combineReducers, createStore } from "redux"

const userReducer = (state = [], action) => {
  if (action.type === "login") {
    const loginState = action.loginUser
    return loginState
  }else if (action.type === "logout") {
    const logoutState = {}
    return logoutState
  }else{
    return state
  }
}



const profileReducer = (state = [], action)=>{
  if (action.type === "user"){
    state = [...state, {'user': action.userdata}] 
  } else if (action.type ==='post') {
    state =[...state, {'post':action.userpost}]
  } else if (action.type === 'like'){
    state= [...state, {'like':action.userlike}]
  } else if (action.type ==='review'){
    state =[...state, {'review':action.userreview}]
  }
  return state
}







const postImageRecuder = (state=[], action) =>{
  if (action.type === "newImages"){
    return action.images
  }
  return state 
}



const postListReducer = (state = [], action) => {
  if (action.type === "firstSave") {
    return action.new.data
  } else if (action.type === "new"){
    return action.new.data
  } else if (action.type === 'popular'){
    return state
  }
  return state
}

const postDetailReducer = (state= [], action) => {
  if (action.type === "postDetailLoading"){
    const loadPostDetail = action.postDetail
    const newHashTags = loadPostDetail.userHashTags.map( (tag)=> tag.content)
    loadPostDetail.userHashTags = newHashTags
    return loadPostDetail
  }else if (action.type === "updatePost") {
    const copyPost = Object.assign(state)// [...state]
    const updateContent = action.updateContent
    const updateHashTag = action.updateHashTag
    copyPost.content = updateContent
    copyPost.userHashTags = updateHashTag
    return copyPost
  }else if (action.type === "postDelete"){
    const deletePost = []
    return deletePost
  }else{
    return state
  }
}

const commentReducer = (state = [], action) => {
  if (action.type === "dataLoading") {
    const loadData = action.responseData
    return loadData
  }else if (action.type === "addComment"){
    const copyCommentList = [action.inputComment, ...state]
    return copyCommentList // return된 copyCommentList가 state(기존reducer에 저장된 값)가 된다
  }
  else if (action.type === "deleteComment"){
    const copyCommentList = [...state]
    const commentId = parseInt(action.commentKey)
    const newComments = copyCommentList.filter((comment)=>comment.commentId !== commentId)
    return newComments
  }
  else{
    return state
  }
}

const beerListReducer = (state = [], action) =>{
  if (action.type === "getBeerList") {
    state = action.data
  }
  return state
}

const postCreateReducer = (state = [], action) =>{
  if (action.type==='imgs'){
    state = action.data
  }
  return state
}

const store = createStore( combineReducers( {userReducer, postListReducer, postDetailReducer, commentReducer, beerListReducer, postCreateReducer, postImageRecuder, profileReducer} ))
export default store;
