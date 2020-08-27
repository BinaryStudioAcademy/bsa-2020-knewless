import { Label } from 'semantic-ui-react';
import React from 'react';
import styles from './styles.module.sass';

interface ICommonCardProps {
  name: string;
  category: string;
  onClick: () => void;
}

export const CommonCard: React.FC<ICommonCardProps> = ({ name, category, onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className={styles.container} onClick={onClick}>
    <Label>{category}</Label>
    <span>{name}</span>
  </div>
);
