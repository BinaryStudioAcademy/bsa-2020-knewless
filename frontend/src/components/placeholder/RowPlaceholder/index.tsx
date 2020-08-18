import React from 'react';
import cobweb from '@images/cobweb.png';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import styles from './styles.module.sass';

export interface IRowPlaceholderProps {
  title?: string;
  description?: string;
  button?: {text: string; onClick: () => void};
  webOnLeft?: boolean;
}

export const RowPlaceholder: React.FC<IRowPlaceholderProps> = (
  { title = 'It\'s empty here', description = 'Content will appear later',
    button, webOnLeft = true }
) => (
  <div className={styles.container}>
    <img src={cobweb} alt="Placeholder" className={`${styles.image} ${webOnLeft ? styles.left : styles.right}`} />
    <span className={styles.title}>{title}</span>
    <span className={styles.description}>{description}</span>
    {button && <GrayOutlineButton onClick={button.onClick}>{button.text}</GrayOutlineButton>}
  </div>
);
