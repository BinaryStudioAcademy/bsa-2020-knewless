import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchAuthorRoutine, fetchStudentRoutine } from '@containers/UserOverview/routines';
import { AnyAction } from 'redux';
import { getAuthor, getStudent } from '@containers/UserOverview/service';

function* tryGetStudentInfo({ payload }: AnyAction) {
  try {
    const resp = yield call(getStudent, payload);
    yield put(fetchStudentRoutine.success(resp));
  } catch (error) {
    yield put(fetchStudentRoutine.failure());
    toastr.error('Failed to load student');
  }
}

function* watchFetchStudent() {
  yield takeEvery(fetchStudentRoutine.TRIGGER, tryGetStudentInfo);
}

function* tryGetAuthorInfo({ payload }: AnyAction) {
  try {
    const resp = yield call(getAuthor, payload);
    yield put(fetchAuthorRoutine.success(resp));
  } catch (error) {
    yield put(fetchAuthorRoutine.failure());
    toastr.error('Failed to load author');
  }
}

function* watchFetchAuthor() {
  yield takeEvery(fetchAuthorRoutine.TRIGGER, tryGetAuthorInfo);
}

export default function* userOverviewSagas() {
  yield all([
    watchFetchStudent(),
    watchFetchAuthor()
  ]);
}
