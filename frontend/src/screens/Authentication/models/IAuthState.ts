import { IRequestState } from '../../../models/IRequestState';
import { IDataAuth } from './IDataAuth';

export interface IAuthState {
  requests: {
    loginRequest: IRequestState;
    registerRequest: IRequestState;
  };
  auth: IDataAuth;
}
