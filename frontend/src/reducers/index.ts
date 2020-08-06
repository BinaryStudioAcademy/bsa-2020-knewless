import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import data from '../screens/Home/reducers';
import authorSettings from '../screens/AuthorSettings/reducer';

export default combineReducers({
  toastr,
  authorSettings,
  data
});
