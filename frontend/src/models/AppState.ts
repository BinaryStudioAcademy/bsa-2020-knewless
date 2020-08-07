import { IDataState } from '../screens/Home/models/IDataState';
import { ILandingState } from '../screens/Landing/models/ILandingState';
import { ICourseState } from '../screens/AddCourse/models/ICourseState';

export interface IAppState {
  toastr: any;
  data: IDataState;
  landing: ILandingState;
  addcourse: ICourseState;
}
