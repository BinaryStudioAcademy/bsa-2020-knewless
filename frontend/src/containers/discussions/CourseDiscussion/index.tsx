import React, { useCallback, useEffect } from 'react';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import {
  fetchMessagesRoutine,
  receiveNewMessageRoutine,
  sendMessageRoutine
} from '@containers/discussions/CourseDiscussion/routines';
import { IBindingCallback1 } from '@models/Callbacks';
import { IMessage } from '@components/discussion/model';
import Discussion from '@components/discussion/Discussion';
import {
  extractMessageSending,
  extractMessageSendingError,
  extractMessagesFetching,
  extractMessages
} from '@containers/discussions/CourseDiscussion/rootReducer';
import { ISendMessageArgument } from '@containers/discussions/CourseDiscussion/service';
import { extractWSConnection } from '@containers/WebsocketConnector/model';

interface ICourseDiscussionProps {
  fetchMessages: IBindingCallback1<string>;
  sendMessage: IBindingCallback1<ISendMessageArgument>;
  receiveMessage: IBindingCallback1<IMessage>;
  courseId: string;
  authorId: string;
  yourId: string;
  messages: IMessage[];
  fetchLoading: boolean;
  sendLoading: boolean;
  errorSending: string;
  websocketConnection;
}

const CourseDiscussion: React.FunctionComponent<ICourseDiscussionProps> = ({
  fetchLoading, fetchMessages, sendMessage, sendLoading, messages, courseId, authorId, errorSending, yourId,
  receiveMessage, websocketConnection: io
}) => {
  const handleSendMessage = useCallback(text => sendMessage({ text, resourceId: courseId }), [courseId]);

  useEffect(() => {
    if (io) {
      io.on(`course:${courseId}`, (message: IMessage) => {
        receiveMessage(message);
      });
    }
    return () => {
      if (io) io.removeAllListeners(`course:${courseId}`);
    };
  }, [io]);

  return (
    <Discussion
      authorId={authorId}
      messages={messages}
      sendLoading={sendLoading}
      errorSending={errorSending !== undefined && errorSending !== null}
      sendMessage={handleSendMessage}
      fetchMessages={() => fetchMessages(courseId)}
      fetchLoading={fetchLoading}
      yourId={yourId}
    />
  );
};

const mapStateToProps = (state: IAppState) => ({
  messages: extractMessages(state),
  sendLoading: extractMessageSending(state),
  fetchLoading: extractMessagesFetching(state),
  errorSending: extractMessageSendingError(state),
  websocketConnection: extractWSConnection(state)
});

const mapDispatchToProps = {
  fetchMessages: fetchMessagesRoutine,
  sendMessage: sendMessageRoutine,
  receiveMessage: receiveNewMessageRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDiscussion);
