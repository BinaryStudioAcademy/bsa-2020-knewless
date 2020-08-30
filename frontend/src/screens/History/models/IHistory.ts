import { IHistoryLecture } from "./IHistoryLecture";

export interface IHistory {
  id: string;
  secondsWatched: number;
  lecture: IHistoryLecture;
  fractionWatched: number;
  tags: string[]
  updatedAt: string;
}