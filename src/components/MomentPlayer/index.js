import React, {Component} from "react";
import classNames from "classnames";
import Wavesurfer from "react-wavesurfer";
import "./index.scss";
import {throttle} from "lodash";

export function wrapAudioPlayerElements(child) {
  const PlayButtonName = PlayButton.name;
  const WavesurferName = Wavesurfer.name;
  const height = "128px";
  const styles = {
    [PlayButtonName]: {
      position: "absolute",
      width: height,
      height: height,
      padding: 5
    },
    [WavesurferName]: {
      marginLeft: height
    }
  };
  return (<div style={styles[child.type.name]}>
    {child}
  </div>);
}

export function AudioPlayer({children}) {
  const containerStyles = {
    position: "relative"
  };
  return (<div style={containerStyles}>
    {React.Children.map(children, wrapAudioPlayerElements)}
  </div>);
}

export function PlayButton({isPlaying, play, pause}){
  const classes = classNames(
    "glyphicon",
    {"glyphicon-pause": isPlaying},
    {"glyphicon-play": !isPlaying}
  );
  const clickFunction = (isPlaying) ? pause : play;
  const iconStyles = {
    fontSize: "4em"
  };
  return (
    <div style={{color: "#000"}}
         className="playButtonContainer"
         onClick={clickFunction}>
      <i testRef="playIcon"
         style={iconStyles}
         className={classes} />
    </div>
  );
}

const onPositionChange = throttle(function (loadAudio, e) {
  const currentTime = e.originalArgs[0];
  loadAudio({
    time: currentTime
  });
}, 300, {trailing: false});

function setPlaying(loadAudio, playing) {
  loadAudio({
    playing
  });
}

export default class MomentPlayer extends Component {

  render() {
    const {
      url,
      playing,
      time,
      loadAudio,
      onEnd,
      autoplay,
      title,
      titleEl,
      volume
    } = this.props;
    const surferOptions = {
      normalize: true
    };

    return (<div className="moment-player-panel">
      {titleEl ? titleEl(title) : <h1 className="text-center">
        Now Playing: {title}
      </h1>}
      <AudioPlayer>
        <PlayButton
          isPlaying={playing}
          play={setPlaying.bind(this, loadAudio, true)}
          pause={setPlaying.bind(this, loadAudio, false)} />
        <Wavesurfer
          audioFile={url}
          volume={volume}
          pos={time}
          onPosChange={onPositionChange.bind(this, loadAudio)}
          playing={playing}
          options={surferOptions}
          onFinish={onEnd}
          onReady={function () {
            if (autoplay) {
              setPlaying(loadAudio, true);
            }
          }}
        />
      </AudioPlayer>
    </div>);
  }
}
