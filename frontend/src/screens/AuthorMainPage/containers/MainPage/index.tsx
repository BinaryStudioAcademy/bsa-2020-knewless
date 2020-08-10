import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from 'models/Callbacks';
import { IAuthor } from '../../models/IAuthor';
import { IAppState } from '../../../../models/AppState';
import { AuthorPathCard, IAuthorPathCardProps } from '../../components/AuthorPathCard';
import { AuthorCourseCard, IAuthorCourseCardProps } from '../../components/AuthorCourseCard';
import { AuthorCardsSegment } from '../../components/AuthorCardsSegment';
import { fetchAuthorDataRoutine } from '../../routines';
import { Button } from 'semantic-ui-react';
import styles from './styles.module.sass';

export interface IMainAuthorPageProps {
  author: IAuthor;
  courses: IAuthorCourseCardProps[];
  paths: IAuthorPathCardProps[];
  fetchData: IBindingAction;
  loading: boolean;
}

const MainAuthorPage: React.FunctionComponent<IMainAuthorPageProps> = ({
  author,
  courses,
  paths,
  fetchData: getData,
  loading
}) => {
  useEffect(() => {
    getData();
  }, []);
  const handleSchoolCreation = e => {
    // handle
  };
  const isAuthorHasSchool = author.school !== undefined && author.school !== null;
  return (
    <div className={styles.main_page}>
      <div className={styles.user_info__container}>
        <div className={styles.container__centered}>
          <div className={styles.author_info}>
            <div className={styles.author_info__border_right}>
              <div className={styles.author_info__img_wrapper}>
                <img
                  src={author.avatar}
                  className={styles.author_info__img}
                  alt="User avatar"
                />
              </div>
              <div className={styles.author_info_text}>
                <p className={styles.author_info_text__title}>
                  {`${author.name}`}
                </p>
                <p className={styles.count}>{`${author.followers} Followers`}</p>
              </div>
            </div>
          </div>
          <div className={styles.school_container}>
            {isAuthorHasSchool ? (
              <>
                <div className={styles.school_container__text}>
                  <h1>{author.school?.name}</h1>
                  <p className={styles.count}>
                    {`${author.school?.membersCount || 1} members`}
                  </p>
                </div>
                <div className={styles.school_container__image}>
                  <img src={author.school?.logoLink} alt={author.school?.name} />
                </div>
              </>
            ) : (
              <div className={styles.no_school__container}>
                <p className={styles.no_school__msg}>Have no school?</p>
                <div className={styles.no_school__btns}>
                  <Button
                    id={styles.no_school_btn}
                    onSubmit={e => handleSchoolCreation(e)}
                    size="massive"
                  >
                    <p className={styles.btn_text}>Create new</p>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <AuthorCardsSegment
            title="Your recently created Courses"
            onCreateClick={() => (console.log('clicked create course'))}
            onViewAllClick={() => (console.log('clicked view author courses'))}
            loading={loading}
          >
            {courses ? courses?.map(c => (
              <div className={styles.course_card} key={c.name}>
                <AuthorCourseCard
                  name={c.name}
                  imageSrc={c.imageSrc}
                  onOpenClick={c.onOpenClick}
                  onEditClick={() => (console.log('clicked edit course'))}
                />
              </div>
            )) : <h4>You have no courses yet.</h4>}
          </AuthorCardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <AuthorCardsSegment
            title="Your recently created Paths"
            onCreateClick={() => (console.log('clicked create path'))}
            onViewAllClick={() => console.log('clicked view author paths')}
            loading={loading}
          >
            {paths ? paths.map(p => (
              <div className={styles.path_card} key={p.name}>
                <AuthorPathCard
                  name={p.name}
                  logoSrc={p.logoSrc}
                  courses={p.courses}
                  duration={p.duration}
                  onEditClick={() => (console.log('clicked edit path'))}
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
  const { author, courses, paths } = state.authorMainPage.data;
  return {
    author,
    courses,
    paths,
    loading: state.authorMainPage.requests.dataRequest.loading
  };
};

const mapDispatchToProps = {
  fetchData: fetchAuthorDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAuthorPage);
