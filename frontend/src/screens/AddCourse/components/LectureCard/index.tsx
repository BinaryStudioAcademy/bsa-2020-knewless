import React, { useCallback } from 'react';
import styles from './styles.module.sass';
import { Label, Icon } from 'semantic-ui-react';

export interface ILectureCardProps {
  timeMinutes: number;
  name: string;
  description: string;
  onClick: () => void;
  isSelected?: boolean;
}

export const LectureCard: React.FC<ILectureCardProps> = ({
  timeMinutes, description, name, onClick, isSelected
}) => (
  <div className={styles.lecture__container}>
    <div className={styles.meta__playIcon}>
      <Label
        basic
        size="tiny"
        className={styles.toolBarIcon}
      >
        <Icon name="play circle outline" size="big" inverted />
      </Label>
    </div>
    <div className={styles.meta__name}>
      {name}
    </div>
    <div className={styles.meta__time}>
      {`${timeMinutes} minutes`}
    </div>
    <div className={styles.meta__actionButton}>
      <Label
        basic
        size="tiny"
        className={styles.toolBarIcon}
        onClick={onClick}
      >
        <Icon
          className={styles.addIcon}
          name={isSelected ? 'delete' : 'check'}
          size="large"
          inverted
          color={isSelected ? 'pink' : 'green'}
        />
      </Label>
    </div>
  </div>
);
