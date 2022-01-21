import { combineReducers, createStore } from "redux"


// useEffect(async ()=>{
//   //api : http://localhost:3000/v1/post
//     const json = await axios.get("http://localhost:3000/data/postData.json")
//     setposts(json.data)
//   }, []
// )



const reducer = (state = [], action) => {
  
  if (action.type === "recent"){
    return [{text:'POPULAR'}]
  } else {
    return [{text:'RECENT'}]
  }
}

const commentReducer = (state = [], action) => {
  console.log(action.comments)
  // state = [...action.comments]
  if (action.type === "add"){
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



const store = createStore( combineReducers( {reducer, commentReducer} ))
export default store;