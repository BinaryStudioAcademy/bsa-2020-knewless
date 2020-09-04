import { all, call, put, takeEvery } from 'redux-saga/effects';
import  * as pathService from '@screens/PathPage/services/path.service';
import { fetchPathDataRoutine, changeFavouritePathStateRoutine, checkFavouritePathStateRoutine } from '@screens/PathPage/routines';
import * as courseService from '@screens/CoursePage/services/course.service';
import { AnyAction } from 'redux';
import { Routine } from 'redux-saga-routines';

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

function* changeFavouritePathState(action: Routine<any>) {
  try {
    const response = yield call(courseService.changeFavouriteState, action.payload);
    yield put(changeFavouritePathStateRoutine.success(response));
  } catch (error) {
    yield put(changeFavouritePathStateRoutine.failure(error?.message));
  }
}

function* watchChangeFavouritePathState() {
  yield takeEvery(changeFavouritePathStateRoutine.TRIGGER, changeFavouritePathState);
}

function* checkFavouritePathState(action: Routine<any>) {
  try {
    const response = yield call(courseService.checkFavouriteState, action.payload);
    yield put(checkFavouritePathStateRoutine.success(response));
  } catch (error) {
    yield put(checkFavouritePathStateRoutine.failure(error?.message));
  }
}

function* watchCheckFavouritePathState() {
  yield takeEvery(checkFavouritePathStateRoutine.TRIGGER, checkFavouritePathState);
}

export default function* pathDataSagas() {
  yield all([
    watchGetPathDataRequest(),
    watchChangeFavouritePathState(),
    watchCheckFavouritePathState()
  ]);
}
