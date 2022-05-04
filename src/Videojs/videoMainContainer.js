import React from "react";
import VideoJSPlayerComponent from "./videojs";

function videoMainComponent() {
  return <>
  <VideoJSPlayerComponent
   AutoPlay = {true}
   PlayPauseBtn = {true}
   MuteBtn ={true}
   ForBackwardBtn = {true}
   Source = {"https://stream.mux.com/aHkbArPayVkQfGFx31Iophh8lC1rB9v902fKJzVI7jCo.m3u8"}
   SourceType = {"application/x-mpegURL"}
   SeekBar = {true}
   Duration = {false}
   />
  </>;
}


export default videoMainComponent;