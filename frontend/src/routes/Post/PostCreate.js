import { useEffect, useState } from "react";
import '../../styles/PostCreate.css'
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "../../firebase_config"

function PostCreate() {
  const [imgs, setImgs] = useState([]);
  
  const onChange = async (event) =>  {
    const formData = new FormData();
    const imgList = event.target.files
    let newList = [...imgs]
    for (let i=0; i<imgList.length; i += 1) {
      const nowImage = URL.createObjectURL(imgList[i])
      setImgs((prevState) => [...prevState, nowImage])  
    }
  }
  const upLoadImg = async () =>{
    const storage = getStorage();
    imgs.map(async (img, index)=>{
      const storageRef = ref(storage, `imgs/${img.name}`);
      await uploadBytes(storageRef, img).then((snapshot) => {
      console.log('uploaded')
    })
    })
    }
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
                <form action="/beer/1">

                  {/* 사진 선택하기 */}
                  <div>
                    <input type="file" multiple accept="image/*" onChange={onChange} />
                  </div>

                  {/* 사진 띄우는곳 */}
                  <div>
                    <div className='image_container'>
                      { imgs&&imgs.map((img, index)=>(
                        <img key={index} alt="sample" src={img}/>)
                      )}
                    </div>
                  </div>
                  <hr/>

                  {/* 입력창 */}
                  <div className='input_postcreate'>
                    <textarea 
                      className="postcreate_textarea"
                      maxLength="2200"
                      required
                      placeholder="문구 입력..."
                      rows="5"
                      // cols='50'
                    ></textarea>
                    <br/>
                    <textarea 
                      className="postcreate_textarea"
                      required
                      placeholder="해시태그 입력..."
                      rows="1"
                      // cols='50'
                    ></textarea>
                    <br/>
                  </div>

                  {/* 작성완료 버튼 */}
                  <div>
                    <button type="submit" onClick={upLoadImg}> 작성 완료</button>
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
