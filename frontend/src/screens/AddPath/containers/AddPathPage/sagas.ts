import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchCoursesRoutine, fetchTagsRoutine, savePathRoutine } from '../../routines';
import * as addPageService from '../../services/add_page.service';
import { AnyAction } from 'redux';
import { ICourse } from '../../models/domain';

function* loadCourses() {
  try {
    const response: ICourse[] = yield call(addPageService.getCourses);
    yield put(fetchCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchCoursesRoutine.failure(error?.message));
    toastr.error('Failed to load courses');
  }
}

function* watchFetchCoursesTriggers() {
  yield takeEvery(fetchCoursesRoutine.TRIGGER, loadCourses);
}

function* loadTags() {
  try {
    const response = yield call(addPageService.getTags);
    yield put(fetchTagsRoutine.success(response));
  } catch (error) {
    yield put(fetchTagsRoutine.failure(error?.message));
    toastr.error('Failed to load tags');
  }
}

function* watchFetchTagsTriggers() {
  yield takeEvery(fetchTagsRoutine.TRIGGER, loadTags);
}

function* savePath({ payload }: AnyAction) {
  try {
    const response = yield call(addPageService.uploadPath, payload);
    yield put(savePathRoutine.success(response));
    // todo: forward on the needed path
    toastr.success(`Uploaded! new id: '${response}'. TODO: forward on that path`);
  } catch (error) {
    yield put(savePathRoutine.failure(error?.message));
    toastr.error('Failed to add new path');
  }
}

function* watchSavePathTriggers() {
  yield takeEvery(savePathRoutine.TRIGGER, savePath);
}

export default function* pathSagas() {
  yield all([
    watchFetchCoursesTriggers(),
    watchFetchTagsTriggers(),
    watchSavePathTriggers()
  ]);
}
