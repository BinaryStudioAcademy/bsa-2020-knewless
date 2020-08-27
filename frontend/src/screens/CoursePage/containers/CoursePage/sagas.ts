import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchCourseDataRoutine, startCourseRoutine } from '@screens/CoursePage/routines';
import * as courseService from '@screens/CoursePage/services/course.service';
import { AnyAction } from 'redux';
import { history } from '@helpers/history.helper';
import { saveCourseReviewRoutine } from '@screens/LecturePage/routines';

function* getData({ payload }: AnyAction) {
  try {
    const response = yield call(() => courseService.getData(payload));
    yield put(fetchCourseDataRoutine.success(response));
  } catch (error) {
    history.push('/');
    yield put(fetchCourseDataRoutine.failure(error?.message));
  }
}
function* startCourse({ payload }: AnyAction) {
  try {
    const response = yield call(() => courseService.startCourse({ courseId: payload }));
    yield put(startCourseRoutine.success(response));
  } catch (error) {
    history.push('/');
    yield put(startCourseRoutine.failure(error?.message));
  }
}
function* watchGetDataRequest() {
  yield takeEvery(fetchCourseDataRoutine.TRIGGER, getData);
}
function* watchStartCourseRequest() {
  yield takeEvery(startCourseRoutine.TRIGGER, startCourse);
}

function* saveReview({ payload }: AnyAction) {
  try {
    yield put(saveCourseReviewRoutine.request());
    const response = yield call(() => courseService.saveReview(payload));
    yield put(saveCourseReviewRoutine.success({ rating: response, review: payload.rating }));
  } catch (e) {
    yield put(saveCourseReviewRoutine.failure(e?.message));
  }
}

function* watchSaveCourseReview() {
  yield takeEvery(saveCourseReviewRoutine.TRIGGER, saveReview);
}

export default function* courseDataSagas() {
  yield all([
    watchGetDataRequest(),
    watchStartCourseRequest(),
    watchSaveCourseReview()
  ]);
}
