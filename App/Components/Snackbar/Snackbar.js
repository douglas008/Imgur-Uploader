import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import {
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
  ViewPropTypes
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const propTypes = {
  containerStyle: ViewPropTypes.style,
  accentColor: PropTypes.string,
  messageTextColor: PropTypes.string,
  actionTextColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  timeout: PropTypes.number,
  actionText: PropTypes.string,
  messageText: PropTypes.string,
  visible: PropTypes.bool
};

const defaultProps = {
  containerStyle: {},
  accentColor: 'orange',
  messageTextColor: '#FFFFFF',
  actionTextColor: '#2DCFFF',
  backgroundColor: '#484848',
  timeout: 0,
  actionText: 'Lets Go!',
  messageText: 'Snackbar',
  visible: false
};

const easingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1)
};

const durationValues = {
  entry: 225,
  exit: 195
};

class Snackbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(0),
      hideDistance: 9999
    };
  }

  componentDidMount () {
    console.log('componentDidMoun snackbar');
    if (this.props.visible) {
      this.state.translateValue.setValue(1);
    } else {
      this.state.translateValue.setValue(0);
    }
  }

  componentWillReceiveProps (nextProps) {
    this.startSnackbarTimeout();
    this.animateSnackBar(nextProps);
  }

  componentWillUnmount () {
    TimerMixin.clearTimeout(this.timer);
  }

  animateSnackBar (nextProps) {
    if (nextProps.visible) {
      Animated.timing(this.state.translateValue, {
        duration: durationValues.entry,
        toValue: 1,
        easing: easingValues.entry
      }).start();
    } else if (!nextProps.visible && this.props.visible) {
      Animated.timing(this.state.translateValue, {
        duration: durationValues.exit,
        toValue: 0,
        easing: easingValues.exit
      }).start();
    }
  }

  startSnackbarTimeout () {
    // If timeout value is 0 the snackbar will persist
    if (this.props.timeout > 0) {
      // Clear previous timeouts
      if (this.timer) {
        TimerMixin.clearTimeout(this.timer);
      }
      this.timer = TimerMixin.setTimeout(() => {
        console.log('Timed out');
        this.props.visible = false;
        Animated.timing(this.state.translateValue, {
          duration: durationValues.exit,
          toValue: 0,
          easing: easingValues.exit
        }).start();
      }, this.props.timeout);
    }
  }

  render () {
    return (
      <Animated.View
        style={[
          styles.container,
          this.props.containerStyle,
          {
            backgroundColor: this.props.backgroundColor,
            bottom: this.state.translateValue.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.hideDistance * -1, 0]
            })
          }
        ]}
        onLayout={event => {
          this.setState({ hideDistance: event.nativeEvent.layout.height });
        }}
      >
        <Text
          style={[styles.messageText, { color: this.props.messageTextColor }]}
        >
          {this.props.messageText}
        </Text>
        {this.props.actionHandler &&
          this.props.actionText &&
          Platform.OS === 'android' &&
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={() => {
              TimerMixin.clearTimeout(this.timer);
              this.props.actionHandler();
            }}
          >
            <Text
              style={[styles.actionText, { color: this.props.actionTextColor }]}
            >
              {this.props.actionText.toUpperCase()}
            </Text>
          </TouchableNativeFeedback>}
        {this.props.actionHandler &&
          this.props.actionText &&
          Platform.OS === 'ios' &&
          <TouchableOpacity
            onPress={() => {
              TimerMixin.clearTimeout(this.timer);
              this.props.actionHandler();
            }}
          >
            <Text
              style={[styles.actionText, { color: this.props.actionTextColor }]}
            >
              {this.props.actionText.toUpperCase()}
            </Text>
          </TouchableOpacity>}
      </Animated.View>
    );
  }
}

Snackbar.propTypes = propTypes;
Snackbar.defaultProps = defaultProps;

export default Snackbar;
