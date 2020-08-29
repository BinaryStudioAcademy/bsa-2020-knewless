import React, { useState } from 'react';
import { ReactComponent as ArchiveIcon } from '../../icons/archive.svg';
import { ReactComponent as DiscussionIcon } from '../../icons/discussion.svg';
import { ReactComponent as InfoIcon } from '../../icons/info.svg';
import styles from './styles.module.sass';
import { LectureCard } from '@screens/AddCourse/components/LectureCard';
import { ILectureData } from '@screens/CoursePage/models/ILectureData';
import { IBindingCallback1, IBindingAction } from '@models/Callbacks';
import { IFavourite } from '@components/AddToFavouritesButton/component/index';

interface ICourseMenuProps {
  lectures: ILectureData[];
  courseDescription: string;
  isAuthorized: boolean;
  startCourse: IBindingAction;
  openLoginModal: IBindingCallback1<string>;
  changeFavouriteLecture: IBindingCallback1<IFavourite>;
}

const CourseMenu: React.FunctionComponent<ICourseMenuProps> = ({
  lectures,
  courseDescription,
  isAuthorized,
  startCourse,
  openLoginModal,
  changeFavouriteLecture
}) => {
  const [selected, setSelected] = useState(0);
  const onClickLecture =(e, id) => {
    if (!isAuthorized) openLoginModal(`/lecture/${id}`);
    else {
      if(e.target.tagName === "I" || e.target.tagName === "A") return;
      startCourse();
      window.open(`/lecture/${id}`);
    }
  };
  return (
    <div className={styles.menu}>
      <div className={styles.menu__header}>
        <div className={styles.menu__options}>
          <button
            type="button"
            onClick={() => setSelected(0)}
            className={`${styles.menu__button}
              ${selected === 0 ? styles.button_selected : styles.button_ordinary}`}
          >
            <InfoIcon className={styles.icon_fill} />
            <p>Description</p>
          </button>
          <button
            type="button"
            onClick={() => setSelected(1)}
            className={`${styles.menu__button}
              ${selected === 1 ? styles.button_selected : styles.button_ordinary}`}
          >
            <ArchiveIcon className={styles.icon_stroke} />
            <p>Table of contents</p>
          </button>
          <button
            type="button"
            onClick={() => setSelected(2)}
            className={`${styles.menu__button}
              ${selected === 2 ? styles.button_selected : styles.button_ordinary}`}
          >
            <DiscussionIcon className={styles.icon_fill} />
            <p>Discussion</p>
          </button>
          {
            [...Array(3).keys()].map(i => (
              <div
                className={i === selected ? styles.selected_separator : styles.separator}
                key={i}
              />
            ))
          }
        </div>
      </div>
      <div className={styles.menu__content_container}>
        {selected === 0 && (
        <p>
          {courseDescription}
        </p>
        )}
        {selected === 1 && (
          <div className={styles.lectures}>
            {lectures.map(lec => (
              <button
                type="button"
                className={styles.lecture}
                onClick={(e) => onClickLecture(e, lec.id)}
              >
                <LectureCard
                  isAuthorized={isAuthorized}
                  key={lec.id}
                  timeMinutes={lec.timeSeconds}
                  name={lec.name}
                  description={lec.description}
                  favourite={lec.favourite}
                  id={lec.id}
                  changefavourite={isAuthorized? changeFavouriteLecture : undefined}
                  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
                  onClick={() => {}}
                />
              </button>
            ))}
          </div>
        )}
        {selected === 2 && (
          <p>Nothing here yet...</p>
        )}
      </div>
    </div>
  );
};

export default CourseMenu;
