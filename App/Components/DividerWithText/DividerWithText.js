import React from 'react';
import { Text, View, ViewPropTypes } from 'react-native';
import styles from './styles';

const propTypes = {
  containerStyle: ViewPropTypes.style,
  dividerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};

const defaultProps = {
  containerStyle: {},
  dividerStyle: {},
  textStyle: {}
};

const DividerWithText = props => (
  <View style={[styles.container, props.containerStyle]}>
    <View style={[styles.divider, props.dividerStyle]} />
    <Text style={[styles.text, props.textStyle]}>
      {'New'}
    </Text>
    <View style={[styles.divider, props.dividerStyle]} />
  </View>
);

DividerWithText.propTypes = propTypes;
DividerWithText.defaultProps = defaultProps;

export default DividerWithText;
