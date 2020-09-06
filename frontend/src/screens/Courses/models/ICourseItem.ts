export interface ICourseItem {
  id: string;
  name: string;
  authorId: string;
  authorName: string;
  level: string;
  imageSrc: string;
  releasedDate: Date;
  duration: number;
  description: string;
  lectures: number;
  rating: number;
  tags: string[];
  members: number;
  ratingCount: number;
}
