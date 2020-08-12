import React, { useCallback } from 'react';
import styles from './styles.module.sass';
import { minutesToDuration } from '../../../../components/PathCard/helper';
import { Label } from 'semantic-ui-react';

export interface ICourseCardProps {
  category: string;
  author: string;
  timeMinutes: number;
  level: string;
  name: string;
  previewSrc: string;
  onClick: () => void;
  // either addition or deletion
  isSelectedIcon?: boolean;
}

export const CourseCard: React.FC<ICourseCardProps> = ({
  category, author, timeMinutes, level, name, previewSrc,
  isSelectedIcon = true, onClick
}) => {
  const calcDuration = useCallback(() => minutesToDuration(timeMinutes), [timeMinutes]);
  const { timeUnit, duration } = calcDuration();
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img
          className={styles.image_preview}
          src={previewSrc || 'https://i.imgur.com/LFR6UaK.jpg'}
          alt="Lecture preview"
        />
      </div>
      <div className={styles.dependency__container}>
        <div className={styles.dependency__meta_container}>
          <span className={styles.dependency__meta__category}>{category}</span>
          <span className={styles.dependency__meta__author}>{author}</span>
          <div>
            <span className={styles.dependency__meta__time_duration}>{duration}</span>
            <span className={styles.dependency__meta__time_unit}>{timeUnit}</span>
          </div>
          <span className={styles.dependency__meta__level}>{level}</span>
        </div>
        <span className={styles.dependency__name}>{name}</span>
        <div className={styles.btn_container}>
          <Label
            icon={isSelectedIcon ? 'minus' : 'plus'}
            className={isSelectedIcon ? styles.btn_remove : styles.btn_add}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
