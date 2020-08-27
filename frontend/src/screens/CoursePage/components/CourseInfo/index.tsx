import React from 'react';
import styles from './styles.module.sass';
import '../../styles/common.sass';
import { StyledRating } from 'components/StyledRating';
import CourseMenu from '@screens/CoursePage/components/CourseMenu';
import { ILectureData } from '@screens/CoursePage/models/ILectureData';
import moment from 'moment';
import { ITagData } from '@screens/CoursePage/models/ITagData';
import { IBindingCallback1, IBindingAction } from '@models/Callbacks';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';

interface ICourseInfoProps {
  level: string;
  updatedAt: Date;
  duration: string;
  rating: number;
  lectures: ILectureData[];
  courseDescription: string;
  tags: ITagData[];
  isAuthorized: boolean;
  startCourse: IBindingAction;
  openLoginModal: IBindingCallback1<string>;
  openReviewModal: IBindingCallback1<any>;
  review: number;
  ratingCount: number;
  role: string;
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
  openLoginModal,
  openReviewModal,
  review,
  ratingCount,
  startCourse,
  role
}) => (
  <div className="content_row">
    <div className={`${styles.info} flex_item aligned_item`}>
      <div className={`${styles.info_content} left_container`}>
        <h1 className={styles.info__title}>
          Course Info
        </h1>
        <div className={styles.info__table}>
          <p className={styles.row_name}>Rating</p>
          <div className={styles.rating_block}>
            {/* <div>*/}
            <p>
              (
              {' '}
              {ratingCount}
              {' '}
              )
            </p>
            <StyledRating rating={rating} className={`rating ${styles.rating}`} disabled />
            {/* </div>*/}
          </div>
          {role !== 'AUTHOR' && <p className={styles.row_name}>My rating</p>}
          {(isAuthorized && role !== 'AUTHOR' && !review)
          && (
            <div className={styles.button_review_block}>
              <GrayOutlineButton className={styles.button_review} onClick={openReviewModal}>ADD REVIEW</GrayOutlineButton>
            </div>
          )}
          {(isAuthorized && role !== 'AUTHOR' && review)
          && (
            <StyledRating rating={review} className={`rating ${styles.rating}`} disabled />
          )}
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
        startCourse={startCourse}
        lectures={lectures}
        courseDescription={courseDescription}
      />
    </div>
  </div>
);

export default CourseInfo;

