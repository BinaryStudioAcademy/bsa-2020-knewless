import { all } from 'redux-saga/effects';
import resetSagas from '../containers/ForgotPasswordPage/sagas';

export default function* resetPasswordSagas() {
  yield all([
    resetSagas()
  ]);
}
