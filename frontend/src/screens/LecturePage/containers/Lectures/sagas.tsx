import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchCourseDtoRoutine } from 'screens/LecturePage/routines';
import * as lecturesService from 'screens/LecturePage/services/lectures.api';
import { Routine } from 'redux-saga-routines';

function* getData(action: Routine<any>) {
  try {
    const response = yield call(lecturesService.getData, action.payload);
    yield put(fetchCourseDtoRoutine.success(response));
    toastr.success('Data loaded!');
  } catch (error) {
    yield put(fetchCourseDtoRoutine.failure(error?.message));
    toastr.error('Loading failed!');
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchCourseDtoRoutine.TRIGGER, getData);
}

export default function* dataSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}
