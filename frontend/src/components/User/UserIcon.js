

const UserIcon = (props) =>{
  const grade = props.grade
  
  return (
    <>
    {
      (()=>{
        if (0 <= grade && grade < 50) return <img src="/img/icons/beer-1.png" alt="" style={{maxWidth:150, maxHeight:150}}></img>
        if (50 <= grade && grade < 300) return <img src="/img/icons/beer-2.png" alt="" style={{maxWidth:150, maxHeight:150}}></img>
        if (300 <= grade && grade < 800) return <img src="/img/icons/beer-3.png" alt="" style={{maxWidth:150, maxHeight:150}}></img>
        if (800 <= grade && grade < 2000) return <img src="/img/icons/beer-bottle-1.png" alt="" style={{maxWidth:150, maxHeight:150}}></img>
        if (2000 <= grade && grade < 5000) return <img src="/img/icons/beer-can.png" alt="" style={{maxWidth:150, maxHeight:150}}></img>
      })() 
    }
 
 
    </>
  )
}
export default UserIcon
