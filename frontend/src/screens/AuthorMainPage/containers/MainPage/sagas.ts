import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as mainPageService from '../../services/author.main.page.service';
import { fetchAuthorDataRoutine } from '../../routines';

function* getData() {
  try {
    const response = yield call(mainPageService.getData);
    yield put(fetchAuthorDataRoutine.success(response));
  } catch (error) {
    yield put(fetchAuthorDataRoutine.failure(error?.message));
  }
}

function* watchGetData() {
  yield takeEvery(fetchAuthorDataRoutine.TRIGGER, getData);
}

export default function* authorMainPageSagas() {
  yield all([
    watchGetData()
  ]);
}
