import { getDownloadURL, getStorage , ref } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { useParams } from "react-router-dom"
import axios from "axios"

function PostDetailImages(){
  const POST_DETAIL_URL = process.env.REACT_APP_SERVER + ':8080/v1/post'
  



  const [postDetailImage, setPostDetailImage] = useState([])


  const postId = useParams().postId;


  const store = useStore((state)=>state)
  const storage = getStorage()
  const fetchPostDetailData = async () =>{
    const postDetail = await axios.get(`${POST_DETAIL_URL}/${postId}`)
    const imageList = [...postDetailImage]
    for (let i = 0; i < postDetail.data.photos.length; i++){
      const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${postId}/${postDetail.data.photos[i].data}`)
      await getDownloadURL(storageRef)
      .then((res) =>{
        if (!postDetailImage.some((url)=>url===res)) {
          imageList.push(res)
        }
      })
    }
    setPostDetailImage(imageList)
  }

  const images = store.getState().postDetailReducer.photos
  const fetchData = async() =>{
    const imageList = [...postDetailImage]
    for (let i = 0; i < images.length; i++){
      const storageRef = ref(storage, `gs://ssafy-01-user-image.appspot.com/imgs/${postId}/${images[i].data}`)
      await getDownloadURL(storageRef)
      .then((res) =>{
        if (!postDetailImage.some((url)=>url===res)) {
          imageList.push(res)
        }
      })
    }
    setPostDetailImage(imageList)
  }

  //useEffect

  useEffect(()=>{
    if (images) {
      fetchData();
    } else  {
      fetchPostDetailData();
    }
    
  }, [images])

  
  return(
    <>
    {postDetailImage&& postDetailImage.map((data, i)=>
            <div className="col-md-6 " key={i}>
            <div className="img-box">
              <img src={data} alt=''></img> 
            </div>
            </div>
          )}
    </>
  )
}



export default PostDetailImages;