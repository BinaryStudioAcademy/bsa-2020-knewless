import { IRequestState } from "@models/IRequestState";
import { IHistoryData } from "./IHistoryData";

export interface IHistoryState {
  requests: {
    dataRequest: IRequestState;
  };
  data: IHistoryData;
}
