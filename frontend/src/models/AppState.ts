import { IDataState } from '../screens/Home/models/IDataState';
import { ILandingState } from '../screens/Landing/models/ILandingState';
import { IMainStudentPageState } from '../screens/MainPage/models/IMainStudentPageState';
import { IAuthorMainPageState } from '../screens/AuthorMainPage/models/IAuthorMainPageState';
import { IAuthState } from '../screens/Authentication/models/IAuthState';

export interface IAppState {
  toastr: any;
  data: IDataState;
  landing: ILandingState;
  mainPage: IMainStudentPageState;
  authorMainPage: IAuthorMainPageState;
  auth: IAuthState;
}
