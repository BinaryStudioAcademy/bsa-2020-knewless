import React, { useState } from 'react';
import styles from './styles.module.sass';
import { IAuthor } from '@screens/Favourites/models/IAuthor';
import { history } from '@helpers/history.helper';
import { Label, Icon } from 'semantic-ui-react';
import AvatarWithGradient from '@components/avatar/AvatarWithBackground';
import noAvatar from '@images/no_avatar.jpg';

interface IAuthorRowProps {
  author: IAuthor;
  remove: (id: string) => void
}

export const AuthorRow: React.FunctionComponent<IAuthorRowProps> = ({
  author, remove
}) => {
  const redirectToAuthor = () => {
    history.push(`/author/${author.id}`);
  }
  return (
    <div className={styles.row}>
      <div onClick={() => redirectToAuthor()} className={styles.gridrow}>
        <div className={styles.content_item__first}>
          <div className={styles.avatar_wrp}>
            <AvatarWithGradient
              className={styles.author_avatar}
              imageSrc={author.avatar || noAvatar}
              alt={author.name}
            />
          </div>
        </div>
        <div className={styles.content_name}>{author.name}</div>
        <div className={styles.content_item}>{author.school? author.school : '-'}</div>
        <div className={styles.color_item}>{author.followers}</div>
        <div className={styles.content_item}>{author.paths}</div>
        <div className={styles.content_item}>{author.courses}</div>
      </div>
      <div className={styles.icon_wrp}>
        <Label
          basic
          size="tiny"
          as="a"
          className={styles.toolBarIcon}
          onClick={() => remove(author.id)}
        >
          <Icon name="minus" size="large" inverted />
        </Label>
      </div>
    </div>
  );
};

