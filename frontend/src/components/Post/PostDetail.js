import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "react-redux";

function PostDetailComponent(props){
  const [postData, setPostData] = useState();
  const [postImage, setPostImage] = useState([])
  const store = useStore((state)=>state)
  const storage = getStorage()

  useEffect(()=> {
    setPostData(store.getState().postDetailReducer)
  }, [])

  useEffect(()=>{
    const imageData = async() => {
      const detailImageList = []
      for (let i = 0; i < postData.length; i++){
        const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${props.postId}/${newPost[i].photo.data}`)
      }
    }
  })

  return(
    <>
    </>
  )
}