import React, { useCallback } from 'react';
import styles from './styles.module.sass';
import { minutesToDuration } from '@components/PathCard/helper';
import { Label } from 'semantic-ui-react';
import { StyledRating } from '@components/StyledRating';
import { timeFormat } from '@helpers/time.helper';
import { DEFAULT_PREVIEW_IMG } from '@helpers/placeholder.helper';

export interface ICourseCardProps {
  author: string;
  timeMinutes: number;
  level: string;
  name: string;
  previewSrc: string;
  onClick: () => void;
  rating: number;
  // either addition or deletion
  isSelectedIcon?: boolean;
  ratingCount: number;
}

export const CourseCard: React.FC<ICourseCardProps> = ({
  author, timeMinutes, level, name, previewSrc, isSelectedIcon = true, onClick, rating
}) => {
  const calcDuration = useCallback(() => minutesToDuration(timeMinutes), [timeMinutes]);
  const { timeUnit, duration } = calcDuration();
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <div className={styles.image_cover} />
        <img
          className={styles.image_preview}
          src={previewSrc || DEFAULT_PREVIEW_IMG}
          alt="Lecture preview"
        />
      </div>
      <div className={styles.dependency__container}>
        <span className={styles.dependency__name} title={name}>{name}</span>
        <div className={styles.dependency__meta_container}>
          <div className={styles.dependency__meta__info_row}>
            <span className={styles.dependency__meta__author}>{author}</span>
            <div>
              <span className={styles.dependency__meta__time_duration}>{timeFormat(timeMinutes)}</span>
            </div>
            <span className={styles.dependency__level}>{level}</span>
          </div>
          <StyledRating rating={rating} className={styles.dependency__rating} />
        </div>
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
