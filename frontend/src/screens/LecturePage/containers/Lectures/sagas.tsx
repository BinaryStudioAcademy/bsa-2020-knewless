import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  fetchCourseDtoRoutine,
  saveWatchTimeRoutine,
  changeFavouriteLectureStateRoutine
} from 'screens/LecturePage/routines';
import * as lecturesService from 'screens/LecturePage/services/lectures.api';
import * as playerService from '../../services/player.service';
import * as courseService from '@screens/CoursePage/services/course.service';
import { Routine } from 'redux-saga-routines';

function* getData(action: Routine<any>) {
  try {
    const response = yield call(lecturesService.getData, action.payload);
    yield put(fetchCourseDtoRoutine.success(response));
  } catch (error) {
    yield put(fetchCourseDtoRoutine.failure(error?.message || error));
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
  } catch (error) {
    yield put(saveWatchTimeRoutine.failure(error?.message || error));
  }
}

function* watchTriggerSaveWatchTime() {
  yield takeLatest(saveWatchTimeRoutine.TRIGGER, saveWatchTime);
}

function* changeFavouriteLecturesState(action: Routine<any>) {
  try {
    const response = yield call(courseService.changeFavouriteState, action.payload);
    yield put(changeFavouriteLectureStateRoutine.success({ favourite: response, id: action.payload.id }));
  } catch (error) {
    yield put(changeFavouriteLectureStateRoutine.failure(error?.message || error));
  }
}

function* watchChangeFavouriteLecturesState() {
  yield takeEvery(changeFavouriteLectureStateRoutine.TRIGGER, changeFavouriteLecturesState);
}

export function* playerSagas() {
  yield all([
    watchTriggerSaveWatchTime(),
    watchChangeFavouriteLecturesState()
  ]);
}
