import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IAuthor } from '../../models/IAuthor';
import { IAppState } from '@models/AppState';
import { AuthorCourseCard, IAuthorCourseCardProps } from '../../components/AuthorCourseCard';
import { IPathCardProps, PathCard } from '@components/PathCard';
import { AuthorCardsSegment } from '../../components/AuthorCardsSegment';
import AuthorInfoBlock from '../../components/AuthorInfoBlock';
import { fetchAuthorCoursesRoutine, fetchAuthorPathsRoutine, fetchAuthorRoutine } from '../../routines';
import { IUser } from 'containers/AppRouter/models/IUser';
import { IBindingAction } from 'models/Callbacks';
import { history } from '@helpers/history.helper';
import styles from './styles.module.sass';
import { CourseCardPlaceHolder } from '@components/placeholder/CourseCardPlaceHolder';
import { PathCardPlaceHolder } from '@components/placeholder/PathCardPlaceHolder';

export interface IMainAuthorPageProps {
  author: IAuthor;
  user: IUser;
  authorCourses: IAuthorCourseCardProps[];
  authorPaths: IPathCardProps[];
  fetchAuthor: IBindingAction;
  fetchAuthorCourses: (id: string) => void;
  fetchAuthorPaths: (id: string) => void;
  coursesLoading: boolean;
  pathsLoading: boolean;
  pathsLoaded: boolean;
  coursesLoaded: boolean;
  authorLoaded: boolean;
  isSettingsFilled: boolean;
}

const MainAuthorPage: React.FunctionComponent<IMainAuthorPageProps> = ({
  author,
  user,
  authorCourses,
  authorPaths,
  fetchAuthor: getAuthor,
  fetchAuthorCourses: getAuthorCourses,
  fetchAuthorPaths: getAuthorPaths,
  pathsLoaded,
  coursesLoaded,
  authorLoaded,
  isSettingsFilled
}) => {
  useEffect(() => {
    if (user.id && isSettingsFilled) {
      getAuthor();
    }
    if (author.id) {
      getAuthorCourses(author.id);
      getAuthorPaths(author.id);
    }
  }, [user.id, author.id, isSettingsFilled]);
  return (
    <div className={styles.main_page}>
      <AuthorInfoBlock author={author} isLoading={!authorLoaded} />
      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <AuthorCardsSegment
            title="Your recently created Courses"
            onCreateClick={() => history.push('/add_course')}
            onViewAllClick={() => history.push('/courses')}
            loading={false}
          >
            {!coursesLoaded
              ? [1, 2, 3].map(x => <CourseCardPlaceHolder key={x} dependencyName="author" hideButton />)
              : (
                <>
                  {(authorCourses && authorCourses.length > 0) ? authorCourses.slice(0, 3).map(c => (
                    <div className={styles.course_card} key={c.id}>
                      <AuthorCourseCard
                        id={c.id}
                        name={c.name}
                        imageSrc={c.imageSrc}
                      />
                    </div>
                  )) : coursesLoaded && authorCourses.length === 0
                && <div className={styles.no_courses}><p>You have no courses yet.</p></div>}
                </>
              )}
          </AuthorCardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.card_segment} ${styles.space_under}`}>
          <AuthorCardsSegment
            title="Your recently created Paths"
            onCreateClick={() => history.push('/add_path')}
            onViewAllClick={() => history.push('/paths')}
            loading={false}
          >
            {!pathsLoaded
              ? [1, 2, 3].map(x => (
                <div className={styles.path_card} key={x}>
                  <PathCardPlaceHolder key={x} />
                </div>
              )) : (
                <>
                  {(authorPaths && authorPaths.length > 0) ? authorPaths.slice(0, 3).map(p => (
                    <div className={styles.path_card} key={p.id}>
                      <PathCard
                        id={p.id}
                        name={p.name}
                        logoSrc={p.logoSrc}
                        courses={p.courses}
                        duration={p.duration}
                      />
                    </div>
                  )) : pathsLoaded && authorPaths.length === 0
                   && <div className={styles.no_courses}><p>You have no paths yet.</p></div>}
                </>
              )}
          </AuthorCardsSegment>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { author, authorCourses, authorPaths } = state.authorMainPage.data;
  const { settingsFilled } = state.appRouter;
  return {
    user: state.appRouter.user,
    author,
    authorCourses,
    authorPaths,
    coursesLoading: state.authorMainPage.requests.authorCoursesRequest.loading,
    pathsLoading: state.authorMainPage.requests.authorPathsRequest.loading,
    pathsLoaded: state.authorMainPage.data.pathsLoaded,
    coursesLoaded: state.authorMainPage.data.coursesLoaded,
    authorLoaded: state.authorMainPage.data.authorLoaded,
    isSettingsFilled: settingsFilled
  };
};

const mapDispatchToProps = {
  fetchAuthor: fetchAuthorRoutine,
  fetchAuthorCourses: fetchAuthorCoursesRoutine,
  fetchAuthorPaths: fetchAuthorPathsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAuthorPage);
