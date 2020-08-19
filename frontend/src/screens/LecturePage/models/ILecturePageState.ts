import { IRequestState } from '@models/IRequestState';

export interface ILecturePageState {
  lectureDto: any;
  lectureMenu: {lecturesMenuActiveItem: string};
  chosenVideo: {chosenVideo: string};
  requests: {
    dataRequest: IRequestState;
  };
}
