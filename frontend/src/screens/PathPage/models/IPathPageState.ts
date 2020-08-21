import { IRequestState } from '@models/IRequestState';
import { IPathPageData } from '@screens/PathPage/models/IPathPageData';

export interface IPathPageState {
  requests: {
    dataRequest: IRequestState;
  };
  pathData: IPathPageData;
}
