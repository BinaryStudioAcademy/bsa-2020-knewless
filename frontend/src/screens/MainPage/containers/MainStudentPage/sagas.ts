import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as mainPageService from 'screens/MainPage/services/main.page.service';
import {
  fetchAllGoalsRoutine,
  fetchContinueCoursesRoutine,
  fetchCurrentGoalProgressRoutine,
  fetchPathsRoutine,
  fetchRecommendedCoursesRoutine,
  fetchStudentRoutine,
  setCurrentGoalRoutine
} from '../../routines';
import { AnyAction } from 'redux';
import { IPersonalGoalItem, IPersonalGoalProgress } from '@screens/MainPage/models/PersonalGoal';
import { toastr } from 'react-redux-toastr';

function* getContinueCourses({ payload }: AnyAction) {
  try {
    const response = yield call(mainPageService.getContinueCourses, payload);
    yield put(fetchContinueCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchContinueCoursesRoutine.failure(error?.message));
  }
}

function* watchGetStudentCourses() {
  yield takeEvery(fetchContinueCoursesRoutine.TRIGGER, getContinueCourses);
}

function* getRecommendedCourses({ payload }: AnyAction) {
  try {
    const response = yield call(mainPageService.getRecommendedCourses, payload);
    yield put(fetchRecommendedCoursesRoutine.success(response));
  } catch (error) {
    yield put(fetchRecommendedCoursesRoutine.failure(error?.message));
  }
}

function* watchGetRecommendedCourses() {
  yield takeEvery(fetchRecommendedCoursesRoutine.TRIGGER, getRecommendedCourses);
}

function* getPaths() {
  try {
    const response = yield call(mainPageService.getPaths);
    yield put(fetchPathsRoutine.success(response));
  } catch (error) {
    yield put(fetchPathsRoutine.failure(error?.message));
  }
}

function* watchGetPaths() {
  yield takeEvery(fetchPathsRoutine.TRIGGER, getPaths);
}

function* getStudent() {
  try {
    const response = yield call(mainPageService.getStudent);
    yield put(fetchStudentRoutine.success(response));
  } catch (error) {
    yield put(fetchStudentRoutine.failure(error?.message));
  }
}

function* watchGetStudent() {
  yield takeEvery(fetchStudentRoutine.TRIGGER, getStudent);
}

function* getAllGoals() {
  try {
    const resp: IPersonalGoalItem[] = yield call(mainPageService.getAllGoals);
    yield put(fetchAllGoalsRoutine.success(resp));
  } catch (e) {
    toastr.error(e.message);
    yield put(fetchAllGoalsRoutine.failure(e.message));
  }
}

function* watchTryFetchAllGoals() {
  yield takeEvery(fetchAllGoalsRoutine.TRIGGER, getAllGoals);
}

function* getGoalProgress() {
  try {
    const resp: IPersonalGoalProgress | null = yield call(mainPageService.getPersonalGoalProgress);
    yield put(fetchCurrentGoalProgressRoutine.success(resp));
  } catch (e) {
    toastr.error(e.message);
    yield put(fetchCurrentGoalProgressRoutine.failure(e.message));
  }
}

function* watchTryGetGoalProgress() {
  yield takeEvery(fetchCurrentGoalProgressRoutine.TRIGGER, getGoalProgress);
}

function* setGoal({ payload }: AnyAction) {
  try {
    yield call(mainPageService.setPersonalGoal, payload);
    yield put(setCurrentGoalRoutine.success());
    toastr.success('Personal goal updated successfully!');
    yield put(fetchCurrentGoalProgressRoutine.trigger());
  } catch (e) {
    toastr.error(e.message);
    yield put(setCurrentGoalRoutine.failure(e.message));
  }
}

function* watchSetCurrentGoal() {
  yield takeEvery(setCurrentGoalRoutine.TRIGGER, setGoal);
}

export default function* studentMainPageSagas() {
  yield all([
    watchGetStudentCourses(),
    watchGetRecommendedCourses(),
    watchGetPaths(),
    watchGetStudent(),
    watchTryFetchAllGoals(),
    watchTryGetGoalProgress(),
    watchSetCurrentGoal()
  ]);
}
