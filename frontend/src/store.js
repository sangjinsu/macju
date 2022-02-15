import { combineReducers, createStore } from "redux"



const profileReducer = (state = [], action) => {
  const profileData = {
    "memberId" : 1, 
    "nickName": '임의로 바꿀거임',
    "name": "ssafy",
    "intro": '이것도 임의로 바꿀거임',
    "profileColor": "Black",
    "grade" : 120,
  }
  return profileData
}


const notLoginUser = {
  "AccessToken":"",
  "first_check":"",
  "kakaoId":"",
  "memberid":null,
  "result":""
}

const userReducer = (state = notLoginUser, action) => {
  if (action.type === "loginSucess") {
    const loginState = action.userData
    window.localStorage.setItem("AccessToken", loginState.AccessToken) // 불러오기 window.localStorage.getItem("AccessToken")
    return loginState
  }else if (action.type === "logout") {
    const logoutState = {}
    return logoutState
  }else{
    return state
  }
}


const followersReducer = (state = [], action) => {
  if (action.type === 'followers') {
    return action.followers
  } 
  return state
}


const followingsReducer = (state = [], action) => {
  if (action.type === 'followings') {
    return action.followings
  }
  return state
}





const userProfileReducer = (state = [], action)=>{
  if (action.type === "user"){
    return action.userdata
  }
  return state
}
const userPostReducer = (state = [], action) => {
  if (action.type ==='post'){
    return action.userpost
  }
  return state
}

const userLikeReducer = (state =[], action) =>{
  if (action.type === 'like'){
    return action.userlike
  }
  return state
}

const userReviewReducer = (state= [], action) =>{
  if (action.type === 'review'){
    return action.userreview
  }
  return state
}




const postImageRecuder = (state=[], action) =>{
  if (action.type === "newImages"){
    return action.images
  }
  return state 
}





const postDetailReducer = (state= [], action) => {
  if (action.type === "postDetailLoading"){
    const loadPostDetail = action.postDetail
    let newHashTags;
    if (loadPostDetail.userHashTags) {
      newHashTags = loadPostDetail.userHashTags.map( (tag)=> tag.content)
    } else {
      newHashTags = []
    }
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
    return action.data
  }
  return state
}

const postCreateReducer = (state = [], action) =>{
  if (action.type==='imgs'){
    state = action.data
  }
  return state
}


const navbarReducer = (state=false, action) => {
  if (action.type === "navOpen"){
    const newState = false
    return newState
  } else if (action.type === "navClose"){
    const newState = true
    return newState
  } 
  else {
    return state
  }
}



const store = createStore( combineReducers
  ( {
    userReducer,
     postDetailReducer,
     commentReducer,
     beerListReducer, 
     postCreateReducer, 
     postImageRecuder, 
     userProfileReducer, 
     userPostReducer, 
     userLikeReducer,
     userReviewReducer,
     navbarReducer,
     followersReducer,
     followingsReducer,
     profileReducer,
  
  } ))



export default store;
