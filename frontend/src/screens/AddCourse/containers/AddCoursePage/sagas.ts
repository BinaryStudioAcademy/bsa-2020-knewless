import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import * as courseService from '../../services/course.service';
import { Routine } from 'redux-saga-routines';

function* getLectures(action: Routine<any>) {
  try {
    const response = yield call(courseService.getLecturesByAuthor, action.payload);
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

function* saveCourse(action: Routine<any>) {
  try {
    const response = yield call(courseService.saveCourse, action.payload);
    yield put(saveCourseRoutine.success(response));
    toastr.success('Lectures loaded!');
  } catch (error) {
    yield put(saveCourseRoutine.failure(error?.message));
    toastr.error('Loading failed!');
  }
}

function* watchSaveCourseRequest() {
  yield takeEvery(saveCourseRoutine.TRIGGER, saveCourse);
}

export default function* lectureSagas() {
  yield all([
    watchGetLecturesRequest(),
    watchSaveCourseRequest()
  ]);
}
