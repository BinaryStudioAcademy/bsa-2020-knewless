import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IAuthor } from '../../models/IAuthor';
import { IAppState } from '../../../../models/AppState';
import { AuthorPathCard, IAuthorPathCardProps } from '../../components/AuthorPathCard';
import { AuthorCourseCard, IAuthorCourseCardProps } from '../../components/AuthorCourseCard';
import { AuthorCardsSegment } from '../../components/AuthorCardsSegment';
import AuthorInfoBlock from '../../components/AuthorInfoBlock';
import { fetchAuthorCoursesRoutine, fetchAuthorPathsRoutine } from '../../routines';
import { author as authorMock } from '../../services/author.page.mock';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';

export interface IMainAuthorPageProps {
  author: IAuthor;
  authorCourses: IAuthorCourseCardProps[];
  authorPaths: IAuthorPathCardProps[];
  fetchAuthorCourses: (id: string) => void;
  fetchAuthorPaths: (id: string) => void;
  coursesLoading: boolean;
  pathsLoading: boolean;
}

const MainAuthorPage: React.FunctionComponent<IMainAuthorPageProps> = ({
  author,
  authorCourses,
  authorPaths,
  fetchAuthorCourses: getAuthorCourses,
  fetchAuthorPaths: getAuthorPaths,
  coursesLoading,
  pathsLoading
}) => {
  useEffect(() => {
    if (author.id) {
      getAuthorCourses(author.id);
      getAuthorPaths(author.id);
    }
  }, [author.id]);
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
            )) : <h4>You have no courses yet.</h4>}
          </AuthorCardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
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
            )) : <h4>You have no paths yet.</h4>}
          </AuthorCardsSegment>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { authorCourses, authorPaths } = state.authorMainPage.data;
  return {
    author: authorMock,
    authorCourses,
    authorPaths,
    coursesLoading: state.authorMainPage.requests.authorCoursesRequest.loading,
    pathsLoading: state.authorMainPage.requests.authorPathsRequest.loading
  };
};

const mapDispatchToProps = {
  fetchAuthorCourses: fetchAuthorCoursesRoutine,
  fetchAuthorPaths: fetchAuthorPathsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAuthorPage);
