export interface IPath {
  id?: string;
  name: string;
  courses: ICourse[];
  description: string;
  tags: string[];
}

export interface ICourse {
  id: string;
  name: string;
  category: string;
  author: string;
  timeMinutes: number;
  level: string;
}
