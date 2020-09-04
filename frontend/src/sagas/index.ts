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
import resetPasswordSagas from '../screens/ResetPassword/sagas';
import coursePageSagas from '@screens/CoursePage/sagas';
import savePasswordSagas from '@screens/SavePassword/sagas';
import coursesSagas from '../screens/Courses/sagas';
import pathPageSagas from '@screens/PathPage/sagas';
import searchSagas from '@screens/./Search/sagas/sagas';
import pathsPageSagas from '@screens/Paths/sagas';
import favouriteSagas from '@screens/Favourites/sagas';
import searchPageSagas from '@screens/SearchResultsPage/sagas';
import historyPageSagas from '@screens/History/sagas';
import addArticleSagas from '@screens/AddArticle/sagas';
import articlePageSagas from '@screens/ArticlePage/sagas';
import courseDiscussionSagas from '@containers/discussions/CourseDiscussion/sagas';
import lectureDiscussionSagas from '@containers/discussions/LectureDiscussion/sagas';
import websocketSagas from '@containers/WebsocketConnector/sagas';
import userOverviewSagas from '@containers/UserOverview/sagas';

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
    resetPasswordSagas(),
    savePasswordSagas(),
    coursesSagas(),
    coursePageSagas(),
    searchSagas(),
    pathsPageSagas(),
    searchPageSagas(),
    historyPageSagas(),
    favouriteSagas(),
    addArticleSagas(),
    articlePageSagas(),
    courseDiscussionSagas(),
    lectureDiscussionSagas(),
    websocketSagas(),
    userOverviewSagas()
  ]);
}
