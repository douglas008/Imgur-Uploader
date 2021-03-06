import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
//import { connect } from 'react-redux';
import Navigation from '../../Navigation/AppNavigation';

// Styles
import styles from './styles';

class RootContainer extends Component {
  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <Navigation />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
// const mapDispatchToProps = dispatch => ({
//   startup: () => dispatch(StartupActions.startup())
// });

// export default connect(null, mapDispatchToProps)(RootContainer);
export default RootContainer;