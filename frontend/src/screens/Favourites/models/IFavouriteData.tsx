import { ILecture } from '@screens/Favourites/models/ILecture';
import { IAuthor } from './IAuthor';
import { ICourse } from './ICourse';
import { IPath } from './IPath';

export interface IFavouriteData {
    isCoursesFetched: boolean,
    isAuthorsFetched: boolean,
    isLecturesFetched: boolean,
    isPathsFetched: boolean,
    courses: Array<ICourse>,
    lectures: Array<ILecture>,
    authors: Array<IAuthor>,
    paths: Array<IPath>
}