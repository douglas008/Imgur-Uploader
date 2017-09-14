import React from 'react';
import { TextInput, View, Text, ViewPropTypes } from 'react-native';
import styles from './styles';
import { Colors } from '../../Themes';
import { addComponentExample } from '../../Services/ExamplesRegistry';
import PropTypes from 'prop-types';

// Note that this file is
// imported in DevScreens/ComponentExamplesScreen/ComponentImports,
// otherwise your component won't be compiled
// and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Simple Input', () => (
  <Input
    labelStyle={{ color: Colors.accent }}
    textInputStyle={{ color: Colors.snow }}
  />
));

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  onChangeText: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  textInputStyle: Text.propTypes.style,
  selectionColor: PropTypes.string
};

const defaultProps = {
  label: 'label',
  value: '',
  secureTextEntry: false,
  placeholder: 'input',
  autoCorrect: false,
  autoCapitalize: 'sentences',
  onChangeText: () => console.log('Text Changed'),
  containerStyle: {},
  labelStyle: {},
  textInputStyle: { color: Colors.inputText },
  selectionColor: Colors.accent
};

const Input = props => (
  <View style={[styles.container, props.containerStyle]}>
    <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    <TextInput
      secureTextEntry={props.secureTextEntry}
      placeholder={props.placeholder}
      placeholderTextColor={Colors.greyAE}
      autoCorrect={props.autoCorrect}
      autoCapitalize={props.autoCapitalize}
      // value={props.value}
      onChangeText={props.onChangeText}
      style={[styles.input, props.textInputStyle]}
      selectionColor={props.selectionColor}
    />
  </View>
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
