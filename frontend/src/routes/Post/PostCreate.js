import { useEffect, useState } from "react";
import axios from "axios"
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from 'react-bootstrap';


// const PostCreate2 = () => {
//   const [imgs, setImgs] = useState([]);
  
//   const onChange = async (event) =>  {
//     const formData = new FormData();
//     const imgList = event.target.files
//     let nowImage = null
//     let newList = [...imgs]
//     for (let i=0; i<imgList.length; i += 1) {
//       nowImage = URL.createObjectURL(imgList[i])
//       newList.push(nowImage)
//       console.log(newList)
//     }
//     setImgs(newList)
//     console.log(newList)
//   }
//   return (
//     <>
//     <input type="file" multiple accept="image/*" onChange={onChange} />
//     <div>
//       { imgs&&imgs.map((img, index)=>(
//         <img key={index} alt="sample" src={img} width={300} style={{margin:"auto"}} />)
//       )}
//     </div>
//     </>
//   )
// }


function PostCreate() {
  const [imgs, setImgs] = useState([]);
  
  const onChange = async (event) =>  {
    const formData = new FormData();
    const imgList = event.target.files
    let nowImage = null
    let newList = [...imgs]
    for (let i=0; i<imgList.length; i += 1) {
      nowImage = URL.createObjectURL(imgList[i])
      newList.push(nowImage)
      console.log(newList)
    }
    setImgs(newList)
    console.log(newList)
  }
  // const [submitBtn, deactivateSubmitBtn ] = useState(true)
  const [postText, changePostText] = useState("")
  const [postHashTag, changePostHashTag] = useState("")

  const changeText = ((e)=>{
    changePostText(e.target.value)
  })
  const changeHashTag = ((e)=>{
    changePostHashTag(e.target.value)
  })

  const [postImg, setPostImg] = useState();
   const saveImg = (e)=>{
    const nowImage = e.target.files[0];
    const nowImageURL = URL.createObjectURL(nowImage)
    setPostImg(nowImageURL)
    console.log(setPostImg)
  }
  // const saveImg = (e)=>{
  //   const nowImageList = e.target.files;
  //   const nowImageURLList = [...postImgs]
  //   for (let i=0; i<nowImageList.length; i += 1) {
  //     const nowImageURL = URL.createObjectURL(nowImageList[i])
  //     nowImageURLList.push(nowImageURL);
  //   }
  //   setPostImgs(nowImageURLList)
  //   console.log(setPostImgs)
  // }
  // const deleteImg = ()=>{
  //   URL.revokeObjectURL(postImg);
  //   setPostImg("");
  //   console.log(postImg)
  // }

  // const onImgChange = async (event:any) => {
  //   const formData = new FormData();
  //   formData.append('file', event.target.files[0]);
    // const response = await apiClient.post('/', formData)
    // response.data.location이 업로드한 파일의 url
  // }
  
  // useEffect( () => {
  //   if (postText && postHashTag) {
  //     deactivateSubmitBtn(false)
  //   }
  //   }, [postText, postHashTag, submitBtn]
  // )

  return(
    <div>
      <h1>Post 작성하기</h1>
      <form>
        {/* multiple='multiple'  */}
        {/* <label>사진 고르기 : 
          <input type='file' 
            accept='image/*' 
            className='imgInput' onChange={saveImg}
          ></input>
        </label> */}
        {/* <br/> */}
        {/* <div className="postImg">
          {
            // postImgs && postImgs.map((postimg)=>{
            //   {console.log(postimg)}
            //   <img src={postimg}></img>
            // })
            postImg && <img src={postImg} width="300px"></img>
          }
        </div>
        
        <br/>
        {  postImg && <button onClick={() => deleteImg()} > 삭제 </button> }
        */}

        <input type="file" multiple accept="image/*" onChange={onChange} />
        <div>
          { imgs&&imgs.map((img, index)=>(
            <img key={index} alt="sample" src={img} width={150} style={{margin:"auto"}} />)
          )}
        </div>

        <hr/>
        
        <textarea maxLength="2200"
          required
          placeholder="문구 입력..."
          rows="5"
          cols='40'
          value={postText}
          onChange={changeText}
        ></textarea>
        <br/>
        <textarea value={postHashTag}
          required
          placeholder="문구 입력..."
          onChange={changeHashTag}
          rows="1"
          cols='40'
        ></textarea>
        <br/>
        <button type="submit"> 작성 완료</button>
      </form>
    </div>

  )

}

export default PostCreate;
