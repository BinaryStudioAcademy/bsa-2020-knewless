import { IAuthorCourse } from './IAuthorCourse';
import { IAuthorArticles } from './IAuthorArticles';

export interface IAuthorData {
    id: string;
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
