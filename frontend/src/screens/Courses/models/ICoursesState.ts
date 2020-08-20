import { ICoursesData } from './ICoursesData';
import { IRequestState } from '@models/IRequestState';

export interface ICoursesState {
  requests: {
    dataRequest: IRequestState;
  };
  data: ICoursesData;
}
