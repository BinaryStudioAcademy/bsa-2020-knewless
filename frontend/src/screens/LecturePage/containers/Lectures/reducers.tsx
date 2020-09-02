import { Routine } from 'redux-saga-routines';
import {
  chooseVideoRoutine,
  fetchCourseDtoRoutine,
  setMenuActiveItemRoutine,
  changeFavouriteLectureStateRoutine, chooseVideoQualityRoutine
} from 'screens/LecturePage/routines';
import { ICourseData } from '@screens/LecturePage/models/ICourseData';
import { ILecturesMenu } from 'screens/LecturePage/models/ILecturesMenu';
import { ILecturesList } from 'screens/LecturePage/models/ILecturesList';

const basicCourseData = {
  id: null,
  name: '',
  lectures: [{
    id: '',
    name: '',
    description: '',
    webLink: '',
    urlOrigin: '',
    url1080: '',
    url720: '',
    url480: '',
    duration: 0,
    progress: 0,
    favourite: undefined
  }],
  author: {
    firstName: '',
    lastName: ' ',
    id: null
  },
  reviewed: false
};

export const lectureDto = (state: ICourseData = basicCourseData, action: Routine<any>) => {
  switch (action.type) {
    case fetchCourseDtoRoutine.SUCCESS:
      return action.payload;
    case changeFavouriteLectureStateRoutine.SUCCESS: {
      const { lectures } = state;
      const { favourite, id } = action.payload;
      const mapper = lecture => {
        if (lecture.id !== id) return lecture;
        lecture.favourite = favourite;
        return lecture;
      };
      const updated = lectures.map(l => mapper(l));
      return {
        ...state,
        lectures: updated
      };
    }
    default:
      return state;
  }
};

const basicILecturesMenu = {
  lecturesMenuActiveItem: 'Lectures'
};

export const lectureMenu = (state: ILecturesMenu = basicILecturesMenu, action: Routine<any>) => {
  switch (action.type) {
    case setMenuActiveItemRoutine.SUCCESS:
      return action.payload;
    case setMenuActiveItemRoutine.TRIGGER:
      return action.payload;
    default:
      return state;
  }
};

const basicILecturesList = {
  chosenVideo: '',
  quality: 720
};

export const chosenVideo = (state: ILecturesList = basicILecturesList, action: Routine<any>) => {
  switch (action.type) {
    case chooseVideoRoutine.TRIGGER:
      return {
        ...state,
        chosenVideo: action.payload.chosenVideo
      };
    case chooseVideoQualityRoutine.FULFILL:
      return {
        ...state,
        quality: action.payload
      };
    default:
      return state;
  }
};
