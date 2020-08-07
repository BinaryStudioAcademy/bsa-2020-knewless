import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import socket from '../components/WebSocketNotifications/reducer';
import landing from '../screens/Landing/reducers';
import addcourse from '../screens/AddCourse/reducers';

export default combineReducers({
  toastr,
  data,
  socket,
  landing,
  addcourse
});
