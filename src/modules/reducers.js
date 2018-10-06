import { combineReducers } from 'redux';
import search from './search/reducers';
import trafficData from './trafficData/reducers';

export default combineReducers({
  search,
  trafficData,
});
