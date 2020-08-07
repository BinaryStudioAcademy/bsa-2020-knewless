import { all } from 'redux-saga/effects';
import authorSettingsSagas from '../containers/Settings/sagas';

export default function* homeSagas() {
  yield all([
    authorSettingsSagas()
  ]);
}
