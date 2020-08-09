import { all } from 'redux-saga/effects';
import loginSagas from '../containers/LoginPage/sagas';

export default function* authSagas() {
  yield all([
    loginSagas()
  ]);
}
