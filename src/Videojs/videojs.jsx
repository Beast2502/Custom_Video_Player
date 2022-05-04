import React, { Component } from "react";
import "./videojs.css";
import videojs from "video.js";

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
      videoBuffering: false,
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

  isMute = () => {
    if (this.state.muted) {
      this.player.muted(true);
      this.setState({ muted: !this.state.muted });
      console.log(this.state.muted, "isMute true");
    } else {
      this.player.muted(false);
      this.setState({ muted: !this.state.muted });
      console.log(this.state.muted, "isMute false");
    }
  };

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

  jumpTo = () => {
    if (this.player) {
      this.player.currentTime(55);
    }
  };

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
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
    } = this.state;

    return (
      <div className="customVideoPlayer">
        <div className="videoCard" data-vjs-player>
          <video
            id="video"
            ref={(node) => (this.videoNode = node)}
            className="videoCard__player "
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
            <button className="btn btn-danger btn-sm" onClick={this.togglePlay}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          ) : (
            <></>
          )}
          &nbsp;
          <button className="btn btn-danger btn-sm" onClick={this.jumpTo}>
            Play from 55th second
          </button>
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
        </div>
      </div>
    );
  }
}

export default VideoJSPlayerComponent;
