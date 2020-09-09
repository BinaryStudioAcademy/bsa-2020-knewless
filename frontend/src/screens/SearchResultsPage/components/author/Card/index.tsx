import React from 'react';
import styles from './styles.module.sass';
import noAvatar from 'assets/images/no_avatar.jpg';
import { NavLink } from 'react-router-dom';

export interface IAuthorCardProps {
  id: string;
  image: string;
  name: string;
}

export const AuthorCard: React.FC<IAuthorCardProps> = (
  { id, image, name }
) => (
  <div className={styles.container}>
    <img src={image || noAvatar} className={styles.author_image} alt="Author" />
    <NavLink exact to={`/author/${id}`}>
      <h1 className={styles.author_name}>
        {`${name}` || ''}
      </h1>
    </NavLink>
  </div>
);
