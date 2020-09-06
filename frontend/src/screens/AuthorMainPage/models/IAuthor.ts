import { ISchool } from './ISchool';

export interface IAuthor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  schoolInfo: ISchool;
  followers: number;
}
