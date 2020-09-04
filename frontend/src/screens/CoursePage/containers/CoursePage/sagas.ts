import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchCourseDataRoutine,
  changeFavouriteCourseStateRoutine,
  checkFavouriteCourseStateRoutine,
  startCourseRoutine,
  changeFavouriteLectureStateRoutine,
  fetchAuthorInfoRoutine
} from '@screens/CoursePage/routines';
import * as courseService from '@screens/CoursePage/services/course.service';
import { AnyAction } from 'redux';
import { Routine } from 'redux-saga-routines';
import { saveCourseReviewRoutine } from '@screens/LecturePage/routines';

function* getData({ payload }: AnyAction) {
  try {
    const response = yield call(() => courseService.getData(payload));
    yield put(fetchCourseDataRoutine.success(response));
  } catch (error) {
    yield put(fetchCourseDataRoutine.failure(error?.message || error));
  }
}

function* getAuthorInfo() {
  try {
    const author = yield call(courseService.getAuthorInfo);
    yield put(fetchAuthorInfoRoutine.success(author));
  } catch (error) {
    yield put(fetchAuthorInfoRoutine.failure(error?.message || error));
  }
}

function* startCourse({ payload }: AnyAction) {
  try {
    const response = yield call(() => courseService.startCourse({ courseId: payload }));
    yield put(startCourseRoutine.success(response));
  } catch (error) {
    yield put(startCourseRoutine.failure(error?.message || error));
  }
}
function* watchGetDataRequest() {
  yield takeEvery(fetchCourseDataRoutine.TRIGGER, getData);
}
function* watchGetAuthorInfoRequest() {
  yield takeEvery(fetchAuthorInfoRoutine.TRIGGER, getAuthorInfo);
}
function* watchStartCourseRequest() {
  yield takeEvery(startCourseRoutine.TRIGGER, startCourse);
}

function* saveReview({ payload }: AnyAction) {
  try {
    yield put(saveCourseReviewRoutine.request());
    const response = yield call(() => courseService.saveReview(payload));
    yield put(saveCourseReviewRoutine.success({ rating: response, review: payload.rating }));
  } catch (error) {
    yield put(saveCourseReviewRoutine.failure(error?.message || error));
  }
}

function* watchSaveCourseReview() {
  yield takeEvery(saveCourseReviewRoutine.TRIGGER, saveReview);
}

function* changeFavouriteCourseState(action: Routine<any>) {
  try {
    const response = yield call(courseService.changeFavouriteState, action.payload);
    yield put(changeFavouriteCourseStateRoutine.success(response));
  } catch (error) {
    yield put(changeFavouriteCourseStateRoutine.failure(error?.message || error));
  }
}

function* watchChangeFavouriteCourseState() {
  yield takeEvery(changeFavouriteCourseStateRoutine.TRIGGER, changeFavouriteCourseState);
}

function* checkFavouriteCourseState(action: Routine<any>) {
  try {
    const response = yield call(courseService.checkFavouriteState, action.payload);
    yield put(checkFavouriteCourseStateRoutine.success(response));
  } catch (error) {
    yield put(checkFavouriteCourseStateRoutine.failure(error?.message || error));
  }
}

function* watchCheckFavouriteCourseState() {
  yield takeEvery(checkFavouriteCourseStateRoutine.TRIGGER, checkFavouriteCourseState);
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

export default function* courseDataSagas() {
  yield all([
    watchGetDataRequest(),
    watchChangeFavouriteCourseState(),
    watchCheckFavouriteCourseState(),
    watchStartCourseRequest(),
    watchSaveCourseReview(),
    watchChangeFavouriteLecturesState(),
    watchGetAuthorInfoRequest()
  ]);
}
