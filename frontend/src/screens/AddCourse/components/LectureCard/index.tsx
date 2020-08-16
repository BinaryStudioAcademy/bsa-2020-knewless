import React from 'react';
import styles from './styles.module.sass';
import { Label, Icon, Popup } from 'semantic-ui-react';

export interface ILectureCardProps {
  timeMinutes: number;
  name: string;
  description: string;
  onClick: () => void;
  isSelected?: boolean;
}

export const LectureCard: React.FC<ILectureCardProps> = ({
  timeMinutes, name, onClick, isSelected
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
      {timeMinutes === 0 ? '' : `${timeMinutes} minutes` }
    </div>
    <div className={styles.meta__actionButton}>
      {timeMinutes === 0 ? (
        <Popup
          trigger={<Icon loading name="spinner" />}
          content="Video is currently being processed on the server..."
          basic
        />
      ) : (
        <Label
          basic
          size="tiny"
          className={styles.toolBarIcon}
          onClick={onClick}
        >
          <Icon
            className={isSelected ? styles.btn_remove : styles.btn_add}
            name={isSelected ? 'minus' : 'plus'}
            inverted
          />
        </Label>
      )}
    </div>
  </div>
);
