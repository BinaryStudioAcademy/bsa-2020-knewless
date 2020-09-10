export interface IUpdateCourse {
  id: string;
  userId: string;
  name: string;
  image: string;
  lectures?: Array<{id: string; index: number}>;
  level: string;
  description: string;
  isReleased: boolean;
  uploadImage?: File;
}
