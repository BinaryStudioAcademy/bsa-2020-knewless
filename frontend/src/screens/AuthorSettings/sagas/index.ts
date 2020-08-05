import { all } from 'redux-saga/effects';
import settingsSagas from '../containers/Settings/sagas';

export default function* homeSagas() {
  yield all([
    settingsSagas()
  ]);
}
