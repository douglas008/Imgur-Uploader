import React from 'react';
import {
  View,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewPropTypes,
  Image,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { Colors } from '../../Themes';
import CircleImageButton from '../CircleImageButton';
import { addComponentExample } from '../../Services/ExamplesRegistry';

// Note that this file is
// imported in DevScreens/ComponentExamplesScreen/ComponentImports,
// otherwise your component won't be compiled
// and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Video Button', () => (
  <VideoButton iconTintColor={Colors.accent} />
));

const playIcon = require('../../Images/Icons/ic_play.png');
const placeholderImage = require('../../Images/placeholder_image.png');

const propTypes = {
  onPress: PropTypes.func,
  buttonStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  iconBackgroundColor: PropTypes.string,
  durationText: PropTypes.string,
  iconTintColor: PropTypes.string
};

const defaultProps = {
  onPress: () => console.log('Video Button Pressed'),
  buttonStyle: {},
  textStyle: { color: Colors.white },
  durationText: '1:08',
  iconBackgroundColor: Colors.whiteOpacity,
  iconTintColor: '#2DCFFF'
};

const { width } = Dimensions.get('window');

class VideoButton extends React.Component {
  /* eslint-disable no-useless-constructor */
  constructor (props) {
    super(props);
  }

  button () {
    return (
      <View style={[styles.button, this.props.buttonStyle]}>
        <Image
          style={[styles.image, this.props.imageStyle, { width: width - 70 }]}
          source={placeholderImage}
        />
        <View style={styles.centerCircleButton}>
          <CircleImageButton
            onPress={() => this.props.onPress()}
            size={60}
            borderColor='transparent'
            imageTint={this.props.iconTintColor}
            backgroundColor={this.props.iconBackgroundColor}
            buttonImage={playIcon}
            sizeRatio={0.7}
          />
        </View>
        <Text style={[styles.durationText, this.props.textStyle]}>
          {this.props.durationText}
        </Text>
      </View>
    );
  }

  renderButton () {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={() => this.props.onPress()}>
          {this.button()}
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        {this.button()}
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <View>
        {this.renderButton()}
      </View>
    );
  }
}

VideoButton.propTypes = propTypes;
VideoButton.defaultProps = defaultProps;

export default VideoButton;
