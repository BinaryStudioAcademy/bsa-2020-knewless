import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchCourseDtoRoutine, saveWatchTimeRoutine } from 'screens/LecturePage/routines';
import * as lecturesService from 'screens/LecturePage/services/lectures.api';
import * as playerService from '../../services/player.service';
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

export function* dataSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}

function* saveWatchTime(action: Routine<any>) {
  try {
    const { watchTime, lectureId, fraction } = action.payload;
    yield call(playerService.saveWatchTime, watchTime, fraction, lectureId);
    yield put(saveWatchTimeRoutine.success());
  } catch (e) {
    yield put(saveWatchTimeRoutine.failure(e?.message));
  }
}

function* watchTriggerSaveWatchTime() {
  yield takeLatest(saveWatchTimeRoutine.TRIGGER, saveWatchTime);
}

export function* playerSagas() {
  yield all([
    watchTriggerSaveWatchTime()
  ]);
}
