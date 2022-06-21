import React, { useEffect, useState } from "react";
import "./slider.css";
import "./thumb.css";

function SeekBar({onChange,percentage}) {
  const [position,setPostion]= useState(0);
  useEffect(()=>{
    setPostion(percentage);
  },[percentage])
  return (
    <>
      <div className="slider-container">
        <div className="progress-bar"></div>
        <div className="thumb" style={{left:`${position}`}}></div>
        <input type="range" className="range" />
      </div>
    </>
  );
}

export default SeekBar;
