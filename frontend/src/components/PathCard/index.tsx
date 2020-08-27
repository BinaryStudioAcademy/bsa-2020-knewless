import React, { RefObject } from 'react';
import styles from './styles.module.sass';

export interface IDuration {
  duration: number;
  timeUnit: string;
}

export interface IPathCardProps {
  id?: string;
  name: string;
  logoSrc: string;
  courses: number;
  duration: IDuration;
  imageRef?: RefObject<HTMLImageElement>;
  clickableImage?: boolean;
  className?: string;
}

export const PathCard: React.FunctionComponent<IPathCardProps> = (
  { id,
    name,
    logoSrc,
    courses,
    duration,
    imageRef,
    clickableImage = false,
    className
  }
) => (
  <div className={className || ''}>
    <div className={styles.container}>
      <img
        src={logoSrc}
        className={`${styles.logo} ${clickableImage && styles.clickable}`}
        alt="Path logo"
        ref={imageRef}
      />
      <div className={styles.title}>
        {id ? <a href={`/path/${id}`} className={styles.link}>{name}</a>
          : <span>{name}</span>}
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
  </div>
);
