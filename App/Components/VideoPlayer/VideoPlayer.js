// To stop react-native-video from blocking the UI when it loads do:
// Add this block to line 301 in
// node_modules/react-native-video/android/src/main/java/com/brentvatne/react/ReactVideoView.java
// try {
//   prepareAsync(this);
// } catch (Exception e) {
//   e.printStackTrace();
// }
import React from 'react';
import {
  TouchableOpacity,
  Slider,
  View,
  Text,
  Animated,
  Platform,
  Image
} from 'react-native';
import Video from 'react-native-video';
import Spinner from '../Spinner';
import CircleImageButton from '../CircleImageButton';
import styles from './styles';
import { Colors } from '../../Themes';
import PropTypes from 'prop-types';

// Image assets
const pauseIcon = require('../../Images/Icons/ic_pause.png');
const playIcon = require('../../Images/Icons/ic_play.png');
const backIcon = require('../../Images/Icons/ic_back.png');

const propTypes = {
  iconTint: PropTypes.string,
  iconBackgroundColor: PropTypes.string,
  sliderLeftColor: PropTypes.string,
  sliderRightColor: PropTypes.string,
  sourceUri: PropTypes.string,
  onBackPress: PropTypes.func
};

class VideoPlayer extends React.Component {
  static defaultProps = {
    iconTint: Colors.iconColor,
    iconBackgroundColor: Colors.whiteOpacity,
    fadeTime: 500,
    sliderLeftColor: Colors.iconColor,
    sliderRightColor: Colors.greyAE,
    sourceUri: 'https://s3-eu-west-1.amazonaws.com/wizard.hyve.co.za/assets/test/doug_movie_test.mp4',
    onBackPress: () => console.log('Video Back Button Pressed')
  };

  constructor (props) {
    console.log('Video player constructor');
    super(props);
    this.state = {
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
      isBuffering: true,
      sliderPosition: 0,
      fadeAnim: new Animated.Value(1)
    };
  }

  onLoad (data) {
    console.log('On load fired!');
    this.timeOutControls();
    this.setState({
      ...this.state,
      duration: data.duration,
      paused: false,
      isBuffering: false
    });
  }

  onProgress (data) {
    this.setState({ ...this.state, currentTime: data.currentTime });
  }

  onBuffer ({ isBuffering }: { isBuffering: boolean }) {
    console.log(isBuffering);
    this.setState({ ...this.state, isBuffering });
  }

  onError (data) {
    console.log(data);
  }

  getCurrentTimePercentage () {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

  displayIcon () {
    if (this.state.isBuffering) {
      return null;
    }
    if (this.state.paused) {
      return playIcon;
    } else if (!this.state.paused) {
      return pauseIcon;
    }
  }

  formatSeconds (seconds) {
    const pad = function (input) {
      return input < 10 ? `0${input}` : input;
    };
    return [
      pad(Math.floor(seconds % 3600 / 60)),
      pad(Math.floor(seconds % 60))
    ].join(':');
  }

  playPauseVideo () {
    if (!this.state.isBuffering) {
      if (this.state.paused) {
        this.timeOutControls();
        this.setState({
          ...this.state,
          paused: false
        });
      } else {
        this.setState({
          ...this.state,
          fadeAnim: new Animated.Value(1),
          paused: true
        });
      }
    }
  }

  sliderChanged (value) {
    if (value !== this.state.sliderPosition) {
      const newTime = value * this.state.duration;
      this.player.seek(newTime);
      this.setState({ ...this.state, currentTime: newTime });
    }
  }

  timeOutControls () {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: this.props.fadeTime
    }).start();
  }

  renderSpinner () {
    if (this.state.isBuffering) {
      return (
        <View style={{ position: 'absolute' }}>
          <Spinner
            color={this.props.iconTint}
            backgroundColor={this.props.iconBackgroundColor}
          />
        </View>
      );
    }
  }

  renderCircleImageButton () {
    if (!this.state.isBuffering) {
      return (
        <Animated.View style={{ opacity: this.state.fadeAnim }}>
          <CircleImageButton
            onPress={this.playPauseVideo.bind(this)}
            size={60}
            sizeRatio={0.8}
            imageTint={this.props.iconTint}
            buttonImage={this.displayIcon()}
            backgroundColor={this.props.iconBackgroundColor}
            borderColor={'transparent'}
          />
        </Animated.View>
      );
    }
    return null;
  }

  renderPlayPauseControls () {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {this.renderCircleImageButton()}
        {this.renderSpinner()}
      </View>
    );
  }

  renderSliderControls () {
    // Android's slider has opposite colors.
    let minTrackColor = this.props.sliderLeftColor;
    let maxTrackColor = this.props.sliderRightColor;
    if (Platform.OS === 'android') {
      minTrackColor = this.props.sliderRightColor;
      maxTrackColor = this.props.sliderLeftColor;
    }

    return (
      <Animated.View
        style={[
          styles.sliderContainer,
          {
            opacity: this.state.fadeAnim,
            backgroundColor: this.props.iconBackgroundColor
          }
        ]}
      >
        <Slider
          value={this.getCurrentTimePercentage()}
          style={styles.slider}
          onValueChange={value => this.sliderChanged(value)}
          minimumTrackTintColor={minTrackColor}
          maximumTrackTintColor={maxTrackColor}
        />
        <View style={styles.currentTime}>
          <Text style={styles.currentTimeText}>
            {this.formatSeconds(this.state.currentTime)}
          </Text>
        </View>

      </Animated.View>
    );
  }

  renderBackButton () {
    let padding = Platform.OS === 'ios' ? 10 : 0;
    return (
      <Animated.View
        style={[
          styles.topBar,
          { opacity: this.state.fadeAnim, paddingTop: padding }
        ]}
      >
        <TouchableOpacity onPress={() => this.props.onBackPress()}>
          <Image source={backIcon} style={styles.backImage} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={this.playPauseVideo.bind(this)}
        >
          <Video
            source={{
              uri: this.props.sourceUri
            }}
            ref={ref => {
              this.player = ref;
            }}
            style={styles.fullScreen}
            paused={this.state.paused}
            resizeMode='contain'
            onLoad={this.onLoad.bind(this)}
            onBuffer={this.onBuffer.bind(this)}
            onProgress={this.onProgress.bind(this)}
            onError={this.onError.bind(this)}
            repeat
          />
          {this.renderPlayPauseControls()}
        </TouchableOpacity>
        {this.renderSliderControls()}
        {this.renderBackButton()}
      </View>
    );
  }
}

VideoPlayer.propTypes = propTypes;

export default VideoPlayer;
