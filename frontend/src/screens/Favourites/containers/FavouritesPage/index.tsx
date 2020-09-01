import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import { IAppState } from 'models/AppState';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { ILecture } from '@screens/Favourites/models/ILecture';
import { IAuthor } from '@screens/Favourites/models/IAuthor';
import { ICourse } from '@screens/Favourites/models/ICourse';
import { IPath } from '@screens/Favourites/models/IPath';
import { fetchFavouriteAuthorsRoutine, removeCourseFavouriteRoutine, removeAuthorFavouriteRoutine,
  fetchFavouriteCoursesRoutine, fetchFavouriteLecturesRoutine, removeLectureFavouriteRoutine,
  fetchFavouritePathsRoutine, removePathFavouriteRoutine } from '@screens/Favourites/routines';
import LoaderWrapper from 'components/LoaderWrapper';
import { Input } from 'semantic-ui-react';
import { FavouriteCourses } from '@screens/Favourites/components/courses';
import { FavouriteAuthors } from '@screens/Favourites/components/authors';
import { FavouriteLectures } from '@screens/Favourites/components/lectures';
import { FavouritePaths } from '@screens/Favourites/components/paths';
import { filterByName } from '../../services/helper';
import { IFavourite } from '@components/AddToFavouritesButton/component';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import { FavouriteArticles } from '@screens/Favourites/components/articles';

interface IFavouritesPageProps {
  fetchCourses: IBindingAction;
  fetchAuthors: IBindingAction;
  fetchLectures: IBindingAction;
  fetchPaths: IBindingAction;
  isCoursesLoading: boolean;
  isPathsLoading: boolean;
  isAuthorsLoading: boolean;
  isLecturesLoading: boolean;
  courses: Array<ICourse>;
  lectures: Array<ILecture>;
  authors: Array<IAuthor>;
  paths: Array<IPath>;
  changeFavouriteCourse: IBindingCallback1<IFavourite>;
  changeFavouriteAuthor: IBindingCallback1<IFavourite>;
  changeFavouriteLecture: IBindingCallback1<IFavourite>;
  changeFavouritePath: IBindingCallback1<IFavourite>;
}

const FavouritesPage: React.FC<IFavouritesPageProps> = ({
  changeFavouriteCourse,
  changeFavouriteAuthor,
  changeFavouriteLecture,
  changeFavouritePath,
  fetchCourses,
  fetchAuthors,
  fetchLectures,
  fetchPaths,
  isCoursesLoading,
  isAuthorsLoading,
  isLecturesLoading,
  isPathsLoading,
  courses,
  authors,
  lectures,
  paths
}) => {
  useEffect(() => {
    fetchCourses();
    fetchAuthors();
    fetchLectures();
    fetchPaths();
  }, [fetchCourses, fetchAuthors, fetchLectures, fetchPaths]);

  const [filter, setFilter] = useState('');
  const [current, setCurrent] = useState(0);

  const removeCourseFromFavourite = (id: string) => {
    changeFavouriteCourse({
      id,
      type: SourceType.COURSE
    });
    // fetchCourses();
  };

  const removeAuthorFromFavourite = (id: string) => {
    changeFavouriteAuthor({
      id,
      type: SourceType.AUTHOR
    });
    // fetchAuthors();
  };

  const removeLectureFromFavourite = (id: string) => {
    changeFavouriteLecture({
      id,
      type: SourceType.LECTURE
    });
    // fetchLectures();
  };

  const removePathFromFavourite = (id: string) => {
    changeFavouritePath({
      id,
      type: SourceType.PATH
    });
  };

  const filtering = (element: any) => filterByName(element, filter);

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <div className={styles.dividerwrp}>
          <h3 className={styles.title}>Favourites</h3>
        </div>
        <div className={styles.headerRow_wrp}>
          <div className={styles.headerRow}>
            <div className={styles.item_wrp}>
              <button
                type="button"
                onClick={() => setCurrent(0)}
                className={`${styles.menu_item}
                ${current === 0 ? styles.menu_selected : styles.menu_default}`}
              >
                Courses
              </button>
              {current === 0 && <div className={styles.underline} />}
            </div>
            <div className={styles.item_wrp}>
              <button
                type="button"
                onClick={() => setCurrent(1)}
                className={`${styles.menu_item}
                ${current === 1 ? styles.menu_selected : styles.menu_default}`}
              >
                Lectures
              </button>
              {current === 1 && <div className={styles.underline} />}
            </div>
            <div className={styles.item_wrp}>
              <button
                type="button"
                onClick={() => setCurrent(2)}
                className={`${styles.menu_item}
                ${current === 2 ? styles.menu_selected : styles.menu_default}`}
              >
                Paths
              </button>
              {current === 2 && <div className={styles.underline} />}
            </div>
            <div className={styles.item_wrp}>
              <button
                type="button"
                onClick={() => setCurrent(3)}
                className={`${styles.menu_item}
                ${current === 3 ? styles.menu_selected : styles.menu_default}`}
              >
                Articles
              </button>
              {current === 3 && <div className={styles.underline} />}
            </div>
            <div className={styles.item_wrp}>
              <button
                type="button"
                onClick={() => setCurrent(4)}
                className={`${styles.menu_item}
                ${current === 4 ? styles.menu_selected : styles.menu_default}`}
              >
                Authors
              </button>
              {current === 4 && <div className={styles.underline} />}
            </div>
            <Input
              fluid
              type="text"
              value={filter}
              className={styles.customInput}
              onChange={ev => setFilter(ev.target.value)}
              inverted
              icon="search"
            />
          </div>
        </div>
        <div className={styles.wide_container}>
          <LoaderWrapper loading={isCoursesLoading || isLecturesLoading || isAuthorsLoading || isPathsLoading}>
            {current === 0 && (
              <FavouriteCourses filterByName={filtering} remove={removeCourseFromFavourite} courses={courses} />
            )}
            {current === 4 && (
              <FavouriteAuthors filterByName={filtering} remove={removeAuthorFromFavourite} authors={authors} />
            )}
            {current === 1 && (
              <FavouriteLectures filterByName={filtering} remove={removeLectureFromFavourite} lectures={lectures} />
            )}
            {current === 3 && (
              <FavouriteArticles articles={[]} />
            )}
            {current === 2 && (
              <FavouritePaths filterByName={filtering} remove={removePathFromFavourite} paths={paths} />
            )}
          </LoaderWrapper>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { lectures, courses, authors, paths } = state.favourites.data;
  return {
    isCoursesLoading: state.favourites.requests.coursesRequest.loading,
    isAuthorsLoading: state.favourites.requests.authorsRequest.loading,
    isLecturesLoading: state.favourites.requests.lecturesRequest.loading,
    isPathsLoading: state.favourites.requests.pathsRequest.loading,
    lectures,
    courses,
    authors,
    paths
  };
};

const mapDispatchToProps = {
  fetchCourses: fetchFavouriteCoursesRoutine,
  fetchAuthors: fetchFavouriteAuthorsRoutine,
  fetchLectures: fetchFavouriteLecturesRoutine,
  fetchPaths: fetchFavouritePathsRoutine,
  changeFavouriteCourse: removeCourseFavouriteRoutine,
  changeFavouriteAuthor: removeAuthorFavouriteRoutine,
  changeFavouriteLecture: removeLectureFavouriteRoutine,
  changeFavouritePath: removePathFavouriteRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);
