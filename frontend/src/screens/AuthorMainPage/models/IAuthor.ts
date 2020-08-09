import { ISchool } from './ISchool';

export interface IAuthor {
  id: string;
  name: string;
  roleName: string;
  avatar: string;
  school: ISchool;
  followers: number;
}
