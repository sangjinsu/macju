import { combineReducers, createStore } from "redux"
import axios from "axios"
const postReducer = (state = [], action) => {
  if (action.type === "recent"){
    return [{text:'RECENT'}]
  } else {
    return [{text:'POPULAR'}]
  }
}

const commentReducer = (state = [], action) => {
  if (action.type === "dataLoading") {
    state = action.responseData
    return state
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

const store = createStore( combineReducers( {postReducer, commentReducer} ))
export default store;
