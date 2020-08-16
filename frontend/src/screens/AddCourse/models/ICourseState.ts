import { IRequestState } from '@models/IRequestState';
import { ICourseData } from './ICourseData';

export interface ICourseState {
    requests: {
      // as you add more fields, please update screens\Home\models\IRequestState.ts
      dataRequest: IRequestState;
    };
    data: ICourseData;
  }