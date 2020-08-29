import { all, call, put, takeEvery } from 'redux-saga/effects';
import  * as pathService from '@screens/PathPage/services/path.service';
import { fetchPathDataRoutine } from '@screens/PathPage/routines';
import { AnyAction } from 'redux';
import { history } from '@helpers/history.helper';

function* getPathData({ payload }: AnyAction) {
  try {
    const response = yield call(pathService.getPathData, payload);
    yield put(fetchPathDataRoutine.success(response));
  } catch (error) {
    history.push('/');
    yield put(fetchPathDataRoutine.failure(error?.message));
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
