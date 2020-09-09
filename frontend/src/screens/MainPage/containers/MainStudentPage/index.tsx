import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import UserInfoBlock from '../UserInfoBlock';
import { IStudent } from '../../models/IStudent';
import { IBindingAction } from 'models/Callbacks';
import { CardsSegment } from 'components/CardsSegment';
import { CourseCard, ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps, PathCard } from 'components/PathCard';
import {
  fetchAllGoalsRoutine,
  fetchContinueCoursesRoutine,
  fetchCurrentGoalProgressRoutine,
  fetchPathsRoutine,
  fetchRecommendedCoursesRoutine,
  fetchStudentRoutine
} from '../../routines';
import { IAppState } from 'models/AppState';
import { IUser } from 'containers/AppRouter/models/IUser';
import { CourseCardPlaceHolder } from '@components/placeholder/CourseCardPlaceHolder';
import { PathCardPlaceHolder } from '@components/placeholder/PathCardPlaceHolder';
import { history } from '@helpers/history.helper';
import { extractStudentLoading } from '@screens/MainPage/models/IMainStudentPageState';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';

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
  studentLoading: boolean;
  fetchAllGoals: IBindingAction;
  fetchCurrentGoalProgress: IBindingAction;
  continueCoursesLoaded: boolean;
  recommendedCoursesLoaded: boolean;
  pathsLoaded: boolean;
}

const MainStudentPage: React.FC<IMainStudentPageProps> = ({
  student,
  user,
  continueCourses,
  recommendedCourses,
  paths,
  fetchContinueCourses: getStudentCourses,
  fetchRecommendedCourses: getRecommendedCourses,
  fetchPaths: getPaths,
  fetchStudent: getStudent,
  studentLoading,
  fetchAllGoals,
  fetchCurrentGoalProgress,
  continueCoursesLoaded,
  recommendedCoursesLoaded,
  pathsLoaded
}) => {
  useEffect(() => {
    fetchAllGoals();
    fetchCurrentGoalProgress();
  }, []);

  useEffect(() => {
    if (user.id) {
      getStudent();
      getStudentCourses(user.id);
    }
  }, [user.id]);

  useEffect(() => {
    if (student.id) {
      getRecommendedCourses(student.id);
      getPaths();
    }
  }, [student.id]);

  return (
    <div className={styles.mainPage}>
      <UserInfoBlock student={student} studentLoading={studentLoading} />
      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Continue Learning"
            onViewAllClick={() => history.push('/profile')}
            loading={false}
          >
            {!continueCoursesLoaded
              ? [1, 2, 3].map(x => <CourseCardPlaceHolder key={x} dependencyName="landing" hideButton />) : (
                <>
                  {(continueCourses && continueCourses.length > 0) ? continueCourses.slice(0, 3).map(c => (
                    <div className={styles.course_card}>
                      <CourseCard
                        id={c.id}
                        name={c.name}
                        author={c.author}
                        authorId={c.authorId}
                        duration={c.duration}
                        imageSrc={c.imageSrc}
                        level={c.level}
                        rating={c.rating}
                        hideButton
                        ratingCount={c.ratingCount}
                        tags={c.tags}
                      />
                    </div>
                  )) : continueCoursesLoaded
                  && <div className={styles.no_courses}><p>You have no courses yet.</p></div>}
                </>
              )}
          </CardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Recommended Courses"
            onViewAllClick={() => history.push('/courses')}
            loading={false}
          >
            {!recommendedCoursesLoaded
              ? [1, 2, 3].map(x => <CourseCardPlaceHolder key={x} dependencyName="landing" hideButton={false} />) : (
                <>
                  {recommendedCourses.length ? recommendedCourses.slice(0, 3).map(c => (
                    <div className={styles.course_card}>
                      <CourseCard
                        id={c.id}
                        name={c.name}
                        author={c.author}
                        authorId={c.authorId}
                        duration={c.duration}
                        imageSrc={c.imageSrc}
                        level={c.level}
                        rating={c.rating}
                        ratingCount={c.ratingCount}
                        tags={c.tags}
                      />
                    </div>
                  )) : (
                    <RowPlaceholder
                      title="No courses recommended for you right now"
                      description="Check out this page later"
                    />
                  )}
                </>
              )}
          </CardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.card_segment} ${styles.space_under}`}>
          <CardsSegment
            title="Paths"
            onViewAllClick={() => history.push('/paths')}
            loading={false}
          >
            {!pathsLoaded
              ? [1, 2, 3].map(x => (
                <div className={styles.path_card}>
                  <PathCardPlaceHolder key={x} />
                </div>
              )) : (
                <>
                  {paths.length ? paths.slice(0, 3).map(p => (
                    <div className={styles.path_card}>
                      <PathCard
                        id={p.id}
                        name={p.name}
                        logoSrc={p.logoSrc}
                        courses={p.courses}
                        duration={p.duration}
                      />
                    </div>
                  )) : (
                    <RowPlaceholder
                      title="No paths here for now"
                      description="Check out this page later"
                      webOnLeft={false}
                    />
                  )}
                </>
              )}
          </CardsSegment>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    student,
    continueCourses,
    recommendedCourses,
    paths,
    continueCoursesLoaded,
    recommendedCoursesLoaded,
    pathsLoaded
  } = state.mainPage.mainPageData;
  const { user } = state.appRouter;
  return {
    student,
    user,
    continueCourses,
    recommendedCourses,
    paths,
    studentLoading: extractStudentLoading(state),
    continueCoursesLoaded,
    recommendedCoursesLoaded,
    pathsLoaded
  };
};

const mapDispatchToProps = {
  fetchContinueCourses: fetchContinueCoursesRoutine,
  fetchRecommendedCourses: fetchRecommendedCoursesRoutine,
  fetchPaths: fetchPathsRoutine,
  fetchStudent: fetchStudentRoutine,
  fetchAllGoals: fetchAllGoalsRoutine,
  fetchCurrentGoalProgress: fetchCurrentGoalProgressRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MainStudentPage);
