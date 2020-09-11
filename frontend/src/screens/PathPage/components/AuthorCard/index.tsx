import React from 'react';
import Ellipsis from 'react-ellipsis-pjs';
import styles from './styles.module.sass';
import Avatar from '@components/avatar/Avatar';

interface IAuthorCardProps {
  name: string;
  biography: string;
  imageSrc: string;
  followers: number;
}

const AuthorCard: React.FC<IAuthorCardProps> = ({
  name,
  biography,
  imageSrc,
  followers
}) => (
  <div className={styles.card}>
    <Avatar imageSrc={imageSrc} className={styles.author__image} alt="Author" />
    <div className={styles.info}>
      <div className={styles.name}>
        {name}
      </div>
      <div className={styles.biography}>
        <span className={styles.followers}>{followers === 1 ? '1 follower' : `${followers} followers`}</span>
        {biography && <div className={styles.biography_text}><Ellipsis text={biography} lines={2} /></div>}
      </div>
    </div>
  </div>
);

export default AuthorCard;
