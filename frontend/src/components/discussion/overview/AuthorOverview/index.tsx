import { IBriefAuthorInfo } from '@containers/UserOverview/model';
import React from 'react';
import Avatar from '@components/avatar/Avatar';
import styles from './styles.module.sass';
import { Link } from 'react-router-dom';

export interface IAuthorOverviewProps {
  author: IBriefAuthorInfo;
}

export const AuthorOverview: React.FC<IAuthorOverviewProps> = (
  { author: { id, avatar, firstName, followers, lastName, schoolInfo } }
) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <Avatar className={styles.avatar_size} imageSrc={avatar} alt="Avatar" />
      <div className={styles.info}>
        <Link className={styles.fullname_hoverable} to={`/author/${id}`}>{`${firstName} ${lastName}`}</Link>
        <span className={styles.meta}>{`Followers: ${followers}`}</span>
      </div>
    </div>
    {/* The code below is for school displaying*/}
    {/* {schoolInfo && (*/}
    {/* <div className={styles.school_container}>*/}
    {/*  <img className={styles.school_image} src={schoolInfo.logo} alt="School logo" />*/}
    {/*  <span className={styles.elevated}>School:</span>*/}
    {/*  /!* <Link to={`/school/${schoolInfo.id}`} className={`${styles.elevated} ${styles.school_name}`}>*!/*/}
    {/*  /!*  {schoolInfo.name}*!/*/}
    {/*  /!* </Link>*!/*/}
    {/*  <span className={`${styles.elevated} ${styles.school_name}`}>{schoolInfo.name}</span>*/}
    {/*  <span className={`${styles.meta} ${styles.elevated}`}>{`Members: ${schoolInfo.membersCount}`}</span>*/}
    {/* </div>*/}
    {/* )}*/}
  </div>
);
