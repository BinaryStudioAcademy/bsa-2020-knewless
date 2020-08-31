import React from 'react';
import Ellipsis from 'react-ellipsis-pjs';
import styles from './styles.module.sass';

interface IAuthorCardProps {
  name: string;
  biography: string;
  imageSrc: string;
}

const AuthorCard: React.FC<IAuthorCardProps> = ({
  name,
  biography,
  imageSrc
}) => (
  <div className={styles.card}>
    <img src={imageSrc} className={styles.author__image} alt="Author" />
    <div className={styles.name}>
      {name}
    </div>
    <div className={styles.biography}>
      <Ellipsis text={biography} lines={2} />
    </div>
  </div>
);

export default AuthorCard;
