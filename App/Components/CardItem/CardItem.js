import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  containerStyle: ViewPropTypes.style
};

const defaultProps = {
  children: {},
  containerStyle: {}
};

const CardItem = props => (
  <View style={[styles.container, props.containerStyle]}>
    {props.children}
  </View>
);

CardItem.propTypes = propTypes;
CardItem.defaultProps = defaultProps;

export default CardItem;
