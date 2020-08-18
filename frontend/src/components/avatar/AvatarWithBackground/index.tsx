import React from 'react';
import Avatar, { IAvatarProps } from '../Avatar';
import styles from './styles.module.sass';

export interface IAvatarWithGradientProps extends IAvatarProps {
  animated?: boolean;
}

const AvatarWithGradient: React.FC<IAvatarWithGradientProps> = (
  { imageSrc, round = true, className, animated = true, ...props }
) => (
  <div className={`${styles.gradient} ${round && styles.rounded} ${animated && styles.animated} ${className}`}>
    <Avatar {...props} imageSrc={imageSrc} className={styles.avatar} round={round} />
  </div>
);

export default AvatarWithGradient;
