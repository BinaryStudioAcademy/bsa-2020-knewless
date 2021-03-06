import React from 'react';
import { Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';
import GrayOutlineButton from '../buttons/GrayOutlineButton';
import GradientButton from '../buttons/GradientButton';
import styles from './styles.module.sass';
import { ModalDark } from '@components/DarkModal';

export interface IConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  title?: string;
  text?: string;
  okText?: string;
  cancelText?: string;
  className?: string;
}

const ConfirmationModal: React.FC<IConfirmationProps> = (
  { onConfirm, onCancel, title, text = 'Are you sure?',
    okText = 'OK', cancelText = 'Cancel', className, open }
) => (
  <ModalDark className={className} open={open} onClose={onCancel}>
    {title && (
    <ModalHeader className={styles.title}>{title}</ModalHeader>
    )}
    <ModalContent>
      {text}
    </ModalContent>
    <ModalActions className={styles.actions}>
      <GrayOutlineButton onClick={onCancel}>{cancelText}</GrayOutlineButton>
      <GradientButton onClick={onConfirm}>{okText}</GradientButton>
    </ModalActions>
  </ModalDark>
);

export default ConfirmationModal;
