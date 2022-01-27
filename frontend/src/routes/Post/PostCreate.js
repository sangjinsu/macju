import { useEffect, useState } from "react";
import '../../styles/PostCreate.css'
import { Link } from 'react-router-dom';

// import axios from "axios"
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
    <div className="postcreate">
      <section class="postcreate_section layout_padding_postcreate">
        <div class="container">
          {/* 맥주detail로 가기 버튼 */}
          <div class='backBtn_postcreate'>
            <Link class='backBtn_text' to='/beer/1'><i class="fas fa-angle-double-left fa-lg"></i> back</Link>
          </div>
          <div class="heading_postcreate">
            <h2>Create Post</h2>
          </div>
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="form_container">
                <form action="/beer/1">
                  {/* 사진 선택하기 */}
                  <div>
                    <input type="file" multiple accept="image/*" onChange={onChange} />
                    
                  </div>

                  {/* 사진 띄우는곳 */}
                  <div>
                    <div class='image_container'>
                      { imgs&&imgs.map((img, index)=>(
                        <img key={index} alt="sample" src={img}/>)
                      )}
                    </div>
                  </div>
                  <hr/>

                  {/* 입력창 */}
                  <div class='input_postcreate'>
                    <textarea 
                      className="postcreate_textarea"
                      maxLength="2200"
                      required
                      placeholder="문구 입력..."
                      rows="5"
                      // cols='50'
                      value={postText}
                      onChange={changeText}
                    ></textarea>
                    <br/>
                    <textarea 
                      className="postcreate_textarea"
                      value={postHashTag}
                      required
                      placeholder="해시태그 입력..."
                      onChange={changeHashTag}
                      rows="1"
                      // cols='50'
                    ></textarea>
                    <br/>
                  </div>
                  <div>
                    <button type="submit"> 작성 완료</button>
                  </div>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )

}

export default PostCreate;
