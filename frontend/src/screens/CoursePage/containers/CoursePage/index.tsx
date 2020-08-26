import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.sass';
import '../../styles/common.sass';
import CourseOverview from '../../components/CourseOverview';
import AuthorInfo from '../../components/AuthorInfo';
import CourseInfo from '../../components/CourseInfo';
import { Footer } from '@components/Footer';
import { BottomNavigation } from '@screens/Landing/components/BottomNavigation';
import { IAppState } from '@models/AppState';
import { fetchCourseDataRoutine, startCourseRoutine } from '@screens/CoursePage/routines';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import defaultCourseImage from 'assets/images/default_course_image.jpg';
import { navigations } from '@screens/Landing/services/mock';
import { openLoginModalRoutine } from '@containers/LoginModal/routines';

interface ICoursePageProps {
  fetchData: IBindingCallback1<string>;
  startCourse: IBindingCallback1<string>;
  openLoginModal: IBindingCallback1<string>;
  course: IFullCourseData;
  role: string;
  loading: boolean;
  isAuthorized: boolean;
}

const CoursePage: React.FunctionComponent<ICoursePageProps> = ({
  fetchData,
  startCourse,
  course,
  role,
  loading,
  isAuthorized,
  openLoginModal
}) => {
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      fetchData(courseId);
    }
  }, [courseId]);
  const handleOnStartCourse = () => {
    startCourse(course.id);
  };
  if (loading) return null;
  return (
    <>
      <div className={styles.content}>
        <CourseOverview
          role={role}
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
        />
        <div className="separator" />
        <CourseInfo
          isAuthorized={isAuthorized}
          startCourse={handleOnStartCourse}
          openLoginModal={openLoginModal}
          level={course?.level || ''}
          updatedAt={course?.updatedAt}
          duration={course?.duration || ''}
          courseDescription={course?.description || ''}
          lectures={course?.lectures}
          rating={course?.rating}
          tags={course?.tags}
        />
        <div className="separator" />
        <AuthorInfo
          author={course?.author}
          courses={course?.authorCourses}
          courseId={course?.id}
        />
      </div>
      <div className={styles.navigation_layer}>
        <div className={styles.wide_container}>
          <BottomNavigation navigations={navigations} />
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { course } = state.coursePage.courseData;
  const { isAuthorized } = state.auth.auth;
  return {
    course,
    loading: state.coursePage.requests.dataRequest.loading,
    role: state.appRouter.user.role.name,
    isAuthorized
  };
};

const mapDispatchToProps = {
  fetchData: fetchCourseDataRoutine,
  startCourse: startCourseRoutine,
  openLoginModal: openLoginModalRoutine.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
