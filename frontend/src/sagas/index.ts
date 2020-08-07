import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import mainStudentPageSagas from '../screens/MainPage/containers/MainStudentPage/sagas';
import socketSagas from 'components/WebSocketNotifications/sagas';
import landingSagas from 'screens/Landing/sagas';
import addCourseSagas from 'screens/AddCourse/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    mainStudentPageSagas(),
    socketSagas(),
    landingSagas(),
    addCourseSagas()
  ]);
}
