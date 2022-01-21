import { combineReducers, createStore } from "redux"
import axios from 'axios';

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
  // state = [...action.comments]
  if (action.type === "add"){
    const copyCommentList = [...action.comments, action.inputComment]
    return copyCommentList
  }else if (action.type === "change"){
    const copyCommentList = [...action.comments]
    // copyCommentList[action.i]
    return copyCommentList
  }else if (action.type === "test"){
    console.log('aa')

    const test1 = async ()=>{
        //api : http://localhost:3000/v1/post/{postId}/comment
        const jsonData = await axios.get("http://localhost:3000/data/commentData.json")
        console.log(jsonData.data)
        return jsonData.data
    }

    return test1
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