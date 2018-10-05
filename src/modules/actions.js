import * as constants from './constants';

export const getTrafficData = () => ({
  type: constants.GET_TRAFFIC_DATA,
});

export const getTrafficDataSuccess = (results) => ({
  type: constants.GET_TRAFFIC_DATA_SUCCESS,
  results,
});

export const getTrafficDataFailure = (message) => ({
  type: constants.GET_TRAFFIC_DATA_FAILURE,
  message,
});
