import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom'
import './App.css';

import reducers from './modules/reducers';
import sagas from './modules/sagas';
import { getTrafficData } from './modules/actions';

import TrafficTable from './components/TrafficTable';

// Initialize the saga middleware
const sagaMiddleware = createSagaMiddleware();
// Create the redux store with saga middleware
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);
// Start the saga middleware
sagaMiddleware.run(sagas);

class App extends Component {
  componentDidMount() {
    // Load the JSON data for traffic information
    store.dispatch(getTrafficData());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              Insight Engine Challenge
            </header>
            <TrafficTable></TrafficTable>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
