import { useCallback, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import {useStore} from "react-redux"
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import "../../firebase_config"
import imageCompression from 'browser-image-compression';
import '../../styles/PostCreate.css'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function PostCreate(props) {
  const POST_CREATE_URL = process.env.REACT_APP_SERVER + ':8080/v1/post'
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8080/v1/member/profile'
  const memberid = 1  //test용 멤버아이디
  const beerid = props.location.state.beerid    // 작성하고있는 포스트의 맥주아이디

  const storage = getStorage(); //firebase
  
  const history = useHistory();
  // DB upload
  const [browserImages, setBrowserImages] =useState([]);
  const [firebaseImages, setFirebaseImages] = useState([]) 
  const [content, setContent] = useState("");
  // hash(post)
  const [hashtagArr, setHashtagArr] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const store = useStore((state)=>state);

  // const uploadBtn = async (event) => {
  //   event.preventDefault()
  //   const nowImages = event.target.files  // 현재 선택한 사진들
  //   //state에 저장
  //   const imgArray = [...browserImages]
  //   for (let i = 0; i< nowImages.length; i++){
  //     if (!browserImages.some((img)=>img.name === nowImages[i].name)){
  //       const currentTime = Date.now()
  //       nowImages[i]["url"] = URL.createObjectURL(nowImages[i])
  //       nowImages[i]['uploadName'] = currentTime + nowImages[i].name.replace(" ", "")
  //       nowImages[i]['index'] = currentTime
  //       await imgArray.push(nowImages[i])
  //       const nowImageName = nowImages[i].name.replace(" ", "")
  //       const storageRef = ref(storage, currentTime + nowImageName)
  //       await uploadBytes(storageRef, nowImages[i])
  //       .then((res)=>{
  //         console.log('uploaded')
  //         setFirebaseImages((prev)=>[...prev, res])
  //       })
  //     } 
  //   }
  //   const results = await Promise.all(imgArray)
  //   setBrowserImages(imgArray)
  //   console.log(imgArray)
  // }
  
  // 사진 선택 버튼 click, 사진 업로드는 5개
  const uploadBtn = useCallback( async (e) => {
    const spinner = document.getElementById('spinner')
    spinner.removeAttribute('hidden')
    try{
      e.preventDefault()
      const files = e.target.files  // 현재 선택한 사진들
      const fileList = [...browserImages]

      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 400
      }

      const nowFileNames = Object.values(files).map( (nowFile) => nowFile.name )
      const preFileNames = Object.values(files).map( (preFile) => preFile.name)

      for (let i = 0; i < files.length; i++){
        if (!(nowFileNames in preFileNames) ){
          
          const compressedFile = await imageCompression(files[i], options)
          const currentTime = Date.now()
          const uniqueName = uuidv4()
          const newName = currentTime + uniqueName
          compressedFile["url"] = URL.createObjectURL(compressedFile)
          compressedFile['uploadName'] = newName
          compressedFile['index'] = currentTime
          fileList.push(compressedFile)
          const storageRef = ref(storage, newName)
          await uploadBytes(storageRef, compressedFile)
          .then((res)=>{
            setFirebaseImages((prev)=>[...prev, res])
          })
        }
      }
      setBrowserImages(fileList)
    }catch (error){
      console.log(error)
    }
  }, [browserImages, storage])

  // 사진 삭제 버튼 click
  const deleteImg = useCallback ((e) => { 
    e.preventDefault()
    const deletedArray = [...browserImages]
    const index = e.target.attributes.idx.value

    // setBrowserImages(deletedArray)
    // 
    for (let i = 0; i < deletedArray.length; i++) {
      if (parseInt(index) === browserImages[i].index) {
        deletedArray.splice(i, 1)
        for (let j = 0; j <firebaseImages.length; j++){
          if(browserImages[i].uploadName === firebaseImages[j].metadata.name) {
            const desertRef = ref(storage, firebaseImages[j].metadata.name)
            deleteObject(desertRef).then(()=>{
              console.log('deleted successfully')
            }).catch((err)=>{
              console.log(err)
            })
            break
          } 
        }
        break
      }
    }
    setBrowserImages(deletedArray)      
  }, [browserImages, firebaseImages, storage])

  // comment
  const input_content = ((e)=>{
    setContent(e.target.value)
  })

  // hastag comment
  const input_hashtags = ((e)=>{
    setHashtag(e.target.value)
  })

  // 해시태그 추가, 띄어쓰기(32) Enter(13) 금지
  const keyup_hashtag = (e)=>{
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.target.value = e.target.value.replace(' ','')
      e.target.value = e.target.value.replace('\n','')
    }
  }

  // 해시태그 추가
  const addHashTag = useCallback((e) => {
    e.preventDefault()
    const $HashWrapOuter = document.querySelector('.hashtag_wrap')
    const $HashWrapInner = document.createElement('div')
    $HashWrapInner.className = 'hashtag_wrap_inner'
    $HashWrapInner.addEventListener('click', () => {
    $HashWrapOuter?.removeChild($HashWrapInner)
    setHashtagArr(hashtagArr.filter((hashtag) => hashtag))
    })
    if (hashtag.trim() !== '') {
      $HashWrapInner.innerHTML = '#' + hashtag
      $HashWrapOuter?.appendChild($HashWrapInner)
      setHashtagArr((hashtagArr) => [...hashtagArr, hashtag])
      setHashtag('')
      }
    }, [hashtag, hashtagArr])
  
  // post 생성
  const postCreateSubmit = useCallback( (e) =>{
    e.preventDefault();
    if (firebaseImages.length === 0 || content==='' || hashtagArr.length === 0 ) {
      alert('사진/내용을 추가해 주세요')
      return
    }
    else {
      const imgNames = [];
      for (let i = 0; i < firebaseImages.length; i++){
        console.log(firebaseImages[i])
        imgNames.push(firebaseImages[i].metadata.name)
      }
      const newpost = {
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
      axios.post(POST_CREATE_URL, newpost, headers)
      .then(()=>{
        const profiledata = store.getState().profileReducer
        profiledata['grade'] = profiledata['grade'] + 10
        axios.put(USER_UPDATE_PROFILE, profiledata)
        .then(()=>{
          history.push(`/post`)
          // history.replace(`/beer/${beerid}`)
        })

      })
      .catch(()=>{
        for (let j = 0; j <firebaseImages.length; j++){
          const desertRef = ref(storage, firebaseImages[j].metadata.name)
          deleteObject(desertRef)
          .then(()=>{
            console.log('deleted successfully')
          })
          .catch((err)=>{
            console.log(err)
          }) 
        }
      })
    } 
  }, [POST_CREATE_URL, USER_UPDATE_PROFILE, beerid, content, firebaseImages, hashtagArr, history, storage, store])
  
  return (
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
                <form action={`/beer/${beerid}`} onSubmit={postCreateSubmit}>
                  {/* 사진 선택하기 */}
                  <div>
                    <input type="file" multiple accept="image/*" onChange={uploadBtn} />
                  </div>

                  {/* 사진 띄우는곳 */}
                  
                  <div>
                    { browserImages.length === 0 ? <Box hidden id="spinner" sx={{ display: 'flex' }} style={{justifyContent:'center', marginTop:100, marginBottom:100}}><CircularProgress size={200}/></Box>:browserImages.map((img)=>(
                      <div className='image_container' key={img.index}>
                        <img alt="sample" src={img.url} className="postimage"/>
                        <div className="deleteImgBtn" role={'button'} onClick={deleteImg} idx={img.index}>X</div>
                      </div>
                    ))}
                   
                  </div>
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
                  </div>
                  <hr/>

                 

                  {/* 작성완료 버튼 */}
                  <div>
                    <button type="submit" className="complete_btn"> 작성 완료</button>
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
