import React from 'react';
import styles from './styles.module.sass';
import { Label, Icon, Popup } from 'semantic-ui-react';
import { timeFormatLecture } from '@helpers/time.helper';
import AddToFavouriteButton from '@components/AddToFavouritesButton/component';
import { IFavourite } from '@components/AddToFavouritesButton/component/index';
import { IBindingCallback1 } from '@models/Callbacks';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';

export interface ILectureCardProps {
  timeMinutes: number;
  name: string;
  description: string;
  id?: string;
  lectureURL?: string;
  onClick: () => void;
  isSelected?: boolean;
  favourite?: boolean;
  changefavourite?: IBindingCallback1<IFavourite>;
}

export const LectureCard: React.FC<ILectureCardProps> = ({
  timeMinutes, name, onClick, isSelected, lectureURL, favourite, changefavourite, id
}) => {
  return  (
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
      {timeFormatLecture(timeMinutes)}
    </div>
    <div className={styles.meta__actionButton}>
      {timeMinutes === 0 && !changefavourite && 
        <Popup
          trigger={<Icon loading name="spinner" />}
          content="Video is currently being processed on the server..."
          basic
        />}
      {timeMinutes !== 0 && !changefavourite && 
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
        </Label>}
      {changefavourite && 
        <AddToFavouriteButton
          isFavourite={favourite}
          id={id}
          type={SourceType.LECTURE}
          changeFavourite={changefavourite}
        />}
    </div>
  </div>
);
}
