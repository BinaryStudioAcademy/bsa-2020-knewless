import React from 'react';
import styles from './styles.module.sass';
import { InputBlock } from '@components/discussion/InputBlock';
import { IMessage } from '@components/discussion/model';
import { MessageList } from '@components/discussion/MessageList';
import { IContextProps } from '@components/discussion/MessageBubble';

export interface IDiscussionBlockProps extends IContextProps {
  messages: IMessage[];
  sendMessage: (message: string) => void;
  sendLoading: boolean;
  errorSending: boolean;
  fetchLoading: boolean;
}

export const DiscussionBlock: React.FC<IDiscussionBlockProps> = (
  { messages, sendLoading, sendMessage, fetchLoading, authorId, errorSending, yourId }
) => (
  <div className={styles.discussionContainer}>
    <div className={styles.messageListContainer}>
      <MessageList messages={messages} loading={fetchLoading} authorId={authorId} yourId={yourId} />
    </div>
    <div className={styles.inputContainer}>
      {yourId && <InputBlock sendLoading={sendLoading} sendMessage={sendMessage} errorSending={errorSending} />}
    </div>
  </div>
);
