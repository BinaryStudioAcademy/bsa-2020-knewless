import { ILandingData } from './ILandingData';
import { IRequestState } from '../../../models/IRequestState';

export interface ILandingState {
  requests: {
    // as you add more fields, please update screens\Home\models\IRequestState.ts
    dataRequest: IRequestState;
  };
  data: ILandingData;
}
