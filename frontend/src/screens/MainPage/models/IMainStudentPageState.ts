import { IRequestState } from '../../../models/IRequestState';
import { IMainPageData } from './IMainStudentPageData';

export interface IMainStudentPageState {
  requests: {
    dataRequest: IRequestState;
  };
  mainPageData: IMainPageData;
}
