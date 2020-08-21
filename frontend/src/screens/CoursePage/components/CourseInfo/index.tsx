import React from 'react';
import styles from './styles.module.sass';
import '../../styles/common.sass';
import { StyledRating } from 'components/StyledRating';
import CourseMenu from '@screens/CoursePage/components/CourseMenu';
import { ILectureData } from '@screens/CoursePage/models/ILectureData';
import moment from 'moment';
import { ITagData } from '@screens/CoursePage/models/ITagData';
import { IBindingCallback1 } from '@models/Callbacks';

interface ICourseInfoProps {
  level: string;
  updatedAt: Date;
  duration: string;
  rating: number;
  lectures: ILectureData[];
  courseDescription: string;
  tags: ITagData[];
  isAuthorized: boolean;
  openLoginModal: IBindingCallback1<string>;
}

const CourseInfo: React.FunctionComponent<ICourseInfoProps> = ({
  level,
  updatedAt,
  duration,
  rating,
  lectures,
  courseDescription,
  tags,
  isAuthorized,
  openLoginModal
}) => (
  <div className="content_row">
    <div className={`${styles.info} flex_item aligned_item`}>
      <div className={`${styles.info_content} left_container`}>
        <h1 className={styles.info__title}>Course Info</h1>
        <div className={styles.info__table}>
          <p className={styles.row_name}>Rating</p>
          <StyledRating rating={rating} className={`rating ${styles.rating}`} disabled />
          <p className={styles.row_name}>Level</p>
          <p className={styles.row_data}>{level}</p>
          <p className={styles.row_name}>Updated</p>
          <p className={styles.row_data}>
            {moment(updatedAt).format('MMM D, YYYY')}
          </p>
          <p className={styles.row_name}>Duration</p>
          <p className={styles.row_data}>{duration}</p>
        </div>
        <div className={styles.info__tags}>
          {tags?.map(t => (<div className={styles.tag}>{t.name}</div>))}
        </div>
      </div>
    </div>
    <div className={`${styles.menu} flex_item`}>
      <CourseMenu
        isAuthorized={isAuthorized}
        openLoginModal={openLoginModal}
        lectures={lectures}
        courseDescription={courseDescription}
      />
    </div>
  </div>
);

export default CourseInfo;

