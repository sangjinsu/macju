import { combineReducers, createStore } from "redux"
import axios from 'axios';
import { useState } from "react";

// useEffect(async ()=>{
//   //api : http://localhost:3000/v1/post
//     const json = await axios.get("http://localhost:3000/data/postData.json")
//     setposts(json.data)
//   }, []
// )



const reducer = (state = [], action) => {
  if (action.type === "recent"){
    return [{text:'RECENT'}]
  } else {
    return [{text:'POPULAR'}]
  }
}

const commentReducer = (state = [], action) => {
  let commentData = null
  if (action.type === "dataLoading") {
    let commentData = action.jsonData
    return commentData
  }else if (action.type === "add"){
    const copyCommentList = [...action.comments, action.inputComment]
    return copyCommentList
  }else if (action.type === "change"){
    const copyCommentList = [...action.comments]
    // copyCommentList[action.i]
    return copyCommentList
  }
  else{
    return state
  }
}

// const commentReducer = (state = [], action) => {
//   if (action.type === "test"){
//     console.log('aa')
//     return state
//   }
//   else{
//     return state
//   }
// }



const store = createStore( combineReducers( {reducer, commentReducer} ))
export default store;