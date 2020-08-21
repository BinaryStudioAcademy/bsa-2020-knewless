import { IRequestState } from '@models/IRequestState';
import { ISavePasswordData } from './ISavePasswordData';

export interface ISavePasswordState {
    requests: {
      checkLinkRequest: IRequestState;
      savePasswordRequest: IRequestState;
    };
    data: ISavePasswordData;
  }