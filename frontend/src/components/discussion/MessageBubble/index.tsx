import styles from './styles.module.sass';
import React, { useCallback, useEffect, useState } from 'react';
import { IMessage } from '@components/discussion/model';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import { DarkPopup } from '@components/DarkAnimatedPopup';
import UserOverview from '@containers/UserOverview';

export interface IMessageBubbleProps extends IContextProps {
  message: IMessage;
}

export interface IContextProps {
  authorId: string;
  yourId: string;
}

export const MessageBubble: React.FC<IMessageBubbleProps> = (
  { message: { user, updatedAt, createdAt, text }, authorId, yourId }
) => {
  const [dateText, setDateText] = useState('');
  const [dateTooltip, setDateTooltip] = useState('');

  const updatedMoment = useCallback(() => moment(updatedAt), [updatedAt]);
  const createdMoment = useCallback(() => moment(createdAt), [createdAt]);

  useEffect(() => {
    if (createdMoment().diff(updatedMoment()) !== 0) {
      setDateText(`updated ${updatedMoment().fromNow()}`);
    } else {
      setDateText(createdMoment().fromNow());
    }
  }, [updatedAt, createdAt]);

  useEffect(() => {
    setDateTooltip(updatedMoment().format('LLL'));
  }, [updatedAt, createdAt]);

  return (
    <div className={styles.message__container}>
      <div className={styles.message__header}>
        {yourId !== undefined ? (
          <DarkPopup
            trigger={(
              <span className={`${user.id === yourId ? styles.message__nick_you : styles.message__nick}`}>
                {user.username || user.email}
              </span>
          )}
            content={
              <UserOverview userId={user?.id} role={user?.role} />
          }
          />
        ) : (
          <span className={styles.message__nick}>
            {user.username || user.email}
          </span>
        )}
        {user.id === authorId && (
          <DarkPopup
            trigger={<Icon className={styles.author_icon} name="user" />}
            content={<span>Author of the post</span>}
          />
        )}
        <DarkPopup
          trigger={<span className={styles.message__date}>{dateText}</span>}
          content={<span>{dateTooltip}</span>}
        />
      </div>
      <p className={styles.message__text}>{text}</p>
    </div>
  );
};
