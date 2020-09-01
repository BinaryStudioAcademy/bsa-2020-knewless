export enum RoleTypes {
  USER='USER',
  AUTHOR='AUTHOR'
}

export interface IRole {
  name: RoleTypes;
}
