import { all, call, put, takeEvery } from 'redux-saga/effects';
import {fetchSearchCoursesRoutine, fetchSearchRoutine} from '@screens/Search/routines/routines';
import * as SearchService from '@screens/Search/services/service';

function* searchData(action) {
  try {
    yield put(fetchSearchRoutine.request());
    const response = yield call(SearchService.searchData, action.payload);
    yield put(fetchSearchRoutine.success(response));
  } catch (e) {
    yield put(fetchSearchRoutine.failure());
  }
}

function* watchSearchData() {
  yield takeEvery(fetchSearchRoutine.TRIGGER, searchData);
}

function* searchCourses(action) {
  try {
    yield put(fetchSearchRoutine.request());
    const response = yield call(SearchService.searchCourses, action.payload);
    yield put(fetchSearchRoutine.success(response));
  } catch (e) {
    yield put(fetchSearchRoutine.failure());
  }
}

function* watchSearchCourses() {
  yield takeEvery(fetchSearchCoursesRoutine.TRIGGER, searchCourses);
}

export default function* searchSagas() {
  yield all([
    watchSearchData(),
    watchSearchCourses()
  ]);
}
