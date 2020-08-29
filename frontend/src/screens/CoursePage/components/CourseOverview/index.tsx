import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';
import { StyledRating } from 'components/StyledRating';
import GradientButton from 'components/buttons/GradientButton';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import '../../styles/common.sass';
import AddToFavouriteButton from '@components/AddToFavouritesButton/component';
import { IFavourite } from '@components/AddToFavouritesButton/component/index';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import { IBindingCallback1, IBindingAction } from '@models/Callbacks';
import { Icon, Label } from 'semantic-ui-react';
import { IAuthor } from '@screens/AuthorMainPage/models/IAuthor';
import OverviewModal from '@components/OverviewModal';

interface ICourseOverviewProps {
  imageSrc: string;
  courseName: string;
  authorName: string;
  authorId: string;
  rating: number;
  startLectureId: string;
  isAuthorized: boolean;
  startCourse: IBindingAction;
  openLoginModal: IBindingCallback1<string>;
  favourite: boolean;
  changeFavourite: IBindingCallback1<IFavourite>;
  role: string;
  author: IAuthor;
  courseId: string;
  overview: string;
}

const CourseOverview: React.FunctionComponent<ICourseOverviewProps> = ({
  imageSrc,
  courseName,
  authorName,
  authorId,
  rating,
  startLectureId,
  isAuthorized,
  startCourse,
  openLoginModal,
  courseId,
  role,
  favourite,
  changeFavourite,
  author,
  overview
}) => {
  const history = useHistory();
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  const onStart = () => {
    if (!isAuthorized) openLoginModal(`/lecture/${startLectureId}`);
    else if (startLectureId !== '') {
      startCourse();
      window.open(`/lecture/${startLectureId}`);
    }
  };

  const onOverviewClose = () => {
    setIsOverviewOpen(false);
  };

  return (
    <div className="content_row">
      <div className={`${styles.description} flex_item aligned_item`}>
        <div className={`${styles.description_content} left_container`}>
          <h1 className={styles.description__course_name}>
            {courseName}
            {author && author?.id === authorId && (
              <Label
                style={{
                  background: 'transparent',
                  color: '#fff',
                  verticalAlign: 'super',
                  position: 'relative',
                  top: '-8px',
                  left: '10px',
                  fontSize: '1.3rem',
                  cursor: 'pointer'
                }}
                onClick={() => history.push(`/course/edit/${courseId}`)}
              >
                <Icon name="pencil" />
              </Label>
            )}
          </h1>
          <div className={styles.description__meta_info}>
            <StyledRating rating={rating} className={`rating ${styles.rating}`} disabled />
            <p>
              {'By '}
              {
                isAuthorized
                  ? <a href={`/author/${authorId}`}>{authorName}</a>
                  : <span>{authorName}</span>
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
              <GrayOutlineButton onClick={() => setIsOverviewOpen(true)}>Course overview</GrayOutlineButton>
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
      <OverviewModal isOpen={isOverviewOpen} data={overview} onClose={onOverviewClose} />
    </div>
  );
};

export default CourseOverview;
