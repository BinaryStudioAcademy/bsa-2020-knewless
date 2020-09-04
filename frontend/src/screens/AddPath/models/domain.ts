export interface IPath {
  id?: string;
  name: string;
  courses: ICourse[];
  description: string;
  tags: ITag[];
  imageTag: ITag;
}

export interface IPathDetails {
  id: string;
  name: string;
  courses: ICourse[];
  description: string;
  tags: ITag[];
  imageTag: ITag;
  duration: number;
  author: IAuthorShort;
}

export interface IAuthorShort {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ICourse {
  id: string;
  name: string;
  category: string;
  author: string;
  timeSeconds: number;
  level: string;
  image: string;
  rating: number;
  ratingCount: number;
}

export interface ITag {
  id: string;
  name: string;
  imageSrc: string;
}
