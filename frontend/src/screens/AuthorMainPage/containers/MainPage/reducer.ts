import { Routine } from 'redux-saga-routines';
import { IAuthor } from '../../models/IAuthor';
import { ICourseCardProps } from '@components/CourseCard';
import { IPathCardProps } from '@components/PathCard';
import { IAuthorMainPageData } from '../../models/IAuthorMainPageData';
import { fetchAuthorCoursesRoutine, fetchAuthorPathsRoutine, fetchAuthorRoutine } from '../../routines';
import {setNoAuthorizedRoutine} from "@screens/Home/routines";

const initialState: IAuthorMainPageData = {
  author: { } as IAuthor,
  authorCourses: [] as ICourseCardProps[],
  authorPaths: [] as IPathCardProps[],
  pathsLoaded: false,
  coursesLoaded: false,
  authorLoaded: false
};

export const authorMainPageData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchAuthorRoutine.SUCCESS:
      return {
        ...state,
        author: action.payload,
        authorLoaded: true
      };
    case fetchAuthorCoursesRoutine.SUCCESS:
      return {
        ...state,
        authorCourses: [...action.payload],
        coursesLoaded: true
      };
    case fetchAuthorPathsRoutine.SUCCESS:
      return {
        ...state,
        authorPaths: [...action.payload],
        pathsLoaded: true
      };
    case setNoAuthorizedRoutine.TRIGGER:
      return {
        ...state,
        author: {}
      };
    default:
      return state;
  }
};
