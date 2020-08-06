import { Routine } from 'redux-saga-routines';
import { IStudent } from '../../models/IStudent';
import { IMainPageData } from '../../models/IMainStudentPageData';
import { ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps } from 'components/PathCard';
import { fetchDataRoutine } from '../../routines';

const initialState: IMainPageData = {
  student: { } as IStudent,
  continueCourses: [] as ICourseCardProps[],
  recommendedCourses: [] as ICourseCardProps[],
  paths: [] as IPathCardProps[]
};

export const mainPageData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchDataRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
