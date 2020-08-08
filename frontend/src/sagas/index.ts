import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import authorSettingsSagas from '../screens/AuthorSettings/sagas';
import mainStudentPageSagas from '../screens/MainPage/containers/MainStudentPage/sagas';
import socketSagas from 'components/WebSocketNotifications/sagas';
import landingSagas from 'screens/Landing/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    authorSettingsSagas(),
    mainStudentPageSagas(),
    socketSagas(),
    landingSagas()
  ]);
}
