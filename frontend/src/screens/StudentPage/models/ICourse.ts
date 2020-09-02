import { Tag } from '@components/TagSelector';

export interface ICourse {
  id: string;
  name: string;
  category: string;
  author: string;
  tags: Tag[];
  timeSeconds: number;
  level: string;
  image: string;
  rating: number;
  progress: number;
}
