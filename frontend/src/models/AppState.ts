import { IDataState } from '../screens/Home/models/IDataState';
import { ILandingState } from '../screens/Landing/models/ILandingState';
import { IMainStudentPageState } from '../screens/MainPage/models/IMainStudentPageState';

export interface IAppState {
  toastr: any;
  data: IDataState;
  landing: ILandingState;
  mainPage: IMainStudentPageState;
}
