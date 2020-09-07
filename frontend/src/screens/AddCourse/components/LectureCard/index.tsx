import React, { useState } from 'react';
import styles from './styles.module.sass';
import { Label, Icon, Popup } from 'semantic-ui-react';
import { timeFormatLecture } from '@helpers/time.helper';
import AddToFavouriteButton from '@components/AddToFavouritesButton/component';
import { IFavourite } from '@components/AddToFavouritesButton/component/index';
import { IBindingCallback1, IBindingCallback2 } from '@models/Callbacks';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import { IRole } from '@containers/AppRouter/models/IRole';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import UploadLectureModal from '../../containers/UploadLectureModal';

export interface ILectureCardProps {
  timeMinutes: number;
  name: string;
  description: string;
  id?: string;
  edit?: boolean;
  lectureURL?: string;
  onLectureClick?: IBindingCallback2<any, string>;
  onClick: () => void;
  isSelected?: boolean;
  favourite?: boolean;
  isAuthorized: boolean;
  role: string;
  changefavourite?: IBindingCallback1<IFavourite>;
}

export const LectureCard: React.FC<ILectureCardProps> = ({
  edit = false, timeMinutes, name, onClick, isSelected, lectureURL, favourite, changefavourite,
  id, isAuthorized, role, onLectureClick
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className={styles.lecture__container} onClick={onLectureClick? (e)=>onLectureClick(e, id): null}>
        <div className={styles.meta__playIcon}>
          <Label
            basic
            size="tiny"
            className={styles.toolBarIcon}      
          >
            <Icon name="play circle outline" size="big" inverted />
          </Label>
        </div>
        <p className={styles.meta__name}>
          {name}
        </p>
        <div className={styles.meta__time}>
          {((role === "AUTHOR" && !changefavourite) || edit) && timeFormatLecture(timeMinutes)}
        </div>
        <div className={styles.meta__actionButton}>

          {timeMinutes === 0 && !changefavourite && role === "AUTHOR" &&
            <Popup
              trigger={<Icon loading name="spinner" />}
              content="Video is currently being processed on the server..."
              basic
            />}
          {timeMinutes !== 0 && !changefavourite && role === "AUTHOR" &&
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
          {role === "USER" && changefavourite &&
            <AddToFavouriteButton
              isFavourite={favourite}
              id={id}
              type={SourceType.LECTURE}
              changeFavourite={changefavourite}
            />}
          {((!isAuthorized || (role === "AUTHOR" && changefavourite))) && !edit && timeFormatLecture(timeMinutes)}
          {edit && (
            <Label
              basic
              size="small"
              className={styles.toolBarIcon}
              onClick={() => setModalOpen(true)}
            >
              <Icon name="pencil" />
            </Label>
          )}
        </div>
      </div>
      {edit &&
      <UploadLectureModal
        isOpen={modalOpen}
        openAction={setModalOpen}
        id={id}
      />}
    </>
  );
}
