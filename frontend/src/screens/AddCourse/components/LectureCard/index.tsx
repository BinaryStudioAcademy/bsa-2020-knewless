import React, { useCallback } from 'react';
import styles from './styles.module.sass';

export interface ILectureCardProps {
  timeMinutes: number;
  name: string;
  description: string;
  onClick: () => void;
}

export const LectureCard: React.FC<ILectureCardProps> = ({
  timeMinutes, description, name, onClick
}) => (
  // eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events
  <div className={styles.lecture__container} onClick={onClick} role="button">
    <span className={styles.lecture__meta__nametitle}>Name</span>
    <span className={styles.lecture__meta__duration}>{`${timeMinutes} minutes`}</span>
    <span className={styles.lecture__meta__descriptiontitle}>Description</span>
    <span className={styles.lecture__descriptionbody}>{description}</span>
    <span className={styles.lecture__namebody}>{name}</span>
  </div>
);
