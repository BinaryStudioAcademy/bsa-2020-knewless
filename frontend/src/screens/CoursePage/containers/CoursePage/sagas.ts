import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchCourseDataRoutine } from '@screens/CoursePage/routines';
import * as courseService from '@screens/CoursePage/services/course.service';
import { AnyAction } from 'redux';
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

export default function* courseDataSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}
