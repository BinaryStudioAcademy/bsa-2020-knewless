import { Routine } from 'redux-saga-routines';
import { chooseVideoRoutine, fetchCourseDtoRoutine, setMenuActiveItemRoutine } from 'screens/LecturePage/routines';
import { ICourseData } from '@screens/LecturePage/models/ICourseData';
import { ILecturesMenu } from 'screens/LecturePage/models/ILecturesMenu';
import { ILecturesList } from 'screens/LecturePage/models/ILecturesList';

const basicCourseData = {
  id: null,
  name: 'Unspecified course!',
  lectures: [{
    id: 'undefined',
    description: 'undefined',
    sourceUrl: 'undefined',
    duration: 0
  }],
  author: {
    firstName: 'Unspecified ',
    lastName: ' author!',
    id: null
  }
};

export const lectureDto = (state: ICourseData = basicCourseData, action: Routine<any>) => {
  switch (action.type) {
    case fetchCourseDtoRoutine.SUCCESS:
      return action.payload;
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
  chosenVideo: 'no chosen videos'
};

export const chosenVideo = (state: ILecturesList = basicILecturesList, action: Routine<any>) => {
  switch (action.type) {
    case chooseVideoRoutine.TRIGGER:
      return action.payload;
    default:
      return state;
  }
};

