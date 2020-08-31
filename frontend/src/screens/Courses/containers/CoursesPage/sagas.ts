import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchCoursesRoutine,
  fetchCoursesByTagRoutine,
  fetchAllCoursesRoutine,
  fetchAllAuthorCoursesRoutine,
  fetchAllTagsRoutine
} from '../../routines';
import * as coursesService from '../../services/courses.page.service';
import { Routine } from 'redux-saga-routines';

function* getCourses() {
  try {
    const courses = yield call(coursesService.getCourses);
    const continueCourses = yield call(coursesService.getContinueCourses);
    const tags = yield call(coursesService.getTags);

    yield put(fetchCoursesRoutine.success({
      courses,
      continueCourses,
      tags
    }));
  } catch (error) {
    yield put(fetchCoursesRoutine.failure(error?.message));
  }
}

function* watchGetCoursesRequest() {
  yield takeEvery(fetchCoursesRoutine.TRIGGER, getCourses);
}

function* getCoursesByTag(action: Routine<any>) {
  try {
    const courses = yield call(coursesService.getCoursesByTag, action.payload);

    yield put(fetchCoursesByTagRoutine.success({
      courses
    }));
  } catch (error) {
    yield put(fetchCoursesRoutine.failure(error?.message));
  }
}

function* watchGetCoursesByTagRequest() {
  yield takeEvery(fetchCoursesByTagRoutine.TRIGGER, getCoursesByTag);
}

function* getAllCourses() {
  try {
    const courses = yield call(coursesService.getCourses);

    yield put(fetchAllCoursesRoutine.success({
      courses
    }));
  } catch (error) {
    yield put(fetchAllCoursesRoutine.failure(error?.message));
  }
}

function* watchGetAllCoursesRequest() {
  yield takeEvery(fetchAllCoursesRoutine.TRIGGER, getAllCourses);
}

function* getAllTags() {
  try {
    const tags = yield call(coursesService.getTags);

    yield put(fetchAllTagsRoutine.success({
      tags
    }));
  } catch (error) {
    yield put(fetchAllTagsRoutine.failure(error?.message));
  }
}

function* watchGetAllTagsRequest() {
  yield takeEvery(fetchAllTagsRoutine.TRIGGER, getAllTags);
}

function* getAllAuthorCourses() {
  try {
    const continueCourses = yield call(coursesService.getAuthorCourses);

    yield put(fetchAllAuthorCoursesRoutine.success({
      continueCourses
    }));
  } catch (error) {
    yield put(fetchAllAuthorCoursesRoutine.failure(error?.message));
  }
}

function* watchGetAllAuthorCoursesRequest() {
  yield takeEvery(fetchAllAuthorCoursesRoutine.TRIGGER, getAllAuthorCourses);
}

export default function* coursesPageContainerSagas() {
  yield all([
    watchGetCoursesRequest(),
    watchGetCoursesByTagRequest(),
    watchGetAllCoursesRequest(),
    watchGetAllAuthorCoursesRequest(),
    watchGetAllTagsRequest()
  ]);
}
