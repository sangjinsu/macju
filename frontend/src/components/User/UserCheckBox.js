
import { useState } from "react"
import { useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox"


import { useDispatch } from "react-redux";

const UserCheckBox = (props) =>{
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(props.checked)
  const handleChange = () =>{
    setChecked(!checked)
  }




  useEffect(()=>{
    if (checked) {
      dispatch({type:"addFlavorCheck", data:`${props.idx}`})
    } else {
      dispatch({type:"removeFlavorCheck",data : `${props.idx}`})
    }
  }, [checked])
  useEffect(()=>{
    if (checked) {
      dispatch({type:"addAromaCheck", data:`${props.idx}`})
    } else {
      dispatch({type:"removeAromaCheck",data : `${props.idx}`})
    }
  }, [checked])


  return (
    <>
    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label={props.label} />
    </>
  )
}
export default UserCheckBox;