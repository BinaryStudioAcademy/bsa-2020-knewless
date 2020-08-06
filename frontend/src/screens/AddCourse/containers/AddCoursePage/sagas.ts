import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchLecturesRoutine } from 'screens/AddCourse/routines';
import * as courseService from '../../services/course.service';
import { Routine } from 'redux-saga-routines';

function* getLectures(action: Routine<any>) {
  try {
    const response = yield call(courseService.getLecturesByAuthor, action.payload.id);
    yield put(fetchLecturesRoutine.success(response));
    toastr.success('Lectures loaded!');
  } catch (error) {
    yield put(fetchLecturesRoutine.failure(error?.message));
    toastr.error('Loading failed!');
  }
}

function* watchGetLecturesRequest() {
  yield takeEvery(fetchLecturesRoutine.TRIGGER, getLectures);
}

export default function* lectureSagas() {
  yield all([
    watchGetLecturesRequest()
  ]);
}
