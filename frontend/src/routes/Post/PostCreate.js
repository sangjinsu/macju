import { useCallback, useState } from "react";
import { useHistory } from 'react-router-dom';
import {useSelector} from "react-redux"
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import "../../firebase_config"
import imageCompression from 'browser-image-compression';
import '../../styles/PostCreate.css'
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Slider from "react-slick";
import axiosInstance from "CustomAxios";

function PostCreate(props) {
  const POST_CREATE_URL = process.env.REACT_APP_SERVER + ':8888/v1/post'
  // const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8888/v1/member/profile'
  const userData = useSelector(state => state.userReducer)
  const memberid = userData.memberId
  const beerid = props.location.state.beerid    
  const storage = getStorage(); 
  const history = useHistory();
  const [browserImages, setBrowserImages] =useState([]);
  const [firebaseImages, setFirebaseImages] = useState([]) 
  const [content, setContent] = useState("");
  const [hashtagArr, setHashtagArr] = useState([]);
  const [hashtag, setHashtag] = useState("");
  // const store = useStore((state)=>state);
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const uploadBtn = useCallback( async (e) => {
    try{
      if (browserImages.length === 0){
        const spinner = document.getElementById('spinner')
        spinner.removeAttribute('hidden')
      }
      e.preventDefault()
      const files = e.target.files  
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
          const res = await uploadBytes(storageRef, compressedFile)
          setFirebaseImages((prev)=>[...prev, res])
        }
      }
      setBrowserImages(fileList)
    }catch (error){
      console.log(error)
    }
  }, [browserImages, storage])
  const deleteImg = useCallback ((e) => { 
    e.preventDefault()
    const deletedArray = [...browserImages]
    const index = e.target.attributes.idx.value
    for (let i = 0; i < deletedArray.length; i++) {
      if (parseInt(index) === browserImages[i].index) {
        deletedArray.splice(i, 1)
        for (let j = 0; j <firebaseImages.length; j++){
          if(browserImages[i].uploadName === firebaseImages[j].metadata.name) {
            const desertRef = ref(storage, firebaseImages[j].metadata.name)
            deleteObject(desertRef)
            break
          } 
        }
        break
      }
    }
    setBrowserImages(deletedArray)      
  }, [browserImages, firebaseImages, storage])
  const input_content = ((e)=>{
    setContent(e.target.value)
  })
  const input_hashtags = ((e)=>{
    setHashtag(e.target.value)
  })
  const keyup_hashtag = (e)=>{
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.target.value = e.target.value.replace(' ','')
      e.target.value = e.target.value.replace('\n','')
    }
  }
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
  const postCreateSubmit = useCallback( (e) =>{
    e.preventDefault();
    if (firebaseImages.length === 0 || content==='' || hashtagArr.length === 0 ) {
      alert('사진/내용을 추가해 주세요')
      return
    }
    else if (memberid === null) {
      alert('로그인 후 이용해주세요')
      return
    }
    else {
      const imgNames = [];
      for (let i = 0; i < firebaseImages.length; i++){
        imgNames.push(firebaseImages[i].metadata.name)
      }
      const newpost = {
        beerId : beerid,
        content : content,
        memberId : memberid,
        paths : imgNames,
        userHashTags : hashtagArr,
        
      }
      axiosInstance.post(POST_CREATE_URL, newpost)
      .then(()=>{
        history.push(`/post`)
      })
      .catch(()=>{
        for (let j = 0; j <firebaseImages.length; j++){
          const desertRef = ref(storage, firebaseImages[j].metadata.name)
          deleteObject(desertRef)
        }
      })
    } 
  }, [POST_CREATE_URL, beerid, content, firebaseImages, hashtagArr, history, storage, memberid])
  const backPage = useCallback( () => {
    for (let i = 0; i < firebaseImages.length; i++) {
      const desertRef = ref(storage, firebaseImages[i].metadata.name)
      deleteObject(desertRef)
    }
    history.push(`/beer/${beerid}`)
  }, [beerid, firebaseImages, history, storage])

  return (
    <div className="postcreate">
      <section className="postcreate_section layout_padding_postcreate">
        <div className="container">
          <div className='backBtn_postcreate'>
            <button className='backBtn_text' onClick={backPage}><i className="fas fa-angle-double-left fa-lg"></i> back</button>
          </div>
          <div className="heading_postcreate">
            <h2>Create Post</h2>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="form_container">
                <form action={`/beer/${beerid}`} onSubmit={postCreateSubmit}>
                  <div>
                  <Slider {...carouselSettings}>
                    { browserImages.length === 0 
                    ? <Box hidden id="spinner" sx={{ display: 'flex' }} style={{justifyContent:'center', marginTop:100, marginBottom:100}}><CircularProgress size={200} style={{color:'#F9CF68'}}/></Box>
                    :browserImages.map((img)=>(
                      <div className='image_container' key={img.index}>
                        <img alt="sample" src={img.url} className="postimage"/>
                        <div className="deleteImgBtn" role={'button'} onClick={deleteImg} idx={img.index}>X</div>
                      </div>
                    ))}
                  </Slider>
                  </div>
                  <div>
                    <label className="input_file_btn" htmlFor="input_file"><i className="fas fa-images"></i></label>
                    <input id="input_file" type="file" multiple accept="image/*" onChange={uploadBtn} style={{display:"none"}}/>
                  </div>
                  <div className='input_postcreate'>
                    <textarea 
                      value={content}
                      onChange={input_content}
                      className="postcreate_textarea"
                      maxLength="2200"
                      required
                      placeholder="2200자 이내로 작성해주세요"
                      rows="5"
                    ></textarea>
                    <br/>
                    <div className="hashtag_wrap">
                      <div className="hashtag_wrap_outer">
                        <textarea 
                          value={hashtag}
                          onChange={input_hashtags}
                          onKeyUp={keyup_hashtag}
                          className="postcreate_textarea hashtag_input"
                          placeholder="해시태그 입력..."
                          rows="1"
                        >
                        </textarea>
                        <button type="submit" className="addHashBtn" onClick={addHashTag}>추가</button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <button type="submit" className="complete_btn col-4 offset-4"> 작성 완료</button>
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