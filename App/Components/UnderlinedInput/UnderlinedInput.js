import React from 'react';
import { TextInput, Text, View, ViewPropTypes, Platform } from 'react-native';
import styles from './styles';
import { Colors } from '../../Themes';
import { addComponentExample } from '../../Services/ExamplesRegistry';
import PropTypes from 'prop-types';

// Note that this file (App/Components/UnderlinedInput) is
// imported in DevScreens/ComponentExamplesScreen/ComponentImports,
// otherwise your component won't be compiled
// and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Underlined Input', () => (
  <UnderlinedInput
    containerStyle={{ marginBottom: 20 }}
    textInputStyle={{ color: Colors.snow }}
  />
));

const propTypes = {
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  onChangeText: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  textInputStyle: Text.propTypes.style,
  selectionColor: PropTypes.string,
  underlineColor: PropTypes.string
};

const defaultProps = {
  value: '',
  secureTextEntry: false,
  placeholder: 'underlined input',
  autoCorrect: false,
  autoCapitalize: 'sentences',
  onChangeText: () => console.log('Text Changed'),
  containerStyle: {},
  textInputStyle: { color: Colors.inputText },
  selectionColor: Colors.accent,
  underlineColor: Colors.accent
};

const UnderlinedInput = props => (
  <View
    style={[
      Platform.OS === 'ios'
        ? [styles.iosContainer, { borderBottomColor: props.underlineColor }]
        : styles.androidContainer,
      props.containerStyle
    ]}
  >
    <TextInput
      secureTextEntry={props.secureTextEntry}
      placeholder={props.placeholder}
      placeholderTextColor={Colors.greyAE}
      autoCorrect={props.autoCorrect}
      autoCapitalize={props.autoCapitalize}
      // value={props.value}
      onChangeText={props.onChangeText}
      style={[styles.underlinedInput, props.textInputStyle]}
      underlineColorAndroid={props.underlineColor}
      selectionColor={props.selectionColor}
    />
  </View>
);

UnderlinedInput.propTypes = propTypes;
UnderlinedInput.defaultProps = defaultProps;

export default UnderlinedInput;
