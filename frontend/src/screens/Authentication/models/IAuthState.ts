import { IRequestState } from '../../../models/IRequestState';
import { IDataLogin } from './IDataLogin';

export interface IAuthState {
  requests: {
    loginRequest: IRequestState;
  };
  login: IDataLogin;
}
