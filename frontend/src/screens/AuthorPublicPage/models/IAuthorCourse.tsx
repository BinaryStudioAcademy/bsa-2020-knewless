import { Tag } from '@components/TagSelector';

export interface IAuthorCourse {
  id: string;
  name: string;
  level: string;
  author: string;
  category: string;
  tags: Tag[];
  imageSrc: string;
  duration: number;
}
