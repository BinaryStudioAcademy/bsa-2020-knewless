import React, { RefObject } from 'react';
import styles from './styles.module.sass';
import { timeFormat } from '@helpers/time.helper';
import { Link } from 'react-router-dom';

export interface IPathCardProps {
  id?: string;
  name: string;
  logoSrc: string;
  courses: number;
  duration: number;
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
        {id ? <Link to={`/path/${id}`} className={styles.link}>{name}</Link>
          : <span>{name}</span>}
      </div>
      <div className={styles.meta}>
        <div>
          <span className={styles.indicator}>{courses}</span>
          <span> Courses</span>
        </div>
        <div>
          <span className={styles.indicator}>{timeFormat(duration)}</span>
        </div>
      </div>
    </div>
  </div>
);
