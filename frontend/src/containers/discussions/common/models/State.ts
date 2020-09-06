import { IDiscussionData } from '@containers/discussions/common/models/Data';
import { IRequestState } from '@models/IRequestState';

export interface IDiscussionState {
  requests: {
    fetchMessages: IRequestState;
    sendMessage: IRequestState;
  };
  data: IDiscussionData;
}
