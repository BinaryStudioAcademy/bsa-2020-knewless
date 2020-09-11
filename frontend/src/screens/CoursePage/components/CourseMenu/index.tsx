import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ArchiveIcon } from '../../icons/archive.svg';
import { ReactComponent as DiscussionIcon } from '../../icons/discussion.svg';
import { ReactComponent as InfoIcon } from '../../icons/info.svg';
import styles from './styles.module.sass';
import { LectureCard } from '@screens/AddCourse/components/LectureCard';
import { ILectureData } from '@screens/CoursePage/models/ILectureData';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { IFavourite } from '@components/AddToFavouritesButton/component';
import CourseDiscussion from '@containers/discussions/CourseDiscussion';

interface ICourseMenuProps {
  lectures: ILectureData[];
  courseDescription: string;
  isAuthorized: boolean;
  startCourse: IBindingAction;
  openLoginModal: IBindingCallback1<string>;
  changeFavouriteLecture: IBindingCallback1<IFavourite>;
  role: string;
  courseId: string;
  authorId: string;
  yourId: string;
  toDiscussion?: boolean;
}

const CourseMenu: React.FunctionComponent<ICourseMenuProps> = ({
  lectures,
  courseDescription,
  isAuthorized,
  startCourse,
  openLoginModal,
  changeFavouriteLecture,
  role,
  courseId,
  authorId,
  yourId,
  toDiscussion
}) => {
  const discussionRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (toDiscussion && discussionRef.current?.offsetTop && !isScrolled) {
      setIsScrolled(true);
      setSelected(2);
      window.scrollTo(0, discussionRef.current?.offsetTop + 250);
    }
  }, [toDiscussion, discussionRef.current?.offsetTop]);

  const onClickLecture = (e, id) => {
    if (!isAuthorized) openLoginModal(`/lecture/${id}`);
    else {
      if (e.target.tagName === 'I' || e.target.tagName === 'A') return;
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
              <LectureCard
                edit={yourId === authorId}
                role={role}
                isAuthorized={isAuthorized}
                key={lec.id}
                timeMinutes={lec.timeSeconds}
                name={lec.name}
                description={lec.description}
                favourite={lec.favourite}
                id={lec.id}
                changefavourite={isAuthorized ? changeFavouriteLecture : undefined}
                  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
                onClick={() => {}}
                onLectureClick={e => onClickLecture(e, lec.id)}
              />
            ))}
          </div>
        )}
        <div ref={discussionRef} />
        {selected === 2 && (
          <CourseDiscussion courseId={courseId} authorId={authorId} yourId={yourId} />
        )}
      </div>
    </div>
  );
};

export default CourseMenu;
