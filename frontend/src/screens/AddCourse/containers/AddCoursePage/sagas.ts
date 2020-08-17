import { takeEvery, put, call, all } from 'redux-saga/effects';
import { fetchLecturesRoutine, saveCourseRoutine, saveLectureRoutine } from 'screens/AddCourse/routines';
import * as courseService from '../../services/course.service';
import * as imageService from 'services/image.service';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';

function* getLectures(action: Routine<any>) {
  try {
    const response = yield call(courseService.getLecturesByAuthor, action.payload);
    yield put(fetchLecturesRoutine.success(response));
  } catch (error) {
    yield put(fetchLecturesRoutine.failure(error?.message));
  }
}

function* watchGetLecturesRequest() {
  yield takeEvery(fetchLecturesRoutine.TRIGGER, getLectures);
}

function* saveCourse(action: Routine<any>) {
  try {
    const course = action.payload;
    if (course?.uploadImage) {
      const { link } = yield call(() => imageService.uploadImage(course.uploadImage));
      course.image = link;
    }
    const response = yield call(courseService.saveCourse, action.payload);
    yield put(saveCourseRoutine.success(response));
    toastr.success('Course saved!');
  } catch (error) {
    yield put(saveCourseRoutine.failure(error?.message));
  }
}

function* watchSaveCourseRequest() {
  yield takeEvery(saveCourseRoutine.TRIGGER, saveCourse);
}

function* saveLecture(action: Routine<any>) {
  try {
    const addEntity = { name: action.payload.name, description: action.payload.description };
    const responseAdd = yield call(courseService.addLectureToDb, addEntity);
    yield put(saveLectureRoutine.success(responseAdd));
    const saveEntity = { id: responseAdd.id, duration: action.payload.duration, video: action.payload.video };
    window.onbeforeunload = () => true;
    const responseSave = yield call(courseService.saveLectureVideo, saveEntity);
    yield put(saveLectureRoutine.success(responseSave));
    window.onbeforeunload = undefined;
    toastr.success(`Lecture ${action.paiload.name} saved!`);
  } catch (error) {
    yield put(saveLectureRoutine.failure(error?.message));
  }
}

function* watchSaveLectureRequest() {
  yield takeEvery(saveLectureRoutine.TRIGGER, saveLecture);
}

export default function* lectureSagas() {
  yield all([
    watchGetLecturesRequest(),
    watchSaveCourseRequest(),
    watchSaveLectureRequest()
  ]);
}
