import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IAuthor } from '../../models/IAuthor';
import { IAppState } from '../../../../models/AppState';
import { AuthorPathCard, IAuthorPathCardProps } from '../../components/AuthorPathCard';
import { AuthorCourseCard, IAuthorCourseCardProps } from '../../components/AuthorCourseCard';
import { AuthorCardsSegment } from '../../components/AuthorCardsSegment';
import AuthorInfoBlock from '../../components/AuthorInfoBlock';
import { fetchAuthorRoutine, fetchAuthorCoursesRoutine, fetchAuthorPathsRoutine } from '../../routines';
import { useHistory } from 'react-router-dom';
import { IUser } from 'containers/AppRouter/models/IUser';
import { IBindingAction } from 'models/Callbacks';
import styles from './styles.module.sass';

export interface IMainAuthorPageProps {
  author: IAuthor;
  user: IUser;
  authorCourses: IAuthorCourseCardProps[];
  authorPaths: IAuthorPathCardProps[];
  fetchAuthor: IBindingAction;
  fetchAuthorCourses: (id: string) => void;
  fetchAuthorPaths: (id: string) => void;
  coursesLoading: boolean;
  pathsLoading: boolean;
}

const MainAuthorPage: React.FunctionComponent<IMainAuthorPageProps> = ({
  author,
  user,
  authorCourses,
  authorPaths,
  fetchAuthor: getAuthor,
  fetchAuthorCourses: getAuthorCourses,
  fetchAuthorPaths: getAuthorPaths,
  coursesLoading,
  pathsLoading
}) => {
  useEffect(() => {
    if (user.id) {
      getAuthor();
    }
    if (author.id) {
      getAuthorCourses(author.id);
      getAuthorPaths(author.id);
    }
  }, [user.id, author.id]);
  const history = useHistory();
  return (
    <div className={styles.main_page}>
      <AuthorInfoBlock author={author} />
      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <AuthorCardsSegment
            title="Your recently created Courses"
            onCreateClick={() => history.push('/add_course')}
            onViewAllClick={() => (console.log('clicked view author courses'))}
            loading={coursesLoading}
          >
            {(authorCourses && authorCourses.length > 0) ? authorCourses.slice(0, 3).map(c => (
              <div className={styles.course_card} key={c.name}>
                <AuthorCourseCard
                  name={c.name}
                  imageSrc={c.imageSrc}
                />
              </div>
            )) : <div className={styles.no_courses}><p>You have no courses yet.</p></div>}
          </AuthorCardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.card_segment} ${styles.space_under}`}>
          <AuthorCardsSegment
            title="Your recently created Paths"
            onCreateClick={() => (history.push('/add_path'))}
            onViewAllClick={() => console.log('clicked view author paths')}
            loading={pathsLoading}
          >
            {(authorPaths && authorPaths.length > 0) ? authorPaths.slice(0, 3).map(p => (
              <div className={styles.path_card} key={p.name}>
                <AuthorPathCard
                  name={p.name}
                  logoSrc={p.logoSrc}
                  courses={p.courses}
                  duration={p.duration}
                />
              </div>
            )) : <div className={styles.no_courses}><p>You have no paths yet.</p></div>}
          </AuthorCardsSegment>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { author, authorCourses, authorPaths } = state.authorMainPage.data;
  return {
    user: state.appRouter.user,
    author,
    authorCourses,
    authorPaths,
    coursesLoading: state.authorMainPage.requests.authorCoursesRequest.loading,
    pathsLoading: state.authorMainPage.requests.authorPathsRequest.loading
  };
};

const mapDispatchToProps = {
  fetchAuthor: fetchAuthorRoutine,
  fetchAuthorCourses: fetchAuthorCoursesRoutine,
  fetchAuthorPaths: fetchAuthorPathsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAuthorPage);
