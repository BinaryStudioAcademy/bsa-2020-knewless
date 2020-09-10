import { ILecture } from '@screens/Favourites/models/ILecture';
import { IAuthor } from './IAuthor';
import { ICourse } from './ICourse';
import { IPath } from './IPath';
import { IFavouriteArticle } from '@screens/ArticlePage/models/domain';

export interface IFavouriteData {
  isCoursesFetched: boolean;
  isAuthorsFetched: boolean;
  isLecturesFetched: boolean;
  isPathsFetched: boolean;
  isArticlesFetched: boolean;
  courses: Array<ICourse>;
  lectures: Array<ILecture>;
  authors: Array<IAuthor>;
  paths: Array<IPath>;
  articles: Array<IFavouriteArticle>;
}
