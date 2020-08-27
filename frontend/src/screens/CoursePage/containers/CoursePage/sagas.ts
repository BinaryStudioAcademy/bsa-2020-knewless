import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchCourseDataRoutine, changeFavouriteStateRoutine, checkFavouriteStateRoutine } from '@screens/CoursePage/routines';
import * as courseService from '@screens/CoursePage/services/course.service';
import { AnyAction } from 'redux';
import { Routine } from 'redux-saga-routines';
import { history } from '@helpers/history.helper';

function* getData({ payload }: AnyAction) {
  try {
    const response = yield call(() => courseService.getData(payload));
    yield put(fetchCourseDataRoutine.success(response));
  } catch (error) {
    history.push('/');
    yield put(fetchCourseDataRoutine.failure(error?.message));
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchCourseDataRoutine.TRIGGER, getData);
}

function* changeFavouriteState(action: Routine<any>) {
  try {
    const response = yield call(courseService.changeFavouriteState, action.payload);
    yield put(changeFavouriteStateRoutine.success(response));
  } catch (error) {
    yield put(changeFavouriteStateRoutine.failure(error?.message));
  }
}

function* watchChangeFavouriteState() {
  yield takeEvery(changeFavouriteStateRoutine.TRIGGER, changeFavouriteState);
}

function* checkFavouriteState(action: Routine<any>) {
  try {
    const response = yield call(courseService.checkFavouriteState, action.payload);
    yield put(checkFavouriteStateRoutine.success(response));
  } catch (error) {
    yield put(checkFavouriteStateRoutine.failure(error?.message));
  }
}

function* watchCheckFavouriteState() {
  yield takeEvery(checkFavouriteStateRoutine.TRIGGER, checkFavouriteState);
}

export default function* courseDataSagas() {
  yield all([
    watchGetDataRequest(),
    watchChangeFavouriteState(),
    watchCheckFavouriteState()
  ]);
}
