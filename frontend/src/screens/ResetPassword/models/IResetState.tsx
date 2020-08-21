import { IRequestState } from '@models/IRequestState';
import { IResetData } from './IResetData';

export interface IResetState {
    requests: {
      dataRequest: IRequestState;
    };
    data: IResetData;
  }