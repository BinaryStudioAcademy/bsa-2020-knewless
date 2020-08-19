import { Routine } from 'redux-saga-routines';
import { IStudentSettings } from '../../models/IStudentSettings';
import { ITag } from '../../models/ITag';
import { fetchGetStudentSettingsRoutine, fetchAllTagsRoutine } from '../../routines';

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
  year: undefined,
  tags: []
};

export const studentSettings = (state: IStudentSettings = initSettings, action: Routine<any>) => {
  switch (action.type) {
    case fetchGetStudentSettingsRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const basicTag = {
  id: undefined,
  name: undefined,
  imageSrc: undefined
}

export const getAllTags = (state: ITag[] = [basicTag], action: Routine<any>) => {
  switch(action.type) {
    case fetchAllTagsRoutine.SUCCESS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};