import React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import styles from './styles.module.sass';

export const GradientButton: React.FC<ButtonProps> = props => {
  const { className } = props;
  return (
    <Button {...props} className={`${styles.gradient} ${className || ''}`} />
  );
};

export default GradientButton;
