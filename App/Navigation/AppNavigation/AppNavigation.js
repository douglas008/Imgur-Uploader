import React from 'react';
import { StackNavigator } from 'react-navigation';
import Drawer from '../Drawer';
import styles from './styles';

// https://github.com/react-community/react-navigation/issues/335
// Link to how to deal with nested navigators

// Manifest of possible screens
const AppNavigation = StackNavigator(
  {
    // Passes this stack navigation down to child(Drawer) navigator
    // so that if we have logout this parent navigator can be called
    // to navigate back to the login screen with out the drawer being avaliable
    Drawer: { screen: ({ navigation }) => <Drawer screenProps={{ rootNavigation: navigation }} /> }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerStyle: styles.header,
      gesturesEnabled: false
    }
  }
);

export default AppNavigation;
