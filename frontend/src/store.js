import { combineReducers } from "redux"

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'

const headers = {
    "Accept":"application/json;charset=UTF-8",
    "Content-Type":"application/json;charset=UTF-8"
}

const headerReducer = (state = [], action) =>{
  if (action.type === "header"){
    headers["AccessToken"] = action.AccessToken
    return headers
  }
  return headers
}

const notLoginUser = {
  AccessToken:"",
  first_check:"",
  kakaoId:"",
  memberId:null,
  result:""
}

const userReducer = (state=notLoginUser, action) => {
  if (action.type === "loginSuccess"){
    const userData = action.userData
    userData.memberId = Number(userData.memberId)
    return userData
  } else if (action.type === "logout") {
    const logoutState = notLoginUser
    return logoutState
  }
  return state
}
  
const kakaoIdReducer = (state = -1, action) => {
  if (action.type === "kakaoId") {
    return action.userKaKaoId
  } 
  return state
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
    return action.userdata.data
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
    const copyCommentList = [...state, action.inputComment]
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

const checkFlavorArray = []
const checkBoxFlavorReducer = (state= [], action) => {
  if (action.data > 13) return checkFlavorArray
  if (action.type === "addAromaCheck"){
    if (checkFlavorArray.indexOf(action.data) < 0){
      checkFlavorArray.push(action.data)
    }
  } else if (action.type === "removeAromaCheck"){
    const index = checkFlavorArray.indexOf(action.data)
    if (index >= 0) {
      checkFlavorArray.splice(index, 1)
      return checkFlavorArray
    }
  }
  
  return checkFlavorArray
}
const checkAromaArray = []
const checkBoxAromaReducer = (state= [], action) => {
  if (action.data <= 13) return checkAromaArray
  if (action.type === "addAromaCheck"){
    if (checkAromaArray.indexOf(action.data - 13) < 0){
      checkAromaArray.push(action.data - 13)
    }
  } else if (action.type === "removeAromaCheck"){
    const index = checkAromaArray.indexOf(action.data - 13)
    if (index >= 0) {
      checkAromaArray.splice(index, 1)
      return checkAromaArray
    }
  }
  
  return checkAromaArray
}

const rootReducer = combineReducers
  ( {
    userReducer,
    kakaoIdReducer,
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
     headerReducer,
     checkBoxFlavorReducer,
     checkBoxAromaReducer,
  
  } )


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
