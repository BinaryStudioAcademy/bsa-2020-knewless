import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import styles from './styles.module.sass';
import '../../styles/common.sass';
import CourseOverview from '../../components/CourseOverview';
import AuthorInfo from '../../components/AuthorInfo';
import CourseInfo from '../../components/CourseInfo';
import { IAppState } from '@models/AppState';
import {
  fetchCourseDataRoutine,
  changeFavouriteCourseStateRoutine,
  checkFavouriteCourseStateRoutine,
  startCourseRoutine,
  changeFavouriteLectureStateRoutine,
  fetchAuthorInfoRoutine
} from '@screens/CoursePage/routines';
import { connect } from 'react-redux';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import defaultCourseImage from 'assets/images/default_course_image.jpg';
import { openLoginModalRoutine } from '@containers/LoginModal/routines';
import RatingModal from '@components/RatingModal';
import { saveCourseReviewRoutine } from '@screens/LecturePage/routines';
import { IFavourite } from '@components/AddToFavouritesButton/component';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import { IAuthor } from '@screens/AuthorMainPage/models/IAuthor';

interface ICoursePageProps {
  fetchData: IBindingCallback1<string>;
  startCourse: IBindingCallback1<string>;
  openLoginModal: IBindingCallback1<string>;
  fetchAuthor: IBindingAction;
  course: IFullCourseData;
  author: IAuthor;
  loading: boolean;
  isAuthorized: boolean;
  favourite: boolean;
  submitReview: IBindingCallback1<object>;
  checkFavourite: IBindingCallback1<IFavourite>;
  changeFavourite: IBindingCallback1<IFavourite>;
  changeFavouriteLecture: IBindingCallback1<IFavourite>;
  role: string;
  isSettingsFilled: boolean;
  error: string;
}

const CoursePage: React.FunctionComponent<ICoursePageProps> = ({
  fetchData,
  startCourse,
  course,
  author,
  loading,
  isAuthorized,
  openLoginModal,
  changeFavourite,
  checkFavourite,
  favourite,
  submitReview,
  changeFavouriteLecture,
  fetchAuthor,
  role,
  isSettingsFilled,
  error
}) => {
  const { courseId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchData(courseId);
    }
  }, []);

  useEffect(() => {
    if (courseId) {
      checkFavourite({
        id: courseId,
        type: SourceType.COURSE
      });
    }
  }, []);

  useEffect(() => {
    if (isSettingsFilled && courseId && role === 'AUTHOR') {
      fetchAuthor();
    }
  }, [isSettingsFilled]);

  const handleOnStartCourse = () => {
    startCourse(course.id);
  };

  const openViewModal = () => {
    setIsOpen(true);
  };

  const saveReview = (rating: number) => {
    submitReview({ courseId, rating });
    setIsOpen(false);
  };

  const closeReview = () => {
    setIsOpen(false);
  };

  if (loading) return null;
  if (error) return <Redirect to="/404" />;

  return (
    <div>
      <RatingModal onClose={closeReview} isOpen={isOpen} submit={saveReview} isLoading={false} />
      <div className={styles.content}>
        <CourseOverview
          favourite={favourite}
          changeFavourite={changeFavourite}
          role={role}
          author={author}
          courseId={course?.id}
          imageSrc={course?.image || defaultCourseImage}
          courseName={course?.name || ''}
          authorName={`${course?.author?.firstName} ${course?.author?.lastName}` || ''}
          authorId={course?.author?.id}
          rating={course?.rating}
          startLectureId={(course?.lectures && course?.lectures?.length > 0) ? course.lectures[0].id : ''}
          startCourse={handleOnStartCourse}
          isAuthorized={isAuthorized}
          openLoginModal={openLoginModal}
          overview={course.overview}
          progress={course.progress}
        />
        <div className="separator" />
        <CourseInfo
          changeFavouriteLecture={changeFavouriteLecture}
          isAuthorized={isAuthorized}
          startCourse={handleOnStartCourse}
          openLoginModal={openLoginModal}
          level={course?.level || ''}
          updatedAt={course?.updatedAt}
          duration={course?.duration}
          courseDescription={course?.description || ''}
          lectures={course?.lectures}
          rating={course?.rating}
          tags={course?.tags}
          review={course.review}
          ratingCount={course.ratingCount}
          openReviewModal={openViewModal}
          role={role}
        />
        <div className="separator" />
        <AuthorInfo
          author={course?.author}
          courses={course?.authorCourses}
          courseId={course?.id}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { course, author } = state.coursePage.courseData;
  const { favourite } = course;
  const { settingsFilled } = state.appRouter;
  const { isAuthorized } = state.auth.auth;
  return {
    course,
    author,
    loading: state.coursePage.requests.dataRequest.loading,
    error: state.coursePage.requests.dataRequest.error,
    role: state.appRouter.user?.role?.name,
    isAuthorized,
    favourite,
    isSettingsFilled: settingsFilled
  };
};

const mapDispatchToProps = {
  fetchData: fetchCourseDataRoutine,
  fetchAuthor: fetchAuthorInfoRoutine,
  openLoginModal: openLoginModalRoutine.trigger,
  changeFavourite: changeFavouriteCourseStateRoutine,
  checkFavourite: checkFavouriteCourseStateRoutine,
  submitReview: saveCourseReviewRoutine,
  startCourse: startCourseRoutine,
  changeFavouriteLecture: changeFavouriteLectureStateRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
