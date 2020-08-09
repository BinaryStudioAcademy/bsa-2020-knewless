import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import notify from '../containers/Notifications/reducer';
import authorSettings from '../screens/AuthorSettings/reducer';
import mainPage from '../screens/MainPage/reducers';
import socket from '../components/WebSocketNotifications/reducer';
import landing from '../screens/Landing/reducers';
import addcourse from '../screens/AddCourse/reducers';
import auth from '../screens/Authentication/reducer';

export default combineReducers({
  toastr,
  authorSettings,
  data,
  landing,
  auth,
  mainPage,
  socket,
  addcourse,
  notify
});
