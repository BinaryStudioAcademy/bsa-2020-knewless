import { takeEvery, put, call, all } from 'redux-saga/effects';
import {
  fetchLecturesRoutine,
  saveCourseRoutine,
  saveLectureRoutine,
  fetchEditCourseRoutine,
  updateCourseRoutine,
  fetchTagsRoutine,
  fetchLectureRoutine
} from 'screens/AddCourse/routines';
import * as courseService from '../../services/add-course.service';
import * as imageService from 'services/image.service';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';
import { history } from '@helpers/history.helper';

function* getLectures() {
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

function* getTags() {
  try {
    const response = yield call(courseService.getTags);
    yield put(fetchTagsRoutine.success(response));
  } catch (error) {
    yield put(fetchTagsRoutine.failure(error?.message));
  }
}

function* watchGetTagsRequest() {
  yield takeEvery(fetchTagsRoutine.TRIGGER, getTags);
}

function* getCourse(action: Routine<any>) {
  try {
    const response = yield call(courseService.getCourseById, action.payload);
    yield put(fetchEditCourseRoutine.success(response));
  } catch (error) {
    yield call(history.push, '/');
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
    courseService.forwardCourses();
    yield put(fetchEditCourseRoutine.success(undefined));
  } catch (error) {
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
    courseService.forwardCourses();
  } catch (error) {
    yield put(saveCourseRoutine.failure(error?.message));
  }
}

function* watchSaveCourseRequest() {
  yield takeEvery(saveCourseRoutine.TRIGGER, saveCourse);
}

function* saveLecture(action: Routine<any>) {
  try {
    if (!action.payload.link) {
      const addEntity = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        tags: action.payload.tags
      };
      const responseAdd = yield call(courseService.addLectureToDb, addEntity);
      yield put(saveLectureRoutine.success(responseAdd));
      if(action.payload.video){
      const saveEntity = { id: responseAdd.id, duration: action.payload.duration, video: action.payload.video };
      window.onbeforeunload = () => true;
      const responseSave = yield call(courseService.saveLectureVideo, saveEntity);
      yield put(saveLectureRoutine.success(responseSave));
      window.onbeforeunload = undefined;
      toastr.success(`Lecture ${responseSave.name} saved!`);
      } else {
      window.onbeforeunload = undefined;
      toastr.success(`Lecture ${responseAdd.name} saved!`);
      }
    } else {
      const saveEntity = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        url: action.payload.link,
        duration: action.payload.duration,
        tagsIds: action.payload.tags.map(t => t.id)
      };
      const responseSave = yield call(courseService.saveLectureWithUrl, saveEntity);
      yield put(saveLectureRoutine.success(responseSave));
      toastr.success(`Lecture ${responseSave.name} saved!`);
    }
    
  } catch (error) {
    yield put(saveLectureRoutine.failure(error?.message));
  }
}

function* watchSaveLectureRequest() {
  yield takeEvery(saveLectureRoutine.TRIGGER, saveLecture);
}

function* getLecture(action: Routine<any>) {
  try {
    const response = yield call(courseService.getLectureById, action.payload);
    yield put(fetchLectureRoutine.success(response));
  } catch (error) {
    yield put(fetchLectureRoutine.failure(error?.message));
  }
}

function*  watchGetLectureRequest() {
  yield takeEvery(fetchLectureRoutine.TRIGGER, getLecture);
}

export default function* lectureSagas() {
  yield all([
    watchGetLecturesRequest(),
    watchSaveCourseRequest(),
    watchSaveLectureRequest(),
    watchGetCourseRequest(),
    watchUpdateCourseRequest(),
    watchGetTagsRequest(),
    watchGetLectureRequest()
  ]);
}
