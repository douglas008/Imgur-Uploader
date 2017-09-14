import React, { PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.string,
  navigator: PropTypes.object
};

const defaultProps = {
  onPress: () => console.log('Rounded Button Press'),
  text: 'Rounded Button',
  children: '',
  navigator: {}
};

class RoundedButton extends React.Component {
  getText () {
    const buttonText = this.props.text || this.props.children || '';
    return buttonText.toUpperCase();
  }

  render () {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableOpacity>
    );
  }
}

RoundedButton.propTypes = propTypes;
RoundedButton.defaultProps = defaultProps;

export default RoundedButton;
