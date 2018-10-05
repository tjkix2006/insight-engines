import * as constants from './constants';

const initialState = {
  loading: false,
  message: null,
  traffic: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_TRAFFIC_DATA:
      return {
        ...state,
        message: initialState.message,
        loading: true,
      }
    case constants.GET_TRAFFIC_DATA_SUCCESS:
      // Preprocess traffic results
      const traffic = action.results.data.map(result => result.result);

      return {
        ...initialState,
        traffic,
      }
    case constants.GET_TRAFFIC_DATA_FAILURE:
      return {
        ...initialState,
        message: action.message,
      }
    default:
      return state;
  }
};
