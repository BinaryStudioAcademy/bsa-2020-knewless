import { Routine } from 'redux-saga-routines';
import { IAuthorSettings } from '../../models/ISettings';
import { fetchGetAuthorSettingsRoutine } from '../../routines';

const initSettings = {
  id: undefined,
  name: undefined,
  avatar: undefined,
  location: undefined,
  company: undefined,
  website: undefined,
  biography: undefined
  // job: undefined,
  // experience: undefined,
  // level: undefined,
  // industry: undefined,
  // role: undefined,
  // employment: undefined,
  // education: undefined,
  // years: undefined
};

export const authorSettings = (state: IAuthorSettings = initSettings, action: Routine<any>) => {
  switch (action.type) {
    case fetchGetAuthorSettingsRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
