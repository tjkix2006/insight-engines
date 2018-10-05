import * as constants from './constants';
import { call, put, takeLatest } from 'redux-saga/effects'
import Api from '../utils/api';

// worker Saga: will be fired on GET_TRAFFIC_DATA actions
function* fetchTrafficData(action) {
   try {
      const results = yield call(Api.fetchTrafficData);
      yield put({type: constants.GET_TRAFFIC_DATA_SUCCESS, results});
   } catch (e) {
      yield put({type: constants.GET_TRAFFIC_DATA_FAILURE, message: e.message});
   }
}

function* trafficSaga() {
  yield takeLatest(constants.GET_TRAFFIC_DATA, fetchTrafficData);
}

export default trafficSaga;
