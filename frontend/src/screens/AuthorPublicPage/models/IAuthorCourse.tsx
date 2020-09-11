import { Tag } from '@components/TagSelector';

export interface IAuthorCourse {
  id: string;
  name: string;
  level: string;
  author: string;
  tags: Tag[];
  imageSrc: string;
  duration: number;
  positiveReactions: number;
  allReactions: number;
  lectures: number;
  description: string;
  members?: number;
}
