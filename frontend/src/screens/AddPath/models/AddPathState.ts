import { IAddPathData } from './AddPathData';
import { IRequestState } from '../../../models/IRequestState';

export interface IAddPathState {
  requests: {
    // as you add more fields, please update screens\AddPath\models\IRequestState.ts
    dataRequest: IRequestState;
  };
  data: IAddPathData;
}
