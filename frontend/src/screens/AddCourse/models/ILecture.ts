export interface ILecture {
  id: string;
  name: string;
  description?: string;
  urlOrigin?: string;
  timeSeconds?: number;
  webLink?: string;
  tags?: string[];
}
