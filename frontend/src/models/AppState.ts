import { IDataState } from '@screens/Home/models/IDataState';
import { ILandingState } from '@screens/Landing/models/ILandingState';
import { ICourseState } from '@screens/AddCourse/models/ICourseState';
import { IMainStudentPageState } from '@screens/MainPage/models/IMainStudentPageState';
import { IAuthorMainPageState } from '@screens/AuthorMainPage/models/IAuthorMainPageState';
import { IAuthState } from '@screens/Authentication/models/IAuthState';
import { IAppRouterState } from '@containers/AppRouter/models/IAppRouterState';
import { IAddPathState } from '@screens/AddPath/models/AddPathState';
import { ICoursesState } from '@screens/Courses/models/ICoursesState';
import { ICoursePageState } from '@screens/CoursePage/models/ICoursePageState';
import { ILecturePageState } from '@screens/LecturePage/models/ILecturePageState';
import { IResetState } from '@screens/ResetPassword/models/IResetState';
import { ISavePasswordState } from '@screens/SavePassword/models/ISavePasswordState';
import { ISearchState } from '@screens/./Search/models/ISearchState';

export interface IAppState {
  toastr: any;
  data: IDataState;
  landing: ILandingState;
  addcourse: ICourseState;
  mainPage: IMainStudentPageState;
  authorMainPage: IAuthorMainPageState;
  auth: IAuthState;
  appRouter: IAppRouterState;
  addPathPage: IAddPathState;
  coursesPage: ICoursesState;
  search: ISearchState;
  coursePage: ICoursePageState;
  lecturePage: ILecturePageState;
  resetpassword: IResetState;
  savepassword: ISavePasswordState;
}
