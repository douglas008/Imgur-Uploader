import React from 'react';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
  Text
} from 'react-native';
import { Colors } from '../../Themes';
import styles from './styles';
import BaseInput from '../Base/BaseInput';
import PropTypes from 'prop-types';


const propTypes = {
  textInputHeight: PropTypes.number,
  textInputStyle: Text.propTypes.style,
  labelHeight: PropTypes.number,
  label: PropTypes.string,
  labelStyle: Text.propTypes.style,
  containerStyle: ViewPropTypes.style,
  underlineStyle: ViewPropTypes.style,
  padding: PropTypes.number,
  animationDuration: PropTypes.number,
  selectionColor: PropTypes.string,
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  onChangeText: PropTypes.func
};

const defaultProps = {
  textInputHeight: 48,
  textInputStyle: { color: Colors.snow },
  labelHeight: 24,
  label: 'label',
  labelStyle: { color: Colors.greyAE },
  containerStyle: {},
  underlineStyle: {},
  padding: 16,
  animationDuration: 300,
  selectionColor: Colors.accent,
  value: '',
  secureTextEntry: false,
  autoCorrect: false,
  autoCapitalize: 'sentences',
  onChangeText: () => console.log('Text Changed')
};

class FloatingLabelInput extends BaseInput {
  /* eslint-disable no-useless-constructor */
  constructor (props) {
    super(props);
  }

  render () {
    const { width, focusedAnim, value } = this.state;
    return (
      <View
        style={[
          styles.container,
          this.props.containerStyle,
          {
            height: this.props.textInputHeight + this.props.padding
          }
        ]}
        onLayout={this.onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, this.props.labelHeight + this.props.padding]
              })
            }}
          >
            <Animated.Text
              style={[
                styles.label,
                this.props.labelStyle,
                {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 12]
                  })
                }
              ]}
            >
              {this.props.label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref='input'
          {...this.props}
          style={[
            styles.textInput,
            this.props.textInputStyle,
            {
              width,
              height: this.props.textInputHeight + this.props.padding
            }
          ]}
          value={value}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          onChange={this.onChange}
          underlineColorAndroid={'transparent'}
          selectionColor={this.props.selectionColor}
        />
        {/* bottom border */}
        <Animated.View
          style={[
            styles.underline,
            this.props.underlineStyle,
            {
              width: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width]
              })
            }
          ]}
        />
      </View>
    );
  }
}

FloatingLabelInput.propTypes = propTypes;
FloatingLabelInput.defaultProps = defaultProps;

export default FloatingLabelInput;
