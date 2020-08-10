import { Routine } from 'redux-saga-routines';
import { IStudentSettings } from '../../models/IStudentSettings';
import { fetchGetStudentSettingsRoutine } from '../../routines';

const initSettings = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  avatar: undefined,
  location: undefined,
  company: undefined,
  job: undefined,
  website: undefined,
  biography: undefined,
  direction: undefined,
  experience: undefined,
  level: undefined,
  industry: undefined,
  role: undefined,
  employment: undefined,
  education: undefined,
  year: undefined
};

export const studentSettings = (state: IStudentSettings = initSettings, action: Routine<any>) => {
  switch (action.type) {
    case fetchGetStudentSettingsRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
