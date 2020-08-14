import React from 'react';
import noAvatar from '../../../assets/images/no_avatar.jpg';
import styles from './styles.module.sass';

// eslint-disable-next-line max-len
export interface IAvatarProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  imageSrc: string;
  round?: boolean;
  noPlaceholder?: boolean;
}

const Avatar: React.FC<IAvatarProps> = (
  { imageSrc, round = true, noPlaceholder = false, ...props }
) => {
  const { alt, className } = props;
  return (
    <>
      {(imageSrc || !noPlaceholder) && (
        <img
          {...props}
          className={`${round && styles.rounded} ${className} ${styles.avatar}`}
          src={imageSrc || noAvatar}
          alt={alt || 'Avatar logo'}
        />
      )}
    </>
  );
};

export default Avatar;
