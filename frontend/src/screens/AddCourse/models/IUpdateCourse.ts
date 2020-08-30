export interface IUpdateCourse {
  id: string;
  userId: string;
  name: string;
  image: string;
  lectures?: Array<string>;
  level: string;
  description: string;
  isReleased: boolean;
  uploadImage?: File;
}
