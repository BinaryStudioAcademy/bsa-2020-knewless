import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import settingsSagas from 'screens/AuthorSettings/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    settingsSagas()
  ]);
}
