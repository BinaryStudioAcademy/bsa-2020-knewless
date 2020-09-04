import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import notify from '../containers/Notifications/reducer';
import authorSettings from '../screens/AuthorSettings/reducer';
import studentSettings from '../screens/StudentSettings/reducer';
import studentProfile from '../screens/StudentPage/reducer';
import mainPage from '../screens/MainPage/reducers';
import authorMainPage from '../screens/AuthorMainPage/reducers';
import landing from '../screens/Landing/reducers';
import lecturePage from '../screens/LecturePage/reducers/index';
import auth from '../screens/Authentication/reducer';
import addcourse from '../screens/AddCourse/reducers';
import authorPublicData from '../screens/AuthorPublicPage/reducers';
import { appRouter } from 'containers/AppRouter/reducer';
import addPathPage from '../screens/AddPath/reducers';
import coursesPage from '../screens/Courses/reducers';
import search from '../screens/Search/reducer/reducer';
import coursePage from '../screens/CoursePage/reducers';
import resetpassword from '../screens/ResetPassword/reducers';
import savepassword from '../screens/SavePassword/reducers';
import pathPage from '../screens/PathPage/reducers';
import pathsPage from '../screens/Paths/reducers';
import { loginModal } from '@containers/LoginModal/reducer';
import favourites from '../screens/Favourites/reducers';
import searchPage from '@screens/SearchResultsPage/reducers';
import historyPage from '@screens/History/reducers';
import addArticlePage from '../screens/AddArticle/reducers';
import articlePage from '../screens/ArticlePage/reducers';
import courseDiscussion from '@containers/discussions/CourseDiscussion/rootReducer';
import lectureDiscussion from '@containers/discussions/LectureDiscussion/rootReducer';
import websocket from '@containers/WebsocketConnector/rootReducer';
import userOverview from '@containers/UserOverview/rootReducer';

export default combineReducers({
  toastr,
  authorSettings,
  studentSettings,
  studentProfile,
  data,
  notify,
  lecturePage,
  mainPage,
  authorMainPage,
  landing,
  addcourse,
  auth,
  authorPublicData,
  appRouter,
  addPathPage,
  coursePage,
  resetpassword,
  savepassword,
  pathPage,
  coursesPage,
  search,
  loginModal,
  pathsPage,
  favourites,
  searchPage,
  historyPage,
  addArticlePage,
  articlePage,
  courseDiscussion,
  lectureDiscussion,
  websocket,
  userOverview
});
