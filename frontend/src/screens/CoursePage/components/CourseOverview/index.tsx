import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';
import { StyledRating } from 'components/StyledRating';
import GradientButton from 'components/buttons/GradientButton';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import '../../styles/common.sass';
import AddToFavouriteButton from '@components/AddToFavouritesButton/component';
import { IFavourite } from '@components/AddToFavouritesButton/component/index';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import { IBindingCallback1 } from '@models/Callbacks';

interface ICourseOverviewProps {
  imageSrc: string;
  courseName: string;
  authorName: string;
  authorId: string;
  courseId: string;
  rating: number;
  startLectureId: string;
  isAuthorized: boolean;
  openLoginModal: IBindingCallback1<string>;
  favourite: boolean;
  changeFavourite: IBindingCallback1<IFavourite>;
}

const CourseOverview: React.FunctionComponent<ICourseOverviewProps> = ({
  imageSrc,
  courseName,
  authorName,
  authorId,
  rating,
  courseId,
  startLectureId,
  isAuthorized,
  openLoginModal,
  favourite,
  changeFavourite
}) => {
  const history = useHistory();
  return (
    <div className="content_row">
      <div className={`${styles.description} flex_item aligned_item`}>
        <div className={`${styles.description_content} left_container`}>
          <h1 className={styles.description__course_name}>
            {courseName}
          </h1>
          <div className={styles.description__meta_info}>
            <StyledRating rating={rating} className={`rating ${styles.rating}`} disabled />
            <p>
              {'By '}
              {
                isAuthorized
                  ? <a href={`/author/${authorId}`}>{authorName}</a>
                  : <span>{ authorName }</span>
              }
            </p>
          </div>
          <div className={styles.buttons_with_favourite}>
            <div className={styles.description__buttons}>
              <GradientButton onClick={() => {
                if (!isAuthorized) openLoginModal(`/lecture/${startLectureId}`);
                else if (startLectureId !== '') history.push(`/lecture/${startLectureId}`);
              }}
              >
                Start
              </GradientButton>
              <GrayOutlineButton>Play course overview</GrayOutlineButton>
            </div>
            {isAuthorized && (
              <div className={styles.button_favourite_wrp}>
                <AddToFavouriteButton
                  isFavourite={favourite}
                  changeFavourite={changeFavourite}
                  id={courseId}
                  type={SourceType.COURSE}
                />
              </div>  
            )}
          </div>
        </div>
      </div>
      <div className={`${styles.course_image} flex_item`}>
        <img src={imageSrc} alt="Course" />
      </div>
    </div>
  );
};

export default CourseOverview;
