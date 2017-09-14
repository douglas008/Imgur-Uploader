import React from 'react';
import {
  View,
  Image,
  Slider,
  Text,
  ViewPropTypes,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import TimerMixin from 'react-timer-mixin';
import CircleImageButton from '../CircleImageButton';
import Spinner from '../Spinner';
import styles from './styles';
import { Colors, Images } from '../../Themes/';
import { addComponentExample } from '../../Services/ExamplesRegistry';

// Note that this file is
// imported in DevScreens/ComponentExamplesScreen/ComponentImports,
// otherwise your component won't be compiled
// and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Audio Bar', () => (
  <AudioBar
    basePath='https://s3-eu-west-1.amazonaws.com/wizard.hyve.co.za/assets/test'
    fileName='doug_test.mp3'
    barContainerStyle={{
      borderRadius: 5,
      backgroundColor: Colors.primaryLight,
      marginBottom: 20
    }}
    leftButtonStyle={{ backgroundColor: Colors.primaryLight }}
  />
));

const propTypes = {
  leftButtonContainerStyle: ViewPropTypes.style,
  leftButtonStyle: ViewPropTypes.style,
  leftIconStyle: Image.propTypes.style,
  rightIconStyle: Image.propTypes.style,
  barContainerStyle: ViewPropTypes.style,
  basePath: PropTypes.string,
  fileName: PropTypes.string,
  leftTrackTint: PropTypes.string,
  rightTrackTint: PropTypes.string,
  spinnerColor: PropTypes.string
};

const defaultProps = {
  leftButtonContainerStyle: {},
  leftButtonStyle: {},
  leftIconStyle: {},
  rightIconStyle: {},
  barContainerStyle: {},
  basePath: '',
  fileName: '',
  leftTrackTint: Colors.accent,
  rightTrackTint: Colors.greyDF,
  spinnerColor: Colors.accent
};

// TODO: if file is still being downloaded warn user if they try leave the screen
// if they still leave cancel the download and delete the local file

class AudioBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isPlaying: false,
      duration: 0,
      isLoaded: false,
      loading: false,
      currentTimeInSeconds: 0,
      sound: null,
      sliderPosition: 0
    };
  }

  componentDidMount () {
    console.log('componentDidMount AudioBar');
  }

  componentWillUnmount () {
    if (this.state.sound) {
      this.pauseSound();
      this.state.sound.release();
    }
  }

  timeTicker () {
    this.timer = TimerMixin.setTimeout(() => {
      this.updateSlider();
      this.timeTicker();
    }, 1000);
  }

  updateSlider () {
    if (this.state.sound) {
      this.state.sound.getCurrentTime(seconds => {
        console.log(`current time ${seconds} seconds`);
        const percentComplete = seconds / this.state.duration;
        console.log(`% complete ${percentComplete}`);
        this.setState({
          ...this.state,
          sliderPosition: percentComplete,
          currentTimeInSeconds: seconds
        });
      });
    }
  }

  formatSeconds (seconds) {
    const pad = function (input) {
      return input < 10 ? `0${input}` : input;
    };
    return [
      pad(Math.floor(Math.floor(seconds % 3600) / 60)),
      pad(Math.floor(seconds % 60))
    ].join(':');
  }

  downloadFile () {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${this.props.fileName}`;
    RNFS.exists(downloadDest)
      .then(exists => {
        console.log(`File exists: ${exists}`);
        if (exists) {
          console.log(`Loading audio file: ${downloadDest}`);
          this.loadSound(downloadDest);
        } else {
          const url = `${this.props.basePath}/${this.props.fileName}`;
          console.log(`Downloading audio file: ${url}`);
          this.setState({ ...this.state, loading: true });
          const download = RNFS.downloadFile({
            fromUrl: url,
            toFile: downloadDest
          });
          download.promise
            .then(res => {
              console.log(`Download Complete: ${JSON.stringify(res)}`);
              this.loadSound(downloadDest);
            })
            .catch(err => {
              // TODO: Download failed: Handle failed state
              console.log(err);
            });
        }
      })
      .catch(err => {
        // TODO: Loading failed: Handle failed state
        console.log(err);
      });
  }

  loadSound (filePath) {
    const newSound = new Sound(filePath, '', error => {
      if (error) {
        console.log('error', error);
        return;
      }
      this.setState({
        ...this.state,
        isPlaying: false,
        isLoaded: true,
        loading: false,
        duration: newSound.getDuration(),
        sound: newSound
      });
      console.log('duration', newSound.getDuration());
      console.log('new sound set', this.state.sound);
    });
  }

  playSound () {
    if (this.state.isLoaded) {
      if (!this.state.isPlaying) {
        this.state.sound.play(() => {
          // When song has finished do this
          if (this.state.sound) {
            TimerMixin.clearTimeout(this.timer);
            this.setState({ ...this.state, isPlaying: false });
          }
        });
        this.setState({ isPlaying: true });
        this.timeTicker();
      }
    } else {
      this.downloadFile();
      this.setState({ ...this.state, loading: true });
    }
  }

  pauseSound () {
    if (this.state.sound) {
      this.state.sound.pause();
      TimerMixin.clearTimeout(this.timer);
      this.setState({
        ...this.state,
        isPlaying: false
      });
    }
  }

  sliderChanged (value) {
    if (value !== this.state.sliderPosition) {
      if (this.state.sound) {
        const newTime = value * this.state.duration;
        this.state.sound.setCurrentTime(newTime);
        this.setState({ ...this.state, currentTimeInSeconds: newTime });
      }
    }
  }

  renderMediaButton (buttonImage, buttonOnPress) {
    return (
      <CircleImageButton
        imageStyle={this.props.leftIconStyle}
        onPress={buttonOnPress.bind(this)}
        buttonImage={buttonImage}
        buttonStyle={this.props.leftButtonStyle}
        size={40}
        sizeRatio={0.8}
        borderColor={Colors.iconColor}
        imageTint={Colors.accent}
        backgroundColor={Colors.appBackgroundColor}
      />
    );
  }

  renderMediaControls () {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner size='large' color={this.props.spinnerColor} />
        </View>
      );
    }

    if (!this.state.isLoaded) {
      return this.renderMediaButton(Images.downloadIcon, this.downloadFile);
    }

    if (this.state.isPlaying) {
      return this.renderMediaButton(Images.pauseIcon, this.pauseSound);
    }

    return this.renderMediaButton(Images.playIcon, this.playSound);
  }

  renderSlider () {
    // Android's slider has opposite colors.
    let minTrackColor = this.props.leftTrackTint;
    let maxTrackColor = this.props.rightTrackTint;
    if (Platform.OS === 'android') {
      minTrackColor = this.props.rightTrackTint;
      maxTrackColor = this.props.leftTrackTint;
    }
    return (
      <Slider
        value={this.state.sliderPosition}
        style={styles.slider}
        minimumTrackTintColor={minTrackColor}
        maximumTrackTintColor={maxTrackColor}
        onValueChange={value => this.sliderChanged(value)}
      />
    );
  }

  render () {
    return (
      <View style={[styles.container, this.props.barContainerStyle]}>
        <View style={styles.controlsContainer}>
          <View>
            {this.renderMediaControls()}
          </View>
          {this.renderSlider()}
          <View>
            <Image
              style={[styles.rightIcon, this.props.rightIconStyle]}
              source={Images.micIcon}
            />
          </View>
        </View>
        <Text
          style={[
            styles.timeText,
            Platform.OS === 'ios' ? { marginLeft: 50 } : { marginLeft: 54 }
          ]}
        >
          {this.formatSeconds(this.state.currentTimeInSeconds)}
        </Text>
      </View>
    );
  }
}

AudioBar.propTypes = propTypes;
AudioBar.defaultProps = defaultProps;

export default AudioBar;
