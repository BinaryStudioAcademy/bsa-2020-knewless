import { Routine } from 'redux-saga-routines';
import { IStudent } from '../../models/IStudent';
import { IMainPageData } from '../../models/IMainStudentPageData';
import { ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps } from 'components/PathCard';
import {
  fetchAllGoalsRoutine,
  fetchContinueCoursesRoutine,
  fetchCurrentGoalProgressRoutine,
  fetchPathsRoutine,
  fetchRecommendedCoursesRoutine,
  fetchStudentRoutine
} from '../../routines';

const initialState: IMainPageData = {
  student: { } as IStudent,
  continueCourses: [] as ICourseCardProps[],
  recommendedCourses: [] as ICourseCardProps[],
  paths: [] as IPathCardProps[],
  goals: [],
  currentGoal: undefined
};

export const mainPageData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchContinueCoursesRoutine.SUCCESS:
      return {
        ...state,
        continueCourses: [...action.payload]
      };
    case fetchRecommendedCoursesRoutine.SUCCESS:
      return {
        ...state,
        recommendedCourses: [...action.payload]
      };
    case fetchPathsRoutine.SUCCESS:
      return {
        ...state,
        paths: [...action.payload]
      };
    case fetchStudentRoutine.SUCCESS:
      return {
        ...state,
        student: action.payload
      };
    case fetchAllGoalsRoutine.SUCCESS:
      return {
        ...state,
        goals: action.payload
      };
    case fetchCurrentGoalProgressRoutine.SUCCESS:
      return {
        ...state,
        currentGoal: action.payload
      };
    default:
      return state;
  }
};
