export interface ILectureData {
  id: string;
  name: string;
  description: string;
  timeSeconds: number;
  favourite: boolean;
  urlOrigin?: string;
  tags: string[];
}
