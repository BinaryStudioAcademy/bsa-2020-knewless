import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchDataRoutine } from '../../routines';
import * as landingService from '../../services/landing.service';

function* getData() {
  try {
    const coursesResp = yield call(landingService.getPopularCourses);
    const pathsResp = yield call(landingService.getPaths);
    const navigationsResp = yield call(landingService.getNavigations);
    yield put(fetchDataRoutine.success({
      courses: coursesResp,
      paths: pathsResp,
      navigations: navigationsResp
    }));
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Loading failed!');
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, getData);
}

export default function* dataSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}
