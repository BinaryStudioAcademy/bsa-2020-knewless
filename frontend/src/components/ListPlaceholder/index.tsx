import React from 'react';
import GrayOutlineButton from '../buttons/GrayOutlineButton';
import styles from './styles.module.sass';
import placeholderImage from 'assets/images/poem.svg';

export interface IListPlaceholderProps {
  title?: string;
  description?: string;
  button?: IButton;
}

export interface IButton {
  text: string;
  onClick: () => void;
}

export const ListPlaceholder: React.FC<IListPlaceholderProps> = (
  { title, description, button = { onClick: undefined, text: 'Add new...' } }
) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <img className={styles.image} src={placeholderImage} alt="" />
      <span className={styles.title}>{title}</span>
    </div>
    <span className={styles.description}>{description}</span>
    {button?.onClick && <GrayOutlineButton onClick={button.onClick}>{button.text}</GrayOutlineButton>}
  </div>
);
