import { IRole } from './IRole';

export interface IUser {
  id: string;
  nickname: string;
  role: IRole;
  avatar: string;
  email?: string;
}
