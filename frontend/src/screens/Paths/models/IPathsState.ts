import { IPathsData } from './IPathsData';
import { IRequestState } from '@models/IRequestState';

export interface IPathsState {
  requests: {
    // as you add more fields, please update screens\Home\models\IRequestState.ts
    dataRequest: IRequestState;
    pathsByTagRequest: IRequestState;
    allPathsRequest: IRequestState;
  };
  data: IPathsData;
}