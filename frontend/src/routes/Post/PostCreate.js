import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "../../firebase_config"
import '../../styles/PostCreate.css'
import { useDispatch, useStore } from "react-redux";
import { isEmpty } from "@firebase/util";
import UploadImage from "components/UploadImage";
import { firebaseApp } from "../../firebase_config";

function PostCreate(s) {
  const memberid = 1  //test용 멤버아이디
  const beerid = s.location.state.beerid    // 작성하고있는 포스트의 맥주아이디
  // DB upload
  const [uploadImages, setUploadImages] =useState([])
  // browser URL
  const [browserImages, setBrowserImages] = useState([]);
  // content(post)
  const [content, setContent] = useState("")    
  // hash(post)
  const [hashtagArr, setHashtagArr] = useState([])
  const [hashtag, setHashtag] = useState("")



  /////// 사진 선택 버튼 click
  const uploadBtn = async (event) => {
    const nowImages = event.target.files  // 현재 선택한 사진들
    //state에 저장
    const imgArray = [...uploadImages]
    for (let i = 0; i< nowImages.length; i++){
      if (!uploadImages.some((img)=>img.name === nowImages[i].name)){
        nowImages[i]['url'] = URL.createObjectURL(nowImages[i])
        nowImages[i]['firebase'] = Date.now() + nowImages[i].name
        imgArray.push(nowImages[i])
      } 
    }
    const results = await Promise.all(imgArray)
    setUploadImages(results)
  }
  





  /////// 사진 삭제 버튼 click
  function deleteImg(e){
    const deletedArray = [...uploadImages]
    deletedArray.splice(e.target.attributes.idx.value, 1)
    setUploadImages(deletedArray)
  }


  const input_content = ((e)=>{
    e.preventDefault()
    setContent(e.target.value)
  })

  const input_hashtags = ((e)=>{
    e.preventDefault()
    setHashtag(e.target.value)
  })

  /////// 해시태그 추가
  const keyup_hashtag = ((e)=>{
    /* enter 키 코드 :13 */
    // if (e.keyCode === 13 && e.target.value.trim() !== '') {
    //   console.log('Enter Key 입력됨!', e.target.value)
    //   setHashtag(e.target.value)
    //   $HashWrapInner.innerHTML = '#' + e.target.value
    //   $HashWrapOuter?.appendChild($HashWrapInner)
    //   setHashtagArr((hashtagArr) => [...hashtagArr, hashtag])
    //   setHashtag('')
    //   // console.log(hashtag)
    // }
    // spacebar 방지 (입력하면 지워짐)
    if (e.keyCode === 32 || e.keycode === 13) {
      e.target.value = e.target.value.replace(' ','')
    }
  })

  const addHashTag = ((e)=>{
    e.preventDefault()
    /* 요소 불러오기, 만들기*/
    const $HashWrapOuter = document.querySelector('.hashtag_wrap')
    const $HashWrapInner = document.createElement('div')
    $HashWrapInner.className = 'hashtag_wrap_inner'
    /* 태그를 클릭 이벤트 관련 로직 */
    $HashWrapInner.addEventListener('click', () => {
      $HashWrapOuter?.removeChild($HashWrapInner)
      console.log($HashWrapInner.innerHTML)
      setHashtagArr(hashtagArr.filter((hashtag) => hashtag))
      console.log(hashtagArr)
    })
    // 비어있지 않으면 해시태그 추가
    if (hashtag.trim() !== '') {
      console.log('해시태그 추가', hashtag)
      $HashWrapInner.innerHTML = '#' + hashtag
      $HashWrapOuter?.appendChild($HashWrapInner)
      setHashtagArr((hashtagArr) => [...hashtagArr, hashtag])
      setHashtag('')
    }
  })
  /////// post 보내기
  const postcreateSubmit = ((e) => {
    e.preventDefault()
    if (uploadImages.length === 0 || content==='' || hashtagArr === 0 ) {
      alert('사진/내용을 추가해 주세요')
    } else {
      const imgNames = [];
      for (let i = 0; i < uploadImages.length; i++){
        imgNames.push(uploadImages[i].firebase)
      }
      console.log(imgNames)
    const newpost = {
      
      // beerId : 2,
      beerId : beerid,
      content : content,
      memberId : memberid,
      paths : imgNames,
      userHashTags : hashtagArr,
      // memberId : memberId,
    }
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': "application/json; charset=UTF-8"
    }
    // console.log(newpost)
    
    axios 
    // http://13.125.157.39:8080/v1/beer/
      .post("http://i6c107.p.ssafy.io:8080/v1/post", newpost, {headers})
      // .post("http://13.125.157.39:8080/v1/post", newpost, {headers})
      .then((res) => {
        console.log(res)
      const storage = getStorage()
      uploadImages.map(async (img, index)=>{
        const storageRef = ref(storage, `imgs/${res.data}/${img.firebase}`)
        await uploadBytes(storageRef, img)
          .then((snapshot) => {
            console.log('uploaded')
          })
      })
    })
  }
  })
   
  
  
  return(
    <div className="postcreate">
      <section className="postcreate_section layout_padding_postcreate">
        <div className="container">
          {/* 맥주detail로 가기 버튼 */}
          <div className='backBtn_postcreate'>
            <Link className='backBtn_text' to='/beer/1'><i className="fas fa-angle-double-left fa-lg"></i> back</Link>
          </div>

          {/* 포스트작성 제목 */}
          <div className="heading_postcreate">
            <h2>Create Post</h2>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {/* 입력 폼 container */}
              <div className="form_container">

                <form onSubmit={postcreateSubmit} action={`/beer/${beerid}`}>

                  {/* 사진 선택하기 */}
                  <div>
                    <input type="file" multiple accept="image/*" onChange={uploadBtn} />
                  </div>

                  {/* 사진 띄우는곳 */}
                  <div>
                    { uploadImages&&uploadImages.map((img, index)=>(
                      <div className='image_container' key={index}>
                        <img alt="sample" src={img.url} className="postimage"/>
                        <div className="deleteImgBtn" role={'button'} onClick={deleteImg} idx={index}>X</div>
                      </div>
                    ))}
                    {/* {console.log(images)} */}
                  </div>
                  <hr/>

                  {/* 입력창 */}
                  <div className='input_postcreate'>
                    <textarea 
                      value={content}
                      onChange={input_content}
                      className="postcreate_textarea"
                      maxLength="2200"
                      required
                      placeholder="문구 입력..."
                      rows="5"
                      // cols='50'
                    ></textarea>
                    <br/>
                    {/* 해시태그 추가 input */}
                    <div className="hashtag_wrap">
                      <div className="hashtag_wrap_outer">
                        <textarea 
                          value={hashtag}
                          onChange={input_hashtags}
                          onKeyUp={keyup_hashtag}
                          className="postcreate_textarea hashtag_input"
                          placeholder="해시태그 입력..."
                          rows="1"
                          // cols='50'
                        >
                        </textarea>
                        <button type="submit" className="addHashBtn" onClick={addHashTag}>추가</button>
                      </div>
                    </div>
                    {/* <div className="hashtag_place"></div> */}
                  </div>

                  {/* 작성완료 버튼 */}
                  <div>
                    <button type="submit" className="complete_btn"> 작성 완료</button>
                    {/* <button type="submit" onClick={upLoadImg}> 작성 완료</button> */}
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
