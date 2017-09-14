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

const CardHeader = ({ headerText, headerTextStyle }) => (
  <View style={styles.centerContentContainer}>
    <Text style={[styles.headerText, headerTextStyle]}>{headerText}</Text>
  </View>
);

CardHeader.propTypes = propTypes;
CardHeader.defaultProps = defaultProps;

export default CardHeader;
