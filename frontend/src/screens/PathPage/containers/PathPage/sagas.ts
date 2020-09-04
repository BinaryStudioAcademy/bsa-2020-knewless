import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as pathService from '@screens/PathPage/services/path.service';
import { fetchPathDataRoutine } from '@screens/PathPage/routines';
import { AnyAction } from 'redux';

function* getPathData({ payload }: AnyAction) {
  try {
    const response = yield call(pathService.getPathData, payload);
    yield put(fetchPathDataRoutine.success(response));
  } catch (error) {
    yield put(fetchPathDataRoutine.failure(error?.message || error));
  }
}

function* watchGetPathDataRequest() {
  yield takeEvery(fetchPathDataRoutine.TRIGGER, getPathData);
}

export default function* pathDataSagas() {
  yield all([
    watchGetPathDataRequest()
  ]);
}
