import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import landing from '../screens/Landing/reducers';

export default combineReducers({
  toastr,
  data,
  landing
});
