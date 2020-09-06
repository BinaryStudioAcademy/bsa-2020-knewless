import React from 'react';
import noAvatar from '@images/no_avatar.jpg';
import styles from './styles.module.sass';
import { Placeholder, PlaceholderImage } from 'semantic-ui-react';

// eslint-disable-next-line max-len
export interface IAvatarProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  imageSrc: string;
  round?: boolean;
  noPlaceholder?: boolean;
  isLoading?: boolean;
}

const Avatar: React.FC<IAvatarProps> = (
  { imageSrc, round = true, noPlaceholder = false, isLoading = false, ...props }
) => {
  const { alt, className } = props;
  return (
    <>
      {isLoading ? (
        <Placeholder className={`${styles.rounded} ${styles.placeholder} ${className || ''}`} inverted>
          <PlaceholderImage />
        </Placeholder>
      ) : (
        <>
          {(imageSrc || !noPlaceholder) && (
            <img
              {...props}
              className={`${round && styles.rounded} ${className || ''} ${styles.avatar}`}
              src={imageSrc || noAvatar}
              alt={alt || 'Avatar logo'}
            />
          )}
        </>
      )}
    </>
  );
};

export default Avatar;
