import axios from "axios";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

const UploadImage = () => {
  const [prevImgs, setPrevImgs] = useState([]);
  const [img, setImg] = useState(null);
  const onChange = async (event) =>  {
    if (event.target.files[0]){
      setPrevImgs([...prevImgs, URL.createObjectURL(event.target.files[0])])
      setImg(event.target.files[0])
    }
    
  }
  
  console.log(img)
  //허용 후 업로드 시 여러장 추가하는 기능 구현 필요함.
  const upLoadImg = async () =>{
    const storage = getStorage();
    const storageRef = ref(storage, `imgs/${img.name}`);
    await uploadBytes(storageRef, img).then((snapshot) => {
      console.log('uploaded')
    })
    
    //서버와 통신
    // const formData = new FormData();
    // axios.post('url', formData)
    //   .then(res=>{
    //     console.log('ㅅㅅ')
    //   })
    //   .catch(err =>{
    //     console.log(err)
    //   })
  }
  return (
    <>
    <input type="file" multiple accept="image/*" onChange={onChange} />
    <div>{prevImgs&&prevImgs.map((img, index)=>(<img key={index} alt="sample" src={img} width={300} style={{margin:"auto"}} />))}</div>
    <button onClick={upLoadImg}>업로드</button>
    </>
  )
}



export default UploadImage;