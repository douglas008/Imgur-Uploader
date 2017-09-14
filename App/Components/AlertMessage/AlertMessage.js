import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.object,
  show: PropTypes.bool
};

const defaultProps = {
  title: '',
  icon: '',
  style: {},
  show: true
};

class AlertMessage extends React.Component {
  render () {
    if (this.props.show) {
      const { title } = this.props;
      return (
        <View style={[styles.container, this.props.style]}>
          <View style={styles.contentContainer}>
            <Text allowFontScaling={false} style={styles.message}>
              {title && title.toUpperCase()}
            </Text>
          </View>
        </View>
      );
    }
    // Return null if "show" is false
    return null;
  }
}

AlertMessage.propTypes = propTypes;
AlertMessage.defaultProps = defaultProps;

export default AlertMessage;
