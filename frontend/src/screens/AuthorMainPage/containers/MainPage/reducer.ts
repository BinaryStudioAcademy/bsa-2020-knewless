import { Routine } from 'redux-saga-routines';
import { IAuthor } from '../../models/IAuthor';
import { ICourseCardProps } from '../../../../components/CourseCard';
import { IPathCardProps } from '../../../../components/PathCard';
import { IAuthorMainPageData } from '../../models/IAuthorMainPageData';
import { fetchAuthorDataRoutine } from '../../routines';

const initialState: IAuthorMainPageData = {
  author: { } as IAuthor,
  courses: [] as ICourseCardProps[],
  paths: [] as IPathCardProps[]
};

export const authorMainPageData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchAuthorDataRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
