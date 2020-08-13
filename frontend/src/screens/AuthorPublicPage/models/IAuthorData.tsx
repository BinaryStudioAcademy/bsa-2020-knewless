import { IAuthorCourse } from "./IAuthorCourse";
import { IAuthorArticles } from "./IAuthorArticles";

export interface IAuthorData {
    avatar: string;
    firstName: string;
    lastName: string;
    biography: string;
    schoolName: string;
    schoolId: string;
    numberOfSubscribers: number;
    courses: IAuthorCourse[];
    articles: IAuthorArticles[];
    printFollowButton: boolean;
}