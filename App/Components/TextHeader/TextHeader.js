import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const propTypes = {
  headerText: PropTypes.string,
  headerTextStyle: Text.propTypes.style
};

const defaultProps = {
  headerText: 'N/A',
  headerTextStyle: {}
};

const TextHeader = props => (
  <View style={styles.centerContentContainer}>
    <Text style={[styles.headerText, props.headerTextStyle]}>
      {props.headerText}
    </Text>
  </View>
);

TextHeader.propTypes = propTypes;
TextHeader.defaultProps = defaultProps;

export default TextHeader;
