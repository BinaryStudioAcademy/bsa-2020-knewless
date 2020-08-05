import { Routine } from 'redux-saga-routines';
import { ISettings } from '../../models/ISettings';
import { fetchGetSettingsRoutine } from '../../routines';

const initSettings = {
  name: undefined,
  location: undefined,
  companyName: undefined,
  website: undefined,
  job: undefined,
  experience: undefined,
  level: undefined,
  industry: undefined,
  role: undefined,
  employment: undefined,
  education: undefined,
  years: undefined
};

export const settings = (state: ISettings = initSettings, action: Routine<any>) => {
  switch (action.type) {
    case fetchGetSettingsRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
