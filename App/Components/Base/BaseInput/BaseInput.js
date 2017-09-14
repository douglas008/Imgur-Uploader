import { Component } from 'react';
import { Animated, Text } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  style: PropTypes.style,
  inputStyle: PropTypes.style,
  labelStyle: PropTypes.style,
  isActive: PropTypes.bool,
  easing: PropTypes.func,
  animationDuration: PropTypes.number,
  editable: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func
};

const defaultProps = {
  label: '',
  value: '',
  defaultValue: '',
  style: {},
  inputStyle: {},
  labelStyle: {},
  isActive: false,
  easing: () => console.log('Not Implemented'),
  animationDuration: 300,
  editable: true,
  onBlur: () => console.log('Not Implemented'),
  onFocus: () => console.log('Not Implemented'),
  onChange: () => console.log('Not Implemented')
};

class BaseInput extends Component {
  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.focus = this.focus.bind(this);

    const value = props.value || props.defaultValue;

    this.state = {
      value,
      focusedAnim: new Animated.Value(value ? 1 : 0),
      width: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const newValue = nextProps.value;
    const hasValueProp = Object.prototype.hasOwnProperty.call(
      nextProps,
      'value'
    );
    if (hasValueProp && newValue !== this.state.value) {
      this.setState({
        value: newValue
      });

      // animate input if it's active state has changed with the new value
      // and input is not focused currently.
      const isFocused = this.refs.input.isFocused();
      if (!isFocused) {
        const isActive = Boolean(newValue);
        if (isActive !== this.isActive) {
          this.toggle(isActive);
        }
      }
    }
  }

  onLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width
    });
  }

  onChange(event) {
    this.setState({
      value: event.nativeEvent.text
    });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(event);
    }
  }

  onBlur(event) {
    if (!this.state.value) {
      this.toggle(false);
    }

    const onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(event);
    }
  }

  onFocus(event) {
    this.toggle(true);

    const onFocus = this.props.onFocus;
    if (onFocus) {
      onFocus(event);
    }
  }

  toggle(isActive) {
    this.props.isActive = isActive;
    Animated.timing(this.state.focusedAnim, {
      toValue: isActive ? 1 : 0,
      duration: this.props.animationDuration,
      easing: this.props.easing
    }).start();
  }

  // public methods
  inputRef() {
    return this.refs.input;
  }

  focus() {
    if (this.props.editable !== false) {
      this.inputRef().focus();
    }
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }
}

BaseInput.propTypes = propTypes;
BaseInput.defaultProps = defaultProps;

export default BaseInput;
