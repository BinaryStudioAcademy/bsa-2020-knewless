import { takeEvery, put, call, all } from 'redux-saga/effects';
import { fetchResetLinkRoutine } from 'screens/ResetPassword/routines';
import * as resetService from '../../services/resetpassword.service';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';

function* fetchResetLink(action: Routine<any>) {
  try {
    yield put(fetchResetLinkRoutine.request());
    const response = yield call(resetService.fetchResetLink, action.payload);
    if (!response) toastr.error('You have entered wrong email!');
    yield put(fetchResetLinkRoutine.success(response));
  } catch (error) {
    yield put(fetchResetLinkRoutine.failure(error?.message));
  }
}

function* watchFetchResetLink() {
  yield takeEvery(fetchResetLinkRoutine.TRIGGER, fetchResetLink);
}

export default function* resetSagas() {
  yield all([
    watchFetchResetLink()
  ]);
}
