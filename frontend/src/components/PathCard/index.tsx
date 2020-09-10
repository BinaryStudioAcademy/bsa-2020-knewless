import React, { RefObject } from 'react';
import styles from './styles.module.sass';
import { timeFormat } from '@helpers/time.helper';
import { NavLink, useLocation } from 'react-router-dom';
import noImage from '@images/no_image.png';
import { Label } from 'semantic-ui-react';

export interface IPathCardProps {
  id?: string;
  name: string;
  logoSrc: string;
  courses: number;
  duration: number;
  imageRef?: RefObject<HTMLImageElement>;
  clickableImage?: boolean;
  className?: string;
  released?: boolean;
  role?: string;
}

export const PathCard: React.FunctionComponent<IPathCardProps> = (
  { id,
    name,
    logoSrc,
    courses,
    duration,
    imageRef,
    clickableImage = false,
    className,
    released,
    role
  }
) => {
  const location = useLocation();
  return (
    <div className={className || ''}>
      <div className={styles.container}>
        {location.pathname === '/paths' && role === 'AUTHOR' && !released
      && (
      <NavLink exact to={`/path/edit/${id}`}>
        <Label
          as="a"
          basic
          className={styles.ribbon_label}
        >
          Draft
        </Label>
      </NavLink>
      )}
        <img
          src={logoSrc || noImage}
          className={`${styles.logo} ${clickableImage && styles.clickable}`}
          alt="Path logo"
          ref={imageRef}
        />
        <div className={styles.title}>
          {id ? (
            <NavLink exact to={released === false ? `/path/edit/${id}` : `/path/${id}`}>
              <span className={styles.link}>{name}</span>
            </NavLink>
          ) : <span>{name}</span>}
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
};
