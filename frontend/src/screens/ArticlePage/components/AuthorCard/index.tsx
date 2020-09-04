import React from 'react';
import Ellipsis from 'react-ellipsis-pjs';
import styles from './styles.module.sass';
import { NavLink } from 'react-router-dom';
import { DEFAULT_AVATAR_IMG } from '@helpers/placeholder.helper';

interface IAuthorCardProps {
  name: string;
  biography: string;
  image?: string;
  id: string;
}

const AuthorCard: React.FC<IAuthorCardProps> = ({
  name,
  biography,
  image,
  id
}) => (
  <div className={styles.card}>
    <img src={image || DEFAULT_AVATAR_IMG} className={styles.author__image} alt="Author" />
    <div className={styles.wrapName}>
      <div className={styles.written}>
        WRITTEN BY
      </div>
      <div className={styles.name}>
        <NavLink exact to={`/author/${id}`}>
          <span>{`${name}`}</span>
        </NavLink>
      </div>
    </div>
    <div className={styles.biography}>
      <Ellipsis text={biography} lines={2} />
    </div>
  </div>
);

export default AuthorCard;
