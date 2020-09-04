import styles from './styles.module.sass';
import { IMessage } from '@components/discussion/model';
import { IContextProps, MessageBubble } from '@components/discussion/MessageBubble';
import React from 'react';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';

export interface IMessageListProps extends IContextProps {
  messages: IMessage[];
  loading: boolean;
}

export const MessageList: React.FC<IMessageListProps> = ({
  messages, loading, authorId, yourId
}) => (
  <div className={styles.container}>
    <InlineLoaderWrapper loading={loading} centered>
      {messages.length === 0 ? (
        <ListPlaceholder title="No commentaries here yet" />
      ) : (
        messages.map(m => (<MessageBubble key={m.id} message={m} authorId={authorId} yourId={yourId} />))
      )}
    </InlineLoaderWrapper>
  </div>
);
