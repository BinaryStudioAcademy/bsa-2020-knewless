import { IAuthorCourse } from './IAuthorCourse';
import { IAuthorArticles } from './IAuthorArticles';

export interface IAuthorData {
    userId: string;
    avatar: string;
    firstName: string;
    lastName: string;
    biography: string;
    schoolName: string;
    schoolId: string;
    numberOfSubscribers: number;
    courses: IAuthorCourse[];
    articles: IAuthorArticles[];
    favourite: boolean;
    printFollowButton: boolean;
}
