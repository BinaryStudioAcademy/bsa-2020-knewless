import React, { useCallback } from 'react';
import styles from './styles.module.sass';
import { minutesToDuration } from 'components/PathCard/helper';
import { StyledRating } from 'components/StyledRating';

export interface ICompletedCourseProps {
  category: string;
  author: string;
  timeMinutes: number;
  level: string;
  name: string;
  previewSrc: string;
  rating: number;
}

export const CompletedCourse: React.FC<ICompletedCourseProps> = ({
  category, author, timeMinutes, level, name, previewSrc,
  rating
}) => {
  const calcDuration = useCallback(() => minutesToDuration(timeMinutes), [timeMinutes]);
  const { timeUnit, duration } = calcDuration();
  const handleOnClick = () => {
    console.log('click');
  };
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <div className={styles.image_cover} />
        <img
          className={styles.image_preview}
          src={previewSrc || 'https://i.imgur.com/LFR6UaK.jpg'}
          alt="Lecture preview"
        />
      </div>
      <div className={styles.dependency__container}>
        <span className={styles.dependency__name} title={name}>{name}</span>
        <span className={styles.dependency__category}>{category}</span>
        <div className={styles.dependency__meta_container}>
          <div className={styles.dependency__meta__info_row}>
            <span className={styles.dependency__meta__author}>{author}</span>
            <div>
              <span className={styles.dependency__meta__time_duration}>{duration}</span>
              <span className={styles.dependency__meta__time_unit}>{timeUnit}</span>
            </div>
            <span className={styles.dependency__level}>{level}</span>
          </div>
          <StyledRating rating={rating} className={styles.dependency__rating} />
        </div>
        <div className={styles.wrapperProgress}>
          <div className={styles.progress}>
            100%
          </div>
        </div>
      </div>
    </div>
  );
};
