export interface IAuthorData {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  biography: string;
  schoolInfo: {
    id: string;
    name: string;
  };
  followers: number;
}
