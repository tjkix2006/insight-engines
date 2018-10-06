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
      const traffic = [];
      action.results.data.forEach(data => {
        const result = data.result;
        traffic.push({
          ip: result['All_Traffic.dest'],
          other_ip: result['All_Traffic.src'],
          direction: 'in',
          bytes: result.sum_bytes,
        });
        traffic.push({
          ip: result['All_Traffic.src'],
          other_ip: result['All_Traffic.dest'],
          direction: 'out',
          bytes: result.sum_bytes,
        });
      });

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
