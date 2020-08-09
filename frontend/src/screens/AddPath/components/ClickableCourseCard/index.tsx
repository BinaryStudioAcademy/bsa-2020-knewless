import React, { useCallback } from 'react';
import styles from '../../../../components/DependenciesSelector/styles.module.sass';
import { minutesToDuration } from '../../../../components/PathCard/helper';

export interface ICourseCardProps {
  category: string;
  author: string;
  timeMinutes: number;
  level: string;
  name: string;
  onClick: () => void;
}

export const CourseCard: React.FC<ICourseCardProps> = ({
  category, author, timeMinutes, level, name, onClick
}) => {
  const calcDuration = useCallback(() => minutesToDuration(timeMinutes), [timeMinutes]);

  return (
  // eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events
    <div className={styles.dependency__container} onClick={onClick} role="button">
      <span className={styles.dependency__meta__category}>{category}</span>
      <span className={styles.dependency__meta__author}>{author}</span>
      <span className={styles.dependency__meta__time}>{`${calcDuration().duration} ${calcDuration().timeUnit}`}</span>
      <span className={styles.dependency__meta__level}>{level}</span>
      <span className={styles.dependency__name}>{name}</span>
    </div>
  );
};
