import { takeEvery, put, call, all } from 'redux-saga/effects';
import { fetchLecturesRoutine, saveCourseRoutine, saveLectureRoutine, fetchEditCourseRoutine, updateCourseRoutine } from 'screens/AddCourse/routines';
import * as courseService from '../../services/course.service';
import * as imageService from 'services/image.service';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';

function* getLectures(action: Routine<any>) {
  try {
    const response = yield call(courseService.getLecturesByUser);
    yield put(fetchLecturesRoutine.success(response));
  } catch (error) {
    yield put(fetchLecturesRoutine.failure(error?.message));
  }
}

function* watchGetLecturesRequest() {
  yield takeEvery(fetchLecturesRoutine.TRIGGER, getLectures);
}

function* getCourse(action: Routine<any>) {
  try {
    const response = yield call(courseService.getCourseById, action.payload);
    yield put(fetchEditCourseRoutine.success(response));
  } catch (error) {
    yield put(fetchEditCourseRoutine.failure(error?.message));
  }
}

function* watchGetCourseRequest() {
  yield takeEvery(fetchEditCourseRoutine.TRIGGER, getCourse);
}

function* updateCourse(action: Routine<any>) {
  try {
    const course = action.payload;
    if (course?.uploadImage) {
      const { link } = yield call(() => imageService.uploadImage(course.uploadImage));
      course.image = link;
    }
    const response = yield call(courseService.updateCourse, action.payload);
    yield put(updateCourseRoutine.success(response));
    toastr.success('Saved successfully!');
    courseService.forwardHome();
  } catch (error) {
    console.log(error);
    yield put(updateCourseRoutine.failure(error?.message));
  }
}

function* watchUpdateCourseRequest() {
  yield takeEvery(updateCourseRoutine.TRIGGER, updateCourse);
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
    toastr.success('Saved successfully!');
    courseService.forwardHome();
  } catch (error) {
    console.log(error);
    yield put(saveCourseRoutine.failure(error?.message));
  }
}

function* watchSaveCourseRequest() {
  yield takeEvery(saveCourseRoutine.TRIGGER, saveCourse);
}

function* saveLecture(action: Routine<any>) {
  try {
    const addEntity = {
      name: action.payload.name,
      description: action.payload.description
    };
    const responseAdd = yield call(courseService.addLectureToDb, addEntity);
    yield put(saveLectureRoutine.success(responseAdd));
    const saveEntity = { id: responseAdd.id, duration: action.payload.duration, video: action.payload.video };
    window.onbeforeunload = () => true;
    const responseSave = yield call(courseService.saveLectureVideo, saveEntity);
    yield put(saveLectureRoutine.success(responseSave));
    window.onbeforeunload = undefined;
    toastr.success(`Lecture ${responseSave.name} saved!`);
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
    watchSaveLectureRequest(),
    watchGetCourseRequest(),
    watchUpdateCourseRequest()
  ]);
}
