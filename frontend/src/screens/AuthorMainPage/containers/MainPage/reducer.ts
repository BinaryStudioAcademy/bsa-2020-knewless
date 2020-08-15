import { Routine } from 'redux-saga-routines';
import { IAuthor } from '../../models/IAuthor';
import { ICourseCardProps } from '../../../../components/CourseCard';
import { IPathCardProps } from '../../../../components/PathCard';
import { IAuthorMainPageData } from '../../models/IAuthorMainPageData';
import { fetchAuthorRoutine, fetchAuthorCoursesRoutine, fetchAuthorPathsRoutine } from '../../routines';

const initialState: IAuthorMainPageData = {
  author: { } as IAuthor,
  authorCourses: [] as ICourseCardProps[],
  authorPaths: [] as IPathCardProps[]
};

export const authorMainPageData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchAuthorRoutine.SUCCESS:
      return {
        ...state,
        author: action.payload
      };
    case fetchAuthorCoursesRoutine.SUCCESS:
      return {
        ...state,
        authorCourses: [...action.payload]
      };
    case fetchAuthorPathsRoutine.SUCCESS:
      return {
        ...state,
        authorPaths: [...action.payload]
      };
    default:
      return state;
  }
};
