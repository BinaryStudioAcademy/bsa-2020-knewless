import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import studentSettingsSagas from '../screens/StudentSettings/sagas';
import notificationSagas from 'containers/Notifications/sagas';
import authorSettingsSagas from '../screens/AuthorSettings/sagas';
import studentProfileSagas from '../screens/StudentPage/sagas';
import mainPageSagas from '../screens/MainPage/containers/MainStudentPage/sagas';
import authorMainPageSagas from '../screens/AuthorMainPage/containers/MainPage/sagas';
import landingSagas from 'screens/Landing/sagas';
import lectureSagas from 'screens/LecturePage/sagas';
import authSagas from '../screens/Authentication/sagas';
import addCourseSagas from 'screens/AddCourse/sagas';
import publicAuthorSagas from '../screens/AuthorPublicPage/sagas';
import appRouterSagas from 'containers/AppRouter/sagas';
import addPathSagas from '../screens/AddPath/sagas';
import coursesSagas from '../screens/Courses/sagas';
import coursePageSagas from '@screens/CoursePage/sagas';
import pathPageSagas from '@screens/PathPage/sagas';
import searchSagas from '@screens/./Search/sagas/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    notificationSagas(),
    authorSettingsSagas(),
    studentSettingsSagas(),
    studentProfileSagas(),
    mainPageSagas(),
    authorMainPageSagas(),
    landingSagas(),
    lectureSagas(),
    authSagas(),
    addCourseSagas(),
    publicAuthorSagas(),
    appRouterSagas(),
    addPathSagas(),
    pathPageSagas(),
    coursesSagas(),
    addPathSagas(),
    coursePageSagas(),
    searchSagas()
  ]);
}
