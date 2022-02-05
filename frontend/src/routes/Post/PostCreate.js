import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "../../firebase_config"
import '../../styles/PostCreate.css'
// import UploadImage from "components/UploadImage";


function PostCreate(s) {
  const memberid = 1  //test용 멤버아이디
  const beerid = s.location.state.beerid    // 작성하고있는 포스트의 맥주아이디

  // 사진 업로드용
  const [images, setImages] =useState([])
  // 사진 띄우는용 url
  const [imgUrls, setImgUrls] = useState([]);

  // 사진 선택 버튼 click
  const uploadBtn = async (event) =>  {
    // const formData = new FormData();
    const imgList = event.target.files  // 현재 선택한 사진들
    const newimglist = []
    for (let i=0; i<imgList.length; i += 1) {
      newimglist.push(imgList[i].name)    // 이미지 이름 list에 저장
      const nowImage = URL.createObjectURL(imgList[i])
      if (!imgUrls.includes(nowImage)) {
        setImgUrls((prevState) => [...prevState, nowImage])     // imgUrls = 보여주는 사진 url 리스트
      } 
    }
    setImages(newimglist)     // images = 업로드할 사진 리스트
  }
  // 사진 삭제 버튼 click
  const deleteImg = ((e)=>{
    e.preventDefault()
    const nowimgurl = e.target.attributes.imgurl.value
    URL.revokeObjectURL(nowimgurl);
    const newimgUrls = imgUrls.filter((item)=>item !== nowimgurl)
    setImgUrls(newimgUrls)
  })



  // console.log(images)
  // 이미지 업로드
  // const upLoadImg = async () =>{
  //   const storage = getStorage();
  //   images.map(async (img, index)=>{
  //     const storageRef = ref(storage, `imgs/${memberid}/${img.name}_${Date.now()}`);
  //     await uploadBytes(storageRef, img).then((snapshot) => {
  //       console.log('uploaded')
  //       })
  //   })
  // }

  // 포스트 내용
  const [content, setContent] = useState("")    
  // 포스트 해시태그 배열, 문자열
  const [hashtagArr, setHashtagArr] = useState([])
  const [hashtag, setHashtag] = useState("")

  const input_content = ((e)=>{
    e.preventDefault()
    setContent(e.target.value)
  })
  const input_hashtags = ((e)=>{
    e.preventDefault()
    setHashtag(e.target.value)
    // console.log(hashtag)
    // console.log(hashtagArr)
  })

  // 해시태그 추가
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
    // console.log(hashtagArr)
  })

  // post 전체 개수 가져오기
  const [postid, setPostid] = useState()
  
  useEffect(async ()=>{
    // http://i6c107.p.ssafy.io:8080/v1/post/new
    const data = await axios.get("http://i6c107.p.ssafy.io:8080/v1/post/new")
    // console.log([data][0].data.length)
    setPostid([data][0].data[0].postId+1)   
  }, [])

  // post 보내기
  const postcreateSubmit = ((e) => {
    e.preventDefault()
    const newpost = {
      // beerId : 2,
      beerId : beerid,
      content : content,
      memberId : memberid,
      paths : images,
      userHashTags : hashtagArr,
      // memberId : memberId,
    }
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': "application/json; charset=UTF-8"
    }
    // console.log(newpost)
    axios 
      .post("http://i6c107.p.ssafy.io:8080/v1/post", newpost, {headers})
      .then((res) => {
      console.log(res)
      // 이미지 firebase에 업로드
      const storage = getStorage()
      images.map(async (img, index)=>{
        // 이미지 경로 = imgs/{포스트id}/{이미지이름}
        const storageRef = ref(storage, `imgs/${postid}/${img.name}`)
        await uploadBytes(storageRef, img)
          .then((snapshot) => {
            console.log('uploaded')
          })
      })
    })
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

                <form onSubmit={postcreateSubmit}>

                  {/* 사진 선택하기 */}
                  <div>
                    <input type="file" multiple accept="image/*" onChange={uploadBtn} />
                  </div>

                  {/* 사진 띄우는곳 */}
                  <div>
                    { imgUrls&&imgUrls.map((img, index)=>(
                      <div className='image_container' key={index}>
                        <img alt="sample" src={img} className="postimage"/>
                        <div className="deleteImgBtn" onClick={deleteImg} imgurl={img}>X</div>
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
