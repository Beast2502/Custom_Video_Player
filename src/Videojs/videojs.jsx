import React, { Component } from "react";
import "./videojs.css";
import videojs from "video.js";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import PlayIcon from "./utils/assets/play.png";
import PauseIcon from "./utils/assets/pause.png";

class VideoJSPlayerComponent extends Component {
  player;
  videoNode;
  videoJsOptions = {
    autoplay: true,
    muted: false,
    height: 400,
    width: 600,
    controls: false,
    sources: [
      {
        src: this.props.Source,
        type: this.props.SourceType,
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      videoBuffering: true,
      videoURL: this.props.Source,
      videoInitialized: false,
      isPlaying: false,
      isErrorOccurred: false,
      seeking: false,
      muted: true,
      playedPercentage: 0,
      playedSeconds: 0,
      remainingVideoPlay: 0,
      loadedPercentage: 0,
      totalDuration: 0,
      playbackRate: 1.0,
      loop: false,
    };
  }

  componentDidMount() {
    //Intersection observer
    let options = {
      rootMargin: "0px",
      threshold: [0.8],
    };

    const onVideoPress = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.play();
        } else {
          this.pause();
        }
      });
    };

    let observer = new IntersectionObserver(onVideoPress, options);
    observer.observe(this.videoNode);

    //Video Js implemetation

    this.player = videojs(this.videoNode, this.videoJsOptions, () => {
      if (this.player) {
        // Triggered
        console.log("onPlayerReady");

        this.player.on("play", (event) => {
          this.setState({
            isPlaying: true,
          });
        });
        this.player.on("pause", (event) => {
          this.setState({
            isPlaying: false,
          });
        });

        this.player.on("muted", (event) => {
          this.setState({
            muted: true,
          });
        });

        this.player.on("loadedmetadata", (event) => {
          this.setState({ totalDuration: this.player.duration() });
        });

        this.player.on("ended", (event) => {
          console.log("ended");
        });
        this.player.on("timeupdate", (event) => {
          this.setState({ playedSeconds: this.player.currentTime() });

          this.setState({ remainingVideoPlay: this.player.remainingTime() });
        });
      }
    });
  }

  //Mute Toggle
  isMute = () => {
    if (this.state.muted) {
      this.player.muted(true);
      this.setState({ muted: !this.state.muted });
    } else {
      this.player.muted(false);
      this.setState({ muted: !this.state.muted });
    }
  };

  //Play and Pause function and toggle

  play = () => {
    if (this.player) {
      this.player.play();
    }
  };

  pause = () => {
    if (this.player) {
      this.player.pause();
    }
  };

  togglePlay = () => {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  };

  //forwrd and backward functions

  forwardVideo = () => {
    if (this.player) {
      this.player.currentTime(this.player.currentTime() + 10);
    }
  };

  backwardVideo = () => {
    if (this.player) {
      this.player.currentTime(this.player.currentTime() - 10);
    }
  };

  jumpTo = (time) => {
    if (this.player) {
      this.player.currentTime(time);
    }
  };

  //SeekBar
  //   handleVideoProgres = (event) => {
  //     const manualChange = Number(event.target.value);
  //     videoElement.current.currentTime =
  //         (manualChange * videoElement.current.duration) / 100;

  //     setPlayerState({
  //         ...playerState,
  //         progress: manualChange,
  //     });
  // };

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
    this.setState({
      playedPercentage:
        (this.state.playedSeconds / this.state.totalDuration) * 100,
    });
  }

  secondsToHms = (secs) => {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = Math.floor(secs % 60);
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  render() {
    const {
      totalDuration,
      playedSeconds,
      remainingVideoPlay,
      isPlaying,
      muted,
      playedPercentage,
    } = this.state;

    return (
      <div className="">
        <div className="videoCard" data-vjs-player>
          <video
            id="video"
            ref={(node) => (this.videoNode = node)}
            className="videoCard__player "
            onClick={this.togglePlay}
          />
        </div>
        <hr />
        {this.props.Duration ? (
          <>
            <div>
              <div>Played Time: {this.secondsToHms(playedSeconds)}</div>
              <div>Total Time: {this.secondsToHms(totalDuration)}</div>
              <div>Remaining Time: {this.secondsToHms(remainingVideoPlay)}</div>
            </div>
          </>
        ) : (
          <></>
        )}

        <br />
        <div className="d-flex">
          {this.props.PlayPauseBtn ? (
            <img alt ="playIcon" src={isPlaying ? PauseIcon : PlayIcon } onClick={this.togglePlay} className="neoPlayPauseBtn"/>
            // <button className="btn btn-danger btn-sm" >
            //   {isPlaying ? "Pause" : "Play"}
            // </button>
          ) : (
            <></>
          )}
          &nbsp;
          {this.props.JumpTo ? (
            <>
              <button className="btn btn-danger btn-sm" onClick={this.jumpTo}>
                Play from 55th second
              </button>
            </>
          ) : (
            <></>
          )}
          &nbsp;
          {this.props.ForBackwardBtn ? (
            <>
              <button
                className="btn btn-danger btn-sm"
                onClick={this.forwardVideo}
              >
                Forward
              </button>
              &nbsp;
              <button
                className="btn btn-danger btn-sm"
                onClick={this.backwardVideo}
              >
                Backward
              </button>
            </>
          ) : (
            <></>
          )}
          &nbsp;
          {this.props.MuteBtn ? (
            <>
              <button className="btn btn-danger btn-sm" onClick={this.isMute}>
                {muted ? "Mute" : "Un-Mute"}
              </button>
            </>
          ) : (
            <></>
          )}
          &nbsp;
          {this.props.SeekBar ? (
            <>
              <input
                // ref={rangeRef}
                type="range"
                min="0"
                max={this.state.totalDuration}
                value={this.state.playedSeconds}
                onChange={(e) => this.jumpTo(e.target.value)}
            style={{background:"linear-gradient(to right, orange ${(parseInt(props.value)-props.min)*100/(props.max-props.min)}%, #ccc 0px` "}}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default VideoJSPlayerComponent;
