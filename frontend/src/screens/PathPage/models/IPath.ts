import { ICourse } from "@screens/PathPage/models/ICourse";
import { IAuthor } from "@screens/PathPage/models/IAuthor";

export interface IPath {
  name: string;
  description: string;
  imageSrc: string;
  duration: number;
  courses: ICourse[];
  author: IAuthor;
  authors: IAuthor[];
  userId: string;
}
