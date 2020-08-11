import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loginRoutine, registerRoutine } from '../../Home/routines';
import { authUser, setToken } from '../../../services/auth.service';

export function* login(request: any) {
  try {
    const response = yield call(authUser, { endpoint: 'login', payload: request.payload });
    setToken(response.accessToken);

    yield put(loginRoutine.success());
  } catch (e) {
    yield put(loginRoutine.failure('Error'));
  }
}

function* watchLogin() {
  yield takeEvery(loginRoutine.TRIGGER, login);
}

export function* register(request: any) {
  try {
    const response = yield call(authUser, { endpoint: 'signup', payload: request.payload });
    setToken(response.accessToken);

    yield put(registerRoutine.success());
  } catch (e) {
    yield put(registerRoutine.failure('Error'));
  }
}

function* watchRegister() {
  yield takeEvery(registerRoutine.TRIGGER, register);
}

export default function* authSagas() {
  yield all([
    watchLogin(),
    watchRegister()
  ]);
}
