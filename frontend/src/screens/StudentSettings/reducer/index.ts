import { combineReducers } from 'redux';
import { fetchGetStudentSettingsRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { studentSettings } from '../containers/Settings/reducer';

const requests = combineReducers({
  studentSettingsRequest: reducerCreator([fetchGetStudentSettingsRoutine.TRIGGER])
});

export default combineReducers({
  studentSettings,
  requests
});
