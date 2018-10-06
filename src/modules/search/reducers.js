import * as constants from './constants';

const initialState = {
  direction: 'All_Traffic.src',
  query: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SEARCH_IP:
      return {
        ...state,
        query: action.IP,
      }
    default:
      return state;
  }
};
