import { ICourse } from 'screens/StudentPage/models/ICourse';

export interface IStudentProfile {
  courses?: ICourse [];
  totalContentWatched: number;
}
