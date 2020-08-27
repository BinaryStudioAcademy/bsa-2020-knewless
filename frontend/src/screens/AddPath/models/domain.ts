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
}

export interface ITag {
  id: string;
  name: string;
  imageSrc: string;
}
