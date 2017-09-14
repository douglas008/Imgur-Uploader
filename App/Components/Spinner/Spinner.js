import React from 'react';
import { View, ActivityIndicator, ViewPropTypes } from 'react-native';
import styles from './styles';
import { Colors } from '../../Themes';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  style: ViewPropTypes.style
};

const defaultProps = {
  size: 'large',
  color: Colors.greyDF,
  style: {}
};

const Spinner = props => (
  <View style={props.style || styles.container}>
    <ActivityIndicator
      size={props.size || 'large'}
      color={props.color || Colors.greyDF}
    />
  </View>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
