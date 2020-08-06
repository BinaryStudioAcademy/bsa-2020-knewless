import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import authorSettingsSagas from 'screens/AuthorSettings/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    authorSettingsSagas()
  ]);
}
