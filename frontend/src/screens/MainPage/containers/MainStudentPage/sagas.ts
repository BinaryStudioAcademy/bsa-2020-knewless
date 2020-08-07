import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as mainPageService from 'screens/MainPage/services/main.page.service';
import { fetchDataRoutine } from '../../routines';

function* getData() {
  try {
    const response = yield call(mainPageService.getData);
    yield put(fetchDataRoutine.success(response));
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
  }
}

function* watchGetData() {
  yield takeEvery(fetchDataRoutine.TRIGGER, getData);
}

export default function* mainStudentPageSagas() {
  yield all([
    watchGetData()
  ]);
}
