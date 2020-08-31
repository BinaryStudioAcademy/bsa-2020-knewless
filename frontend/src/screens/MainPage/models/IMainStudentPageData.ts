import { ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps } from 'components/PathCard';
import { IStudent } from './IStudent';
import { IPersonalGoalItem, IPersonalGoalProgress } from '@screens/MainPage/models/PersonalGoal';
import { IAppState } from '@models/AppState';

export interface IMainPageData {
  student: IStudent;
  continueCourses: ICourseCardProps[];
  recommendedCourses: ICourseCardProps[];
  paths: IPathCardProps[];
  goals: IPersonalGoalItem[];
  currentGoal: IPersonalGoalProgress | undefined;
}

export const extractGoals = (state: IAppState) => state.mainPage.mainPageData.goals;
export const extractCurrentGoal = (state: IAppState) => state.mainPage.mainPageData.currentGoal;
