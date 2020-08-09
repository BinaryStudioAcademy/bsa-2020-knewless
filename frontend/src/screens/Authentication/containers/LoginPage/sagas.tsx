import { all, call, put, takeEvery } from 'redux-saga/effects';
import { callApi } from '../../../../helpers/api.helper';
import { loginRoutine } from '../../../Home/routines';
import { ACCESS_TOKEN } from '../../constants';

export function* login(request: any) {
  try {
    const requestArgs = { type: 'POST', endpoint: '/api/auth/login', requestData: request.payload };
    const response = (yield call(callApi, requestArgs)).json();
    response.then(res => {
      localStorage.setItem(ACCESS_TOKEN, res.accessToken);
    });

    yield put(loginRoutine.success());
  } catch (e) {
    yield put(loginRoutine.failure('Error'));
  }
}

function* watchLogin() {
  yield takeEvery(loginRoutine.TRIGGER, login);
}

export default function* loginSagas() {
  yield all([
    watchLogin()
  ]);
}
