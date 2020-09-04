import { RoleTypes } from '@containers/AppRouter/models/IRole';

export interface IMessage {
  id: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  user: IBriefUser;
}

export interface IBriefUser {
  id: string;
  username: string;
  email: string;
  role: RoleTypes;
}
