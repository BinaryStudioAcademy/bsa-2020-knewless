import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import socketSagas from 'components/WebSocketNotifications/sagas';
import notificationSagas from 'containers/Notifications/sagas';
import authorSettingsSagas from '../screens/AuthorSettings/sagas';
import mainStudentPageSagas from '../screens/MainPage/containers/MainStudentPage/sagas';
import authorMainPageSagas from '../screens/AuthorMainPage/sagas';
import landingSagas from 'screens/Landing/sagas';
import authSagas from '../screens/Authentication/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    notificationSagas(),
    authorSettingsSagas(),
    mainStudentPageSagas(),
    authorMainPageSagas(),
    socketSagas(),
    landingSagas(),
    authSagas()
  ]);
}
