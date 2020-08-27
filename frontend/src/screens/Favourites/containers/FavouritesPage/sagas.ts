import { takeEvery, put, call, all } from 'redux-saga/effects';
import { fetchFavouriteCoursesRoutine, removeCourseFavouriteRoutine,
  fetchFavouriteAuthorsRoutine, fetchFavouriteLecturesRoutine } from 'screens/Favourites/routines';
import * as favouritesService from '../../services/favourites.service';
import { Routine } from 'redux-saga-routines';
import * as courseService from '@screens/CoursePage/services/course.service';

function* fetchCourses(action: Routine<any>) {
  try {
    const response = yield call(favouritesService.fetchCourses);
    yield put(fetchFavouriteCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchFavouriteCoursesRoutine.failure(error?.message));
  }
}

function* watchFetchCourses() {
  yield takeEvery(fetchFavouriteCoursesRoutine.TRIGGER, fetchCourses);
}

function* fetchAuthors(action: Routine<any>) {
  try {
    const response = yield call(favouritesService.fetchAuthors);
    yield put(fetchFavouriteAuthorsRoutine.success(response));
  } catch (error) {
    yield put(fetchFavouriteAuthorsRoutine.failure(error?.message));
  }
}

function* watchFetchAuthors() {
  yield takeEvery(fetchFavouriteAuthorsRoutine.TRIGGER, fetchAuthors);
}

function* fetchLectures(action: Routine<any>) {
  try {
    const response = yield call(favouritesService.fetchLectures);
    yield put(fetchFavouriteLecturesRoutine.success(response));
  } catch (error) {
    yield put(fetchFavouriteLecturesRoutine.failure(error?.message));
  }
}

function* watchFetchLectures() {
  yield takeEvery(fetchFavouriteLecturesRoutine.TRIGGER, fetchLectures);
}

function* removeCourseFromFavourite(action: Routine<any>) {
  try {
    yield call(courseService.changeFavouriteState, action.payload);
    const response = yield call(favouritesService.fetchCourses);
    yield put(removeCourseFavouriteRoutine.success(response));
  } catch (error) {
    yield put(removeCourseFavouriteRoutine.failure(error?.message));
  }
}

function* watchRemoveCourse() {
  yield takeEvery(removeCourseFavouriteRoutine.TRIGGER, removeCourseFromFavourite);
}

export default function* favouriteItemSagas() {
  yield all([
    watchFetchCourses(),
    watchFetchLectures(),
    watchFetchAuthors(),
    watchRemoveCourse()
  ]);
}
