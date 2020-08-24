import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArchiveIcon } from '../../icons/archive.svg';
import { ReactComponent as DiscussionIcon } from '../../icons/discussion.svg';
import { ReactComponent as InfoIcon } from '../../icons/info.svg';
import styles from './styles.module.sass';
import { LectureCard } from '@screens/AddCourse/components/LectureCard';
import { ILectureData } from '@screens/CoursePage/models/ILectureData';
import { IBindingCallback1 } from '@models/Callbacks';

interface ICourseMenuProps {
  lectures: ILectureData[];
  courseDescription: string;
  isAuthorized: boolean;
  openLoginModal: IBindingCallback1<string>;
}

const CourseMenu: React.FunctionComponent<ICourseMenuProps> = ({
  lectures,
  courseDescription,
  isAuthorized,
  openLoginModal
}) => {
  const [selected, setSelected] = useState(0);
  const history = useHistory();
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
                onClick={() => {
                  if (!isAuthorized) openLoginModal(`/lecture/${lec.id}`);
                  else history.push(`/lecture/${lec.id}`);
                }}
              >
                <LectureCard
                  timeMinutes={lec.timeMinutes}
                  name={lec.name}
                  description={lec.description}
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
