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
    return copyCommentList
  }
  else if (action.type === "delete"){
    let copyCommentList = [...state]
    console.log(copyCommentList)
    copyCommentList.splice(action.i -1, 1)
    console.log(copyCommentList)
    return copyCommentList
  }
  else{
    return state
  }
}


const store = createStore( combineReducers( {reducer, commentReducer} ))
export default store;