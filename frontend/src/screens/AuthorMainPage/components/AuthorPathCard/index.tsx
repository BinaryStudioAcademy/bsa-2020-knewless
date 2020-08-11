import React from 'react';
import styles from './styles.module.sass';

export interface IDuration {
  duration: number;
  timeUnit: string;
}

export interface IAuthorPathCardProps {
  name: string;
  logoSrc: string;
  courses: number;
  duration: IDuration;
}

export const AuthorPathCard: React.FunctionComponent<IAuthorPathCardProps> = (
  { name, logoSrc, courses, duration }
) => (
  <div className={styles.container}>
    <img src={logoSrc} className={styles.logo} alt="Path logo" />
    <div className={styles.header}>
      <span className={styles.header__title}>{name}</span>
    </div>
    <div className={styles.meta}>
      <div>
        <span className={styles.indicator}>{courses}</span>
        <span> Courses</span>
      </div>
      <div>
        <span className={styles.indicator}>{duration.duration}</span>
        <span>{` ${duration.timeUnit}`}</span>
      </div>
    </div>
  </div>
);
