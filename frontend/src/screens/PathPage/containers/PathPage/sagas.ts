import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchPathDataRoutine } from '@screens/PathPage/routines';
import { AnyAction } from 'redux';

function* getPathData({ payload }: AnyAction) {
  try {
    yield put(fetchPathDataRoutine.success('SUCCESS'));
  } catch (error) {
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
