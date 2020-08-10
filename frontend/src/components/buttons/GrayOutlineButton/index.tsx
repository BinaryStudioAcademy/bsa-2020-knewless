import React from 'react';
import { Button, StrictButtonProps } from 'semantic-ui-react';
import styles from './styles.module.sass';

export const GrayOutlineButton: React.FC<StrictButtonProps> = props => {
  const { className } = props;
  return (
    <Button {...props} className={`${styles.gray_outline} ${className || ''}`} />
  );
};

export default GrayOutlineButton;
