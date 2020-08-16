import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as mainPageService from '../../services/author.main.page.service';
import { fetchAuthorRoutine, fetchAuthorCoursesRoutine, fetchAuthorPathsRoutine } from '../../routines';
import { AnyAction } from 'redux';

function* getAuthor() {
  try {
    const response = yield call(mainPageService.getAuthor);
    yield put(fetchAuthorRoutine.success(response));
  } catch (error) {
    yield put(fetchAuthorRoutine.failure(error?.message));
  }
}

function* watchGetAuthor() {
  yield takeEvery(fetchAuthorRoutine.TRIGGER, getAuthor);
}

function* getAuthorCourses({ payload }: AnyAction) {
  try {
    const response = yield call(mainPageService.getAuthorCourses, payload);
    yield put(fetchAuthorCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchAuthorCoursesRoutine.failure(error?.message));
  }
}

function* watchGetAuthorCourses() {
  yield takeEvery(fetchAuthorCoursesRoutine.TRIGGER, getAuthorCourses);
}

function* getAuthorPaths({ payload }: AnyAction) {
  try {
    const response = yield call(mainPageService.getAuthorPaths, payload);
    yield put(fetchAuthorPathsRoutine.success(response));
  } catch (error) {
    yield put(fetchAuthorPathsRoutine.failure(error?.message));
  }
}

function* watchGetAuthorPaths() {
  yield takeEvery(fetchAuthorPathsRoutine.TRIGGER, getAuthorPaths);
}

export default function* authorMainPageSagas() {
  yield all([
    watchGetAuthor(),
    watchGetAuthorCourses(),
    watchGetAuthorPaths()
  ]);
}
