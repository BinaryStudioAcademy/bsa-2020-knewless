import { IRequestState } from '@models/IRequestState';

export interface ILecturePageState {
  lectureDto: any;
  lectureMenu: {lecturesMenuActiveItem: string};
  chosenVideo: {chosenVideo: string; quality: number};
  requests: {
    dataRequest: IRequestState;
  };
}
