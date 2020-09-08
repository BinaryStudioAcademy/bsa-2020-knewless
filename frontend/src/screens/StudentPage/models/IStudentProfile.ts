import { ICourse } from 'screens/StudentPage/models/ICourse';
import { IStudentSubscriptions } from '@screens/StudentPage/containers/StudentProfilePage';

export interface IStudentProfile {
  courses?: ICourse [];
  totalContentWatched: number;
  subscriptions: IStudentSubscriptions[];
}
