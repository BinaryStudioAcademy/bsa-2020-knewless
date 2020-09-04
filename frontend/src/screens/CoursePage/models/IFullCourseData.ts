import { IAuthorData } from '@screens/CoursePage/models/IAuthorData';
import { IAuthorCourseData } from '@screens/CoursePage/models/IAuthorCourseData';
import { ILectureData } from '@screens/CoursePage/models/ILectureData';
import { ITagData } from '@screens/CoursePage/models/ITagData';

export interface IFullCourseData {
  id: string;
  name: string;
  description: string;
  level: string;
  image: string;
  releasedDate: Date;
  author: IAuthorData;
  duration: number;
  rating: number;
  updatedAt: Date;
  authorCourses: IAuthorCourseData[];
  lectures: ILectureData[];
  tags: ITagData[];
  favourite: boolean;
  review: number;
  ratingCount: number;
  progress: number;
  overview: string;
}
