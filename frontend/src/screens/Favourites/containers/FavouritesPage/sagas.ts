import { takeEvery, put, call, all } from 'redux-saga/effects';
import {
  fetchFavouriteCoursesRoutine,
  removeCourseFavouriteRoutine,
  fetchFavouriteAuthorsRoutine,
  fetchFavouriteLecturesRoutine,
  removeAuthorFavouriteRoutine,
  removeLectureFavouriteRoutine,
  fetchFavouritePathsRoutine,
  removePathFavouriteRoutine, fetchFavouriteArticlesRoutine, removeArticleFavouriteRoutine
} from 'screens/Favourites/routines';
import * as favouritesService from '../../services/favourites.service';
import { Routine } from 'redux-saga-routines';
import * as courseService from '@screens/CoursePage/services/course.service';
import * as authorService from '@screens/AuthorPublicPage/services/publicAuthorPageService';

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

function* fetchPaths(action: Routine<any>) {
  try {
    const response = yield call(favouritesService.fetchPaths);
    yield put(fetchFavouritePathsRoutine.success(response));
  } catch (error) {
    yield put(fetchFavouritePathsRoutine.failure(error?.message));
  }
}

function* watchFetchPaths() {
  yield takeEvery(fetchFavouritePathsRoutine.TRIGGER, fetchPaths);
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

function* fetchArticles() {
  try {
    const response = yield call(favouritesService.fetchArticles);
    yield put(fetchFavouriteArticlesRoutine.success(response));
  } catch (error) {
    yield put(fetchFavouriteArticlesRoutine.failure(error?.message));
  }
}

function* watchFetchArticles() {
  yield takeEvery(fetchFavouriteArticlesRoutine.TRIGGER, fetchArticles);
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

function* removeAuthorFromFavourite(action: Routine<any>) {
  try {
    yield call(authorService.changeFavouriteState, action.payload);
    const response = yield call(favouritesService.fetchAuthors);
    yield put(removeAuthorFavouriteRoutine.success(response));
  } catch (error) {
    yield put(removeAuthorFavouriteRoutine.failure(error?.message));
  }
}

function* watchRemoveAuthor() {
  yield takeEvery(removeAuthorFavouriteRoutine.TRIGGER, removeAuthorFromFavourite);
}

function* removeLectureFromFavourite(action: Routine<any>) {
  try {
    yield call(courseService.changeFavouriteState, action.payload);
    const response = yield call(favouritesService.fetchLectures);
    yield put(removeLectureFavouriteRoutine.success(response));
  } catch (error) {
    yield put(removeLectureFavouriteRoutine.failure(error?.message));
  }
}

function* watchRemoveLecture() {
  yield takeEvery(removeLectureFavouriteRoutine.TRIGGER, removeLectureFromFavourite);
}

function* removePathFromFavourite(action: Routine<any>) {
  try {
    yield call(courseService.changeFavouriteState, action.payload);
    const response = yield call(favouritesService.fetchPaths);
    yield put(removePathFavouriteRoutine.success(response));
  } catch (error) {
    yield put(removePathFavouriteRoutine.failure(error?.message));
  }
}

function* watchRemovePath() {
  yield takeEvery(removePathFavouriteRoutine.TRIGGER, removePathFromFavourite);
}

function* removeArticleFromFavourite(action: Routine<any>) {
  try {
    yield call(courseService.changeFavouriteState, action.payload);
    const response = yield call(favouritesService.fetchArticles);
    yield put(removeArticleFavouriteRoutine.success(response));
  } catch (error) {
    yield put(removeArticleFavouriteRoutine.failure(error?.message));
  }
}

function* watchRemoveArticle() {
  yield takeEvery(removeArticleFavouriteRoutine.TRIGGER, removeArticleFromFavourite);
}

export default function* favouriteItemSagas() {
  yield all([
    watchFetchCourses(),
    watchFetchLectures(),
    watchFetchAuthors(),
    watchFetchArticles(),
    watchRemoveCourse(),
    watchRemoveAuthor(),
    watchRemoveLecture(),
    watchFetchPaths(),
    watchRemovePath(),
    watchRemoveArticle()
  ]);
}
