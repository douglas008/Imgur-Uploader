import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../Redux/Reducers';

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

class App extends Component {
  // Create our store
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;