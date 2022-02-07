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

const reducer = (state = [], action) => {
  if (action.type === "recent"){
    return [{text:'RECENT'}]
  } else {
    return [{text:'POPULAR'}]
  }
}

const postDetailReducer = (state= [], action) => {
  if (action.type === "postDetailLoading"){
    const loadPostDetail = action.postDetail
    return loadPostDetail
  }else if (action.type === "postDetailUpdate"){
    const updatePost = action.postUpdate
    return updatePost
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
  }else if (action.type === "add"){
    const copyCommentList = [action.inputComment, ...state]
    return copyCommentList // return된 copyCommentList가 state(기존reducer에 저장된 값)가 된다
  }
  else if (action.type === "delete"){
    let copyCommentList = [...state]
    console.log(copyCommentList)
    copyCommentList.splice(action.i, 1)
    return copyCommentList
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


const store = createStore( combineReducers( {userReducer, reducer, postDetailReducer, commentReducer, beerListReducer} ))
export default store;
