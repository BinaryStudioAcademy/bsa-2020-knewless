import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import authorSettings from '../screens/AuthorSettings/reducer';
import mainPage from '../screens/MainPage/reducers';
import socket from '../components/WebSocketNotifications/reducer';
import landing from '../screens/Landing/reducers';

export default combineReducers({
  toastr,
  authorSettings,
  data,
  mainPage,
  socket,
  landing
});
