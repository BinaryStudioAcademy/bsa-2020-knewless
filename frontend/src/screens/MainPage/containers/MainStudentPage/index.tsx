import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import UserInfoBlock from '../../components/UserInfoBlock';
import { IStudent } from '../../models/IStudent';
import { IBindingAction } from 'models/Callbacks';
import { CardsSegment } from 'components/CardsSegment';
import { CourseCard, ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps, PathCard } from 'components/PathCard';
import { IAppState } from 'models/AppState';
import {
  fetchContinueCoursesRoutine, fetchPathsRoutine, fetchRecommendedCoursesRoutine
} from '../../routines';
import { student as studentMock } from '../../services/mock';

export interface IMainStudentPageProps {
  student: IStudent;
  paths: IPathCardProps[];
  continueCourses: ICourseCardProps[];
  recommendedCourses: ICourseCardProps[];
  fetchContinueCourses: (id: string) => void;
  fetchRecommendedCourses: (id: string) => void;
  fetchPaths: IBindingAction;
  continueCoursesLoading: boolean;
  recommendedCoursesLoading: boolean;
  pathsLoading: boolean;
}

const MainStudentPage: React.FunctionComponent<IMainStudentPageProps> = ({
  student,
  continueCourses,
  recommendedCourses,
  paths,
  fetchContinueCourses: getStudentCourses,
  fetchRecommendedCourses: getRecommendedCourses,
  fetchPaths: getPaths,
  continueCoursesLoading,
  recommendedCoursesLoading,
  pathsLoading
}) => {
  useEffect(() => {
    if (student.id) {
      getStudentCourses(student.id);
      getRecommendedCourses(student.id);
      getPaths();
    }
  }, [student.id]);

  return (
    <div className={styles.mainPage}>
      <UserInfoBlock
        student={student}
      />
      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Continue Learning"
            onViewAllClick={() => (console.log('clicked view all courses'))}
            loading={continueCoursesLoading}
          >
            {continueCourses.slice(0, 3).map(c => (
              <div className={styles.course_card}>
                <CourseCard
                  category={c.category}
                  name={c.name}
                  author={c.author}
                  duration={c.duration}
                  imageSrc={c.imageSrc}
                  level={c.level}
                  rating={c.rating}
                  onOpenClick={c.onOpenClick}
                  hideButton
                />
              </div>
            ))}
          </CardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Recommended Courses"
            onViewAllClick={() => (console.log('clicked view all courses'))}
            loading={recommendedCoursesLoading}
          >
            {recommendedCourses.slice(0, 3).map(c => (
              <div className={styles.course_card}>
                <CourseCard
                  category={c.category}
                  name={c.name}
                  author={c.author}
                  duration={c.duration}
                  imageSrc={c.imageSrc}
                  level={c.level}
                  rating={c.rating}
                  onOpenClick={c.onOpenClick}
                />
              </div>
            ))}
          </CardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.card_segment} ${styles.space_under}`}>
          <CardsSegment
            title="Paths"
            onViewAllClick={() => (console.log('clicked view all paths'))}
            loading={pathsLoading}
          >
            {paths.slice(0, 3).map(p => (
              <div className={styles.path_card}>
                <PathCard
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
  return {
    student: studentMock,
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
  fetchPaths: fetchPathsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MainStudentPage);
