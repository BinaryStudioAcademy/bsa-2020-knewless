import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import UserInfoBlock from '../../components/UserInfoBlock';
import { IStudent } from '../../models/IStudent';
import { IBindingAction } from 'models/Callbacks';
import { CardsSegment } from 'components/CardsSegment';
import { CourseCard, ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps, PathCard } from 'components/PathCard';
import {
  fetchContinueCoursesRoutine, fetchPathsRoutine, fetchRecommendedCoursesRoutine, fetchStudentRoutine
} from '../../routines';
import { IAppState } from 'models/AppState';
import { IUser } from 'containers/AppRouter/models/IUser';
import { history } from '@helpers/history.helper';

export interface IMainStudentPageProps {
  student: IStudent;
  user: IUser;
  paths: IPathCardProps[];
  continueCourses: ICourseCardProps[];
  recommendedCourses: ICourseCardProps[];
  fetchContinueCourses: (id: string) => void;
  fetchRecommendedCourses: (id: string) => void;
  fetchPaths: IBindingAction;
  fetchStudent: IBindingAction;
  continueCoursesLoading: boolean;
  recommendedCoursesLoading: boolean;
  pathsLoading: boolean;
}

const MainStudentPage: React.FunctionComponent<IMainStudentPageProps> = ({
  student,
  user,
  continueCourses,
  recommendedCourses,
  paths,
  fetchContinueCourses: getStudentCourses,
  fetchRecommendedCourses: getRecommendedCourses,
  fetchPaths: getPaths,
  fetchStudent: getStudent,
  continueCoursesLoading,
  recommendedCoursesLoading,
  pathsLoading
}) => {
  useEffect(() => {
    if (user.id) {
      getStudent();
      getStudentCourses(user.id);
    }
    if (student.id) {
      getRecommendedCourses(student.id);
      getPaths();
    }
  }, [user.id, student.id]);

  return (
    <div className={styles.mainPage}>
      <UserInfoBlock
        student={student}
      />
      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Continue Learning"
            onViewAllClick={() => history.push('/courses')}
            loading={continueCoursesLoading}
          >
            {(continueCourses && continueCourses.length > 0) ? continueCourses.slice(0, 3).map(c => (
              <div className={styles.course_card}>
                <CourseCard
                  id={c.id}
                  category={c.category}
                  name={c.name}
                  author={c.author}
                  duration={c.duration}
                  imageSrc={c.imageSrc}
                  level={c.level}
                  rating={c.rating}
                  hideButton
                />
              </div>
            )) : <div className={styles.no_courses}><p>You have no courses yet.</p></div>}
          </CardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Recommended Courses"
            onViewAllClick={() => history.push('/courses')}
            loading={recommendedCoursesLoading}
          >
            {recommendedCourses.slice(0, 3).map(c => (
              <div className={styles.course_card}>
                <CourseCard
                  id={c.id}
                  category={c.category}
                  name={c.name}
                  author={c.author}
                  duration={c.duration}
                  imageSrc={c.imageSrc}
                  level={c.level}
                  rating={c.rating}
                />
              </div>
            ))}
          </CardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.card_segment} ${styles.space_under}`}>
          <CardsSegment
            title="Paths"
            onViewAllClick={() => history.push('/paths')}
            loading={pathsLoading}
          >
            {paths.slice(0, 3).map(p => (
              <div className={styles.path_card}>
                <PathCard
                  id={p.id}
                  name={p.name}
                  logoSrc={p.logoSrc}
                  courses={p.courses}
                  duration={p.duration}
                />
              </div>
            ))}
          </CardsSegment>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { student, continueCourses, recommendedCourses, paths } = state.mainPage.mainPageData;
  const { user } = state.appRouter;
  return {
    student,
    user,
    continueCourses,
    recommendedCourses,
    paths,
    continueCoursesLoading: state.mainPage.requests.continueCoursesRequest.loading,
    recommendedCoursesLoading: state.mainPage.requests.recommendedCoursesRequest.loading,
    pathsLoading: state.mainPage.requests.pathsRequest.loading
  };
};

const mapDispatchToProps = {
  fetchContinueCourses: fetchContinueCoursesRoutine,
  fetchRecommendedCourses: fetchRecommendedCoursesRoutine,
  fetchPaths: fetchPathsRoutine,
  fetchStudent: fetchStudentRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MainStudentPage);
