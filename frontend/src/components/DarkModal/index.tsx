import { Modal, ModalProps } from 'semantic-ui-react';
import React from 'react';
import styles from './styles.module.sass';

export const ModalDark: React.FC<ModalProps> = props => {
  const { className, children } = props;
  return (
    <Modal {...props} className={`${styles.container} ${className || ''}`}>
      {children}
    </Modal>
  );
};
