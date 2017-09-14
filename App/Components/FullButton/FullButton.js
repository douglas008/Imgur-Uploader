import React, { PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  containerStyle: PropTypes.object
};

const defaultProps = {
  onPress: () => console.log('Full Button Press'),
  text: 'Rounded Button',
  containerStyle: {}
};

class FullButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        style={[styles.button, this.props.containerStyle]}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>
          {this.props.text && this.props.text.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

FullButton.propTypes = propTypes;
FullButton.defaultProps = defaultProps;

export default FullButton;
