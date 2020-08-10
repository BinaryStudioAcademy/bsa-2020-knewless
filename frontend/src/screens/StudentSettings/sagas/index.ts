import { all } from 'redux-saga/effects';
import studentSettingsSagas from '../containers/Settings/sagas';

export default function* homeSagas() {
  yield all([
    studentSettingsSagas()
  ]);
}
