import { combineReducers } from 'redux';
import { fetchGetStudentProfileRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { studentProfile } from '../containers/StudentProfilePage/reducer';

const requests = combineReducers({
  studentProfileRequest: reducerCreator([fetchGetStudentProfileRoutine.TRIGGER])
});

export default combineReducers({
  studentProfile,
  requests
});
