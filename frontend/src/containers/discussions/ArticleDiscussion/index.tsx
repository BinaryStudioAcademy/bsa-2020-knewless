import React, { useCallback, useEffect } from 'react';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import {
  fetchMessagesRoutine,
  receiveNewMessageRoutine,
  sendMessageRoutine
} from '@containers/discussions/ArticleDiscussion/routines';
import { IBindingCallback1 } from '@models/Callbacks';
import { IMessage } from '@components/discussion/model';
import Discussion from '@components/discussion/Discussion';
import {
  extractMessageSending,
  extractMessageSendingError,
  extractMessagesFetching,
  extractMessages
} from '@containers/discussions/ArticleDiscussion/rootReducer';
import { ISendMessageArgument } from '@containers/discussions/CourseDiscussion/service';
import { extractWSConnection } from '@containers/WebsocketConnector/model';

interface IArticleDiscussionProps {
  fetchMessages: IBindingCallback1<string>;
  sendMessage: IBindingCallback1<ISendMessageArgument>;
  receiveMessage: IBindingCallback1<IMessage>;
  articleId: string;
  authorId: string;
  yourId: string;
  messages: IMessage[];
  fetchLoading: boolean;
  sendLoading: boolean;
  errorSending: string;
  websocketConnection;
}

const ArticleDiscussion: React.FunctionComponent<IArticleDiscussionProps> = ({
  fetchLoading, fetchMessages, sendMessage, sendLoading, messages, articleId,
  authorId, errorSending, yourId, receiveMessage, websocketConnection: io
}) => {
  const handleSendMessage = useCallback(text => sendMessage({ text, resourceId: articleId }), [articleId]);

  useEffect(() => {
    if (io) {
      io.on(`article:${articleId}`, (message: IMessage) => {
        receiveMessage(message);
      });
    }
    return () => {
      if (io) io.removeAllListeners(`article:${articleId}`);
    };
  }, [io]);

  return (
    <Discussion
      authorId={authorId}
      messages={messages}
      sendLoading={sendLoading}
      errorSending={errorSending !== undefined && errorSending !== null}
      sendMessage={handleSendMessage}
      fetchMessages={() => fetchMessages(articleId)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDiscussion);
