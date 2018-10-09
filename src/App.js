import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { 
  applyMiddleware, 
  combineReducers, 
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Route } from "react-router";
import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from "react-router-redux";
import './App.css';

import reducers from './modules/reducers';
import sagas from './modules/trafficData/sagas';
import { getTrafficData } from './modules/trafficData/actions';

import Search from './components/Search';
import TrafficTable from './components/TrafficTable';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const routeMiddleware = routerMiddleware(history);
// Initialize the saga middleware
const sagaMiddleware = createSagaMiddleware();
// Create the redux store with saga middleware
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  applyMiddleware(sagaMiddleware, routeMiddleware),
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
        <ConnectedRouter history={history}>
          <div>
            <Route path="/" component={() =>
              <div className="App">
                <header className="App-header">
                  Insight Engine Challenge
                </header>
                <Search></Search>
                <TrafficTable></TrafficTable>
              </div>
            }>
            </Route>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
