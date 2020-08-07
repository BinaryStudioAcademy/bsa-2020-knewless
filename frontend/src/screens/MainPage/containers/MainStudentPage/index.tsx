import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import UserInfoBlock from '../../components/UserInfoBlock';
import { IStudent } from '../../models/IStudent';
import { IBindingAction } from 'models/Callbacks';
import { CardsSegment } from 'components/CardsSegment';
import { CourseCard, ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps, PathCard } from 'components/PathCard';
import { fetchDataRoutine } from '../../routines';
import { IAppState } from 'models/AppState';

export interface IMainStudentPageProps {
  student: IStudent;
  paths: IPathCardProps[];
  continueCourses: ICourseCardProps[];
  recommendedCourses: ICourseCardProps[];
  fetchData: IBindingAction;
  loading: boolean;
}

const MainStudentPage: React.FunctionComponent<IMainStudentPageProps> = ({
  student,
  continueCourses,
  recommendedCourses,
  paths,
  fetchData: getData,
  loading
}) => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.mainPage}>
      {!loading
      && (
      <UserInfoBlock
        student={student}
      />
      )}
      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Continue Learning"
            onViewAllClick={() => (console.log('clicked view all courses'))}
            loading={loading}
          >
            {continueCourses.map(c => (
              <div className={styles.course_card}>
                <CourseCard
                  name={c.name}
                  category={c.category}
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
            loading={loading}
          >
            {recommendedCourses.map(c => (
              <div className={styles.course_card}>
                <CourseCard
                  name={c.name}
                  category={c.category}
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
            loading={loading}
          >
            {paths.map(p => (
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
    student,
    continueCourses,
    recommendedCourses,
    paths,
    loading: state.mainPage.requests.dataRequest.loading
  };
};

const mapDispatchToProps = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MainStudentPage);
