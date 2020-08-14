import { ISchool } from './ISchool';

export interface IAuthor {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  school: ISchool;
  followers: number;
}
