import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchCoursesRoutine } from '../../routines';
import * as landingService from '../../services/landing.service';

function* getData() {
  try {
    const response = yield call(landingService.getData);
    yield put(fetchCoursesRoutine.success(response));
    // toastr.success('Data loaded!');
  } catch (error) {
    yield put(fetchCoursesRoutine.failure(error?.message));
    toastr.error('Loading failed!');
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchCoursesRoutine.TRIGGER, getData);
}

export default function* pathSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}
