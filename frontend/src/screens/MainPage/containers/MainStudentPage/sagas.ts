import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as mainPageService from 'screens/MainPage/services/main.page.service';
import {
  fetchContinueCoursesRoutine, fetchRecommendedCoursesRoutine, fetchPathsRoutine, fetchStudentRoutine
} from '../../routines';
import { AnyAction } from 'redux';

function* getContinueCourses({ payload }: AnyAction) {
  try {
    const response = yield call(mainPageService.getContinueCourses, payload);
    yield put(fetchContinueCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchContinueCoursesRoutine.failure(error?.message));
  }
}

function* watchGetStudentCourses() {
  yield takeEvery(fetchContinueCoursesRoutine.TRIGGER, getContinueCourses);
}

function* getRecommendedCourses({ payload }: AnyAction) {
  try {
    const response = yield call(mainPageService.getRecommendedCourses, payload);
    yield put(fetchRecommendedCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchRecommendedCoursesRoutine.failure(error?.message));
  }
}

function* watchGetRecommendedCourses() {
  yield takeEvery(fetchRecommendedCoursesRoutine.TRIGGER, getRecommendedCourses);
}

function* getPaths() {
  try {
    const response = yield call(mainPageService.getPaths);
    yield put(fetchPathsRoutine.success(response));
  } catch (error) {
    yield put(fetchPathsRoutine.failure(error?.message));
  }
}

function* watchGetPaths() {
  yield takeEvery(fetchPathsRoutine.TRIGGER, getPaths);
}

function* getStudent() {
  try {
    const response = yield call(mainPageService.getStudent);
    yield put(fetchStudentRoutine.success(response));
  } catch (error) {
    yield put(fetchStudentRoutine.failure(error?.message));
  }
}

function* watchGetStudent() {
  yield takeEvery(fetchStudentRoutine.TRIGGER, getStudent);
}

export default function* studentMainPageSagas() {
  yield all([
    watchGetStudentCourses(),
    watchGetRecommendedCourses(),
    watchGetPaths(),
    watchGetStudent()
  ]);
}
