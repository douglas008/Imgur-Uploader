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

const Card = props => (
  <View style={[styles.container, props.containerStyle]}>
    {props.children}
  </View>
);

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
