import React from 'react';
import { Image, View, TouchableOpacity, ViewPropTypes } from 'react-native';
import styles from './styles';
import { Images, Colors } from '../../Themes';
import { addComponentExample } from '../../Services/ExamplesRegistry';
import PropTypes from 'prop-types';

// Note that this file is
// imported in DevScreens/ComponentExamplesScreen/ComponentImports,
// otherwise your component won't be compiled
// and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Circle Image Button', () => (
  <CircleImageButton
    buttonImage={Images.hyveLogo}
    size={120}
    sizeRatio={0.8}
    borderColor={Colors.iconColor}
    imageTint={Colors.accent}
    backgroundColor={Colors.appBackgroundColor}
  />
));

const propTypes = {
  onPress: PropTypes.func,
  buttonImage: PropTypes.any,
  buttonImageUrl: PropTypes.any,
  containerStyle: ViewPropTypes.style,
  buttonStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  size: PropTypes.number,
  borderColor: PropTypes.string,
  imageTint: PropTypes.string,
  backgroundColor: PropTypes.string,
  sizeRatio: PropTypes.number
};

const defaultProps = {
  onPress: () => console.log('Button Pressed'),
  buttonImage: null,
  buttonImageUrl: null,
  containerStyle: {},
  buttonStyle: {},
  imageStyle: {},
  size: null,
  borderColor: null,
  imageTint: null,
  backgroundColor: null,
  sizeRatio: 0.5
};

class CircleImageButton extends React.Component {
  /* eslint-disable no-useless-constructor */
  constructor (props) {
    super(props);
  }

  button () {
    return (
      <View style={[styles.container]}>
        <Image
          source={
            this.props.buttonImageUrl !== null &&
              this.props.buttonImageUrl !== ''
              ? {
                uri: this.props.buttonImageUrl
              }
              : this.props.buttonImage
          }
          style={[
            styles.image,
            {
              tintColor: this.props.imageTint,
              height: this.props.size * this.props.sizeRatio,
              width: this.props.size * this.props.sizeRatio,
              borderRadius: this.props.size * this.props.sizeRatio / 2
            },
            this.props.imageStyle
          ]}
        />
      </View>
    );
  }

  renderCircleImageButton () {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[
          styles.button,
          {
            height: this.props.size,
            width: this.props.size,
            borderRadius: this.props.size * 0.5, // size*0.5 makes a perfect circle
            borderColor: this.props.borderColor,
            backgroundColor: this.props.backgroundColor
          },
          this.props.buttonStyle
        ]}
      >
        {this.button()}
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {this.renderCircleImageButton()}
      </View>
    );
  }
}

CircleImageButton.propTypes = propTypes;
CircleImageButton.defaultProps = defaultProps;

export default CircleImageButton;
