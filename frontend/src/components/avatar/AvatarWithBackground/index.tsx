import React from 'react';
import Avatar, { IAvatarProps } from '../Avatar';
import styles from './styles.module.sass';

export type IAvatarWithGradientProps = IAvatarProps

const AvatarWithGradient: React.FC<IAvatarWithGradientProps> = (
  { imageSrc, round = true, className, ...props }
) => (
  <div className={`${styles.gradient} ${round && styles.rounded} ${className}`}>
    <Avatar {...props} imageSrc={imageSrc} className={styles.avatar} round={round} />
  </div>
);

export default AvatarWithGradient;
