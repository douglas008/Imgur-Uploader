import React from 'react';
import {
  View,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { Colors } from '../../Themes';
// import { addComponentExample } from '../../Services/ExamplesRegistry';

// Note that this file is
// imported in DevScreens/ComponentExamplesScreen/ComponentImports,
// otherwise your component won't be compiled
// and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
// addComponentExample('Button', () => (
//   <Button text='Button' style={{ marginBottom: 20 }} />
// ));

const propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};

const defaultProps = {
  onPress: () => console.log('Button Pressed'),
  text: 'N/A',
  style: {},
  textStyle: { color: Colors.white }
};

class Button extends React.Component {
  /* eslint-disable no-useless-constructor */
  constructor (props) {
    super(props);
  }

  button () {
    return (
      <View style={[styles.button, this.props.style]}>
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.text}
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

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
