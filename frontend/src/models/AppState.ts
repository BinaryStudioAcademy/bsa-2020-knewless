import { IDataState } from '../screens/Home/models/IDataState';
import { ILandingState } from '../screens/Landing/models/ILandingState';
import { ICourseState } from '../screens/AddCourse/models/ICourseState';
import { IMainStudentPageState } from '../screens/MainPage/models/IMainStudentPageState';
import { IAuthorMainPageState } from '../screens/AuthorMainPage/models/IAuthorMainPageState';
import { IAuthState } from '../screens/Authentication/models/IAuthState';

export interface IAppState {
  toastr: any;
  data: IDataState;
  landing: ILandingState;
  addcourse: ICourseState;
  mainPage: IMainStudentPageState;
  authorMainPage: IAuthorMainPageState;
  auth: IAuthState;
}
