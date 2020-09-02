import { IUser } from './IUser';
import { RoleTypes } from './IRole';

export interface IAppRouterState {
  user: IUser;
  settingsMode: RoleTypes;
  roleLoading: boolean;
  userLoading: boolean;
  settingsFilled: boolean;
}
