import React, { useState } from "react";
import VideoJSPlayerComponent from "./videojs";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

function videoMainComponent() {

//   const URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4";
//  const TYPE = "video/mp4"
  
  //M3U8 type
  const URL = "https://stream.mux.com/aHkbArPayVkQfGFx31Iophh8lC1rB9v902fKJzVI7jCo.m3u8"
  const TYPE = "application/x-mpegURL"

  return (
    <>
      <VideoJSPlayerComponent
        AutoPlay={true}
        PlayPauseBtn={true}
        MuteBtn={true}
        ForBackwardBtn={true}
        Source={URL}
        SourceType= {TYPE}
        SeekBar={true}
        Duration={true}
        JumpTo = {true}
      />
   
      
    </>
  );
}

export default videoMainComponent;
