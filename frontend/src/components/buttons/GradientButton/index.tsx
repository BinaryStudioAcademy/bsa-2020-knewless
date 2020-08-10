import React from 'react';
import { Button, StrictButtonProps } from 'semantic-ui-react';
import styles from './styles.module.sass';

export const GradientButton: React.FC<StrictButtonProps> = props => {
  const { className } = props;
  return (
    <Button {...props} className={`${styles.gradient} ${className || ''}`} />
  );
};

export default GradientButton;
