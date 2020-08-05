import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import settings from '../screens/AuthorSettings/reducer';

export default combineReducers({
  toastr,
  settings,
  data
});
