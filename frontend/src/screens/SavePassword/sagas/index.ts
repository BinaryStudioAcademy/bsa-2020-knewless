import { all } from 'redux-saga/effects';
import savePassSagas from '../containers/SavePasswordPage/sagas';

export default function* savePasswordSagas() {
  yield all([
    savePassSagas()
  ]);
}
