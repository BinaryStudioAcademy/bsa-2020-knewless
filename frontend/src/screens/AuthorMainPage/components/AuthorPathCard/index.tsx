import React from 'react';
import { AuthorOptionsDropdown } from '../AuthorOptionsDropdown';
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
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export const AuthorPathCard: React.FunctionComponent<IAuthorPathCardProps> = (
  { name, logoSrc, courses, duration, onEditClick, onDeleteClick }
) => (
  <div className={styles.container}>
    <img src={logoSrc} className={styles.logo} alt="Path logo" />
    <div className={styles.title}>
      <span>{name}</span>
      <div className={styles.dropdown_right}>
        {(onEditClick || onDeleteClick) && (
        <AuthorOptionsDropdown
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
        )}
      </div>
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
