import {createStore} from "redux"

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



const store = createStore(reducer)
export default store;