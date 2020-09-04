import { IBriefStudentInfo } from '@containers/UserOverview/model';
import React from 'react';
import Avatar from '@components/avatar/Avatar';
import styles from './styles.module.sass';

export interface IStudentOverviewProps {
  student: IBriefStudentInfo;
}

export const StudentOverview: React.FC<IStudentOverviewProps> = (
  { student: { id, lastName, firstName, avatar, job } }
) => (
  <div>
    <div className={styles.header}>
      <Avatar className={styles.avatar_size} imageSrc={avatar} alt="Avatar" />
      <div className={styles.info}>
        {/* <Link to={`/student/${id}`} className={styles.fullname}>{`${firstName} ${lastName}`}</Link>*/}
        <span className={styles.fullname}>{`${firstName} ${lastName}`}</span>
        {job && <span className={styles.meta}>{`Job: ${job}`}</span>}
      </div>
    </div>
  </div>
);
