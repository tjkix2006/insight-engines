import * as constants from './constants';

export const searchIP = (IP) => ({
  type: constants.SEARCH_IP,
  IP,
});
