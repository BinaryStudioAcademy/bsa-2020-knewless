import { takeEvery, put, call, all } from 'redux-saga/effects';
import { addUsersToSocketPoolRoutine } from './routines';
import { postUserToPool } from './service';

function* addUserToPool(action) {
  try {
    const { username } = action.payload;
    yield call(() => postUserToPool(username));
    yield put(addUsersToSocketPoolRoutine.success());
    // toastr.success('User conected!');
  } catch (error) {
    yield put(addUsersToSocketPoolRoutine.failure(error?.message));
    // toastr.error('Autenthification failed!');
  }
}

function* watchAddRequest() {
  yield takeEvery(addUsersToSocketPoolRoutine.TRIGGER, addUserToPool);
}

export default function* notifySagas() {
  yield all([
    watchAddRequest()
  ]);
}
