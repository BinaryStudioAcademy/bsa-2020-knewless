import { IRole } from './IRole';

export interface IUser {
  id: string;
  nickname: string;
  emailVerified: boolean;
  role: IRole;
  avatar: string;
  email?: string;
}
