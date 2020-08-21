import { takeEvery, put, call, all } from 'redux-saga/effects';
import { savePasswordRoutine, fetchIsLinkValidRoutine } from 'screens/SavePassword/routines';
import * as saveService from '../../services/savepassword.service';
import { Routine } from 'redux-saga-routines';
import { toastr } from 'react-redux-toastr';

function* fetchValidLink(action: Routine<any>) {
  try {
    const response = yield call(saveService.validateLink, action.payload);
    yield put(fetchIsLinkValidRoutine.success(response));
  } catch (error) {
    yield put(fetchIsLinkValidRoutine.failure(error?.message));
  }
}

function* watchCheckLink() {
  yield takeEvery(fetchIsLinkValidRoutine.TRIGGER, fetchValidLink);
}

function* savePassword(action: Routine<any>) {
  try {
    const response = yield call(saveService.savePassword, action.payload);
    yield put(savePasswordRoutine.success(response));
    if (!response.isSuccessfull) toastr.error(response.comment);
  } catch (error) {
    yield put(savePasswordRoutine.failure(error?.message));
  }
}

function* watchSavePassword() {
  yield takeEvery(savePasswordRoutine.TRIGGER, savePassword);
}

export default function* savePassSagas() {
  yield all([
    watchCheckLink(),
    watchSavePassword()
  ]);
}
