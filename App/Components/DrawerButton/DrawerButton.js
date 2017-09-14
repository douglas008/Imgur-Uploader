import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { addComponentExample } from '../../Services/ExamplesRegistry';
import styles from './styles';

// Note that this file is
// imported in DevScreens/ComponentExamplesScreen/ComponentImports,
// otherwise your component won't be compiled
// and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Drawer Button', () => (
  <DrawerButton
    text='Example left drawer button'
    onPress={() => console.log('Your drawers are showing')}
  />
));

const propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string
};

const defaultProps = {
  onPress: () => console.log('Drawer Button Press'),
  text: ''
};

class DrawerButton extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

DrawerButton.propTypes = propTypes;
DrawerButton.defaultProps = defaultProps;

export default DrawerButton;
