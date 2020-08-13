import { Routine } from 'redux-saga-routines';
import { fetchCourseDtoRoutine, setMenuActiveItemRoutine, chooseVideoRoutine } from 'screens/LecturePage/routines';
import { CourseData } from 'screens/LecturePage/models/CourseData';
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

export const lectureDto = (state: CourseData = basicCourseData, action: Routine<any>) => {
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
  choosedVideo: 'no choosed videos'
};

export const choosedVideo = (state: ILecturesList = basicILecturesList, action: Routine<any>) => {
  switch (action.type) {
    case chooseVideoRoutine.TRIGGER:
      return action.payload;
    default:
      return state;
  }
};

