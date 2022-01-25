import { combineReducers, createStore } from "redux"

const reducer = (state = [], action) => {
  if (action.type === "recent"){
    return [{text:'RECENT'}]
  } else {
    return [{text:'POPULAR'}]
  }
}

const commentReducer = (state = [], action) => {
  if (action.type === "dataLoading") {
    state = action.jsonData
    return state
  }else if (action.type === "add"){
    const copyCommentList = [...state, action.inputComment]
    return copyCommentList // return된 copyCommentList가 state(기존reducer에 저장된 값)가 된다
  }
  else if (action.type === "delete"){
    let copyCommentList = [...state]
    copyCommentList.splice(action.i, 1)
    return copyCommentList
  }
  else{
    return state
  }
}


const store = createStore( combineReducers( {reducer, commentReducer} ))
export default store;
