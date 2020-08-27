import { ILecture } from '@screens/AddCourse/models/ILecture';
import { IAuthor } from './IAuthor';
import { ICourse } from './ICourse';

export interface IFavouriteData {
    isCoursesFetched: boolean,
    isAuthorsFetched: boolean,
    isLecturesFetched: boolean,
    courses: Array<ICourse>,
    lectures: Array<ILecture>,
    authors: Array<IAuthor>
}