import React from 'react';
import styles from './styles.module.sass';

export interface IDuration {
  duration: number;
  timeUnit: string;
}

export interface IPathCardProps {
  name: string;
  logoSrc: string;
  courses: number;
  duration: IDuration;
}

export const PathCard: React.FunctionComponent<IPathCardProps> = (
  { name, logoSrc, courses, duration }
) => (
  <div className={styles.container}>
    <img src={logoSrc} className={styles.logo} alt="Path logo" />
    <div className={styles.title}>{name}</div>
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
