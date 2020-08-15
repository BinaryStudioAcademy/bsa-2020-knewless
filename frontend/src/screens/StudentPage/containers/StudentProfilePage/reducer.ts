import { Routine } from 'redux-saga-routines';
import { IStudentProfile } from '../../models/IStudentProfile';
import { fetchGetStudentProfileRoutine } from 'screens/StudentPage/routines';

const initProfile = {
  totalContentWatched: 0,
  courses: undefined
};

export const studentProfile = (state: IStudentProfile = initProfile, action: Routine<any>) => {
  switch (action.type) {
    case fetchGetStudentProfileRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
