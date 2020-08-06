import { IDataState } from '../screens/Home/models/IDataState';
import { ILandingState } from '../screens/Landing/models/ILandingState';

export interface IAppState {
  toastr: any;
  data: IDataState;
  landing: ILandingState;
}
