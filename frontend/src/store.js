import {createStore} from "redux"

// useEffect(async ()=>{
//   //api : http://localhost:3000/v1/post
//     const json = await axios.get("http://localhost:3000/data/postData.json")
//     setposts(json.data)
//   }, []
// )

const reducer = (state = [], action) => {
  console.log(action.type)
  if (action.type === "recent"){
    return [{text:'RECENT'}]
  } else {
    return [{text:'POPULAR'}]
  }
}



const store = createStore(reducer)
export default store;