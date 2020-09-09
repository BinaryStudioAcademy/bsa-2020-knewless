import { all, put, takeEvery, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { connectWebsocketRoutine } from '@containers/WebsocketConnector/routines';
import { connectWebsocket } from '@containers/WebsocketConnector/service';

function* tryConnectToWebsocket() {
  try {
    const resp = yield call(connectWebsocket);
    yield put(connectWebsocketRoutine.success(resp));
  } catch (error) {
    yield put(connectWebsocketRoutine.failure());
    toastr.error('Failed to connect notifications');
  }
}

function* watchConnectToWebsocket() {
  yield takeEvery(connectWebsocketRoutine.TRIGGER, tryConnectToWebsocket);
}

export default function* websocketSagas() {
  yield all([
    watchConnectToWebsocket()
  ]);
}
