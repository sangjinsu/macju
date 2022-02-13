const SlickPrevArrow = (props) =>{
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", borderRadius: "10px", justifyContent:"center" }}
      onClick={onClick}
    />
  );
}
export default SlickPrevArrow;