import React from 'react';
import styles from './styles.module.sass';
import { Button } from 'semantic-ui-react';
import Avatar, { IAvatarProps } from '../Avatar';

export interface IAvatarUploader extends IAvatarProps {
  labelText?: string;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarUploader: React.FC<IAvatarUploader> = (
  { labelText = 'Update', handleFileUpload, imageSrc, round = true, ...props }
) => (
  <div className={styles.container}>
    <div className={styles.back} />
    <Avatar {...props} noPlaceholder imageSrc={imageSrc} round={round} className={styles.avatar} />
    <Button as="label" className={styles.avatarUploader}>
      {labelText}
      <input name="image" type="file" onChange={handleFileUpload} hidden />
    </Button>
  </div>
);

export default AvatarUploader;
