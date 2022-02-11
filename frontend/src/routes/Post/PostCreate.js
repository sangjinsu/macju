import { useCallback, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import {useStore} from "react-redux"
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import "../../firebase_config"
import '../../styles/PostCreate.css'
import axios from "axios";


function PostCreate(props) {
  const POST_CREATE_URL = process.env.REACT_APP_SERVER + ':8080/v1/post'
  const USER_UPDATE_PROFILE =  process.env.REACT_APP_SERVER + ':8080/v1/member/profile'
  const memberid = 1  //test용 멤버아이디
  const beerid = props.location.state.beerid    // 작성하고있는 포스트의 맥주아이디

  const history = useHistory();



  //firebase
  const storage = getStorage();




  // DB upload
  const [browserImages, setBrowserImages] =useState([]);
  const [firebaseImages, setFirebaseImages] = useState([]) 
  const [content, setContent] = useState("");
  // hash(post)
  const [hashtagArr, setHashtagArr] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const store = useStore((state)=>state);

  const uploadBtn = async (event) => {
    event.preventDefault()
    const nowImages = event.target.files  // 현재 선택한 사진들
    //state에 저장
    const imgArray = [...browserImages]
    for (let i = 0; i< nowImages.length; i++){
      if (!browserImages.some((img)=>img.name === nowImages[i].name)){
        const currentTime = Date.now()
        nowImages[i]["url"] = URL.createObjectURL(nowImages[i])
        nowImages[i]['uploadName'] = currentTime + nowImages[i].name.replace(" ", "")
        nowImages[i]['index'] = currentTime
        await imgArray.push(nowImages[i])
        const nowImageName = nowImages[i].name.replace(" ", "")
        const storageRef = ref(storage, currentTime + nowImageName)
        await uploadBytes(storageRef, nowImages[i])
        .then((res)=>{
          console.log('uploaded')
          setFirebaseImages((prev)=>[...prev, res])
        })
      } 
    }
    const results = await Promise.all(imgArray)
    setBrowserImages(results)
  }

  const deleteImg = ((event) => {
    event.preventDefault()
    const deletedArray = [...browserImages]
    const index = event.target.attributes.idx.value

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
  })
  const input_content = ((event)=>{
    setContent(event.target.value)
  })
  const input_hashtags = ((event)=>{
    setHashtag(event.target.value)
  })
  const keyup_hashtag = (e)=>{
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.target.value = e.target.value.replace(' ','')
      e.target.value = e.target.value.replace('\n','')
    }
  }
  const addHashTag = useCallback((event) => {
    event.preventDefault()
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
  
  const postCreateSubmit = (event) =>{
    event.preventDefault();
    if (firebaseImages.length === 0 || content==='' || hashtagArr.length === 0 ) {
      alert('사진/내용을 추가해 주세요')
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
        // memberId : memberId,
      }
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json; charset=UTF-8"
      }
      axios.post(POST_CREATE_URL, newpost, headers)
      .then((res)=>{
        console.log(res)
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
  }
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
                  {/* 로딩스피너 필수일듯 */}
                  <div>
                    { browserImages&&browserImages.map((img)=>(
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
