import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import { IAppState } from 'models/AppState';
import { useHistory } from 'react-router-dom';
import { IBindingAction } from 'models/Callbacks';
import { ILecture } from '@screens/AddCourse/models/ILecture';
import { IAuthor } from '@screens/Favourites/models/IAuthor';
import { ICourse } from '@screens/Favourites/models/ICourse';
import { fetchFavouriteAuthorsRoutine, removeCourseFavouriteRoutine, 
  fetchFavouriteCoursesRoutine, fetchFavouriteLecturesRoutine } from '@screens/Favourites/routines';
import LoaderWrapper from 'components/LoaderWrapper';
import { FavouriteCourses } from '@screens/Favourites/components/courses/index';
import { FavouriteAuthors } from '@screens/Favourites/components/authors/index';
import { IBindingCallback1 } from '@models/Callbacks';
import { IFavourite } from '@components/AddToFavouritesButton/component/index';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';

interface IFavouritesPageProps {
  fetchCourses: IBindingAction;
  fetchAuthors: IBindingAction;
  fetchLectures: IBindingAction;
  isCoursesLoading: boolean;
  isAuthorsLoading: boolean;
  isLecturesLoading: boolean;
  courses: Array<ICourse>;
  lectures: Array<ILecture>;
  authors: Array<IAuthor>;
  changeFavourite: IBindingCallback1<IFavourite>;
}

const FavouritesPage: React.FunctionComponent<IFavouritesPageProps> = ({
  changeFavourite, fetchCourses, fetchAuthors, fetchLectures, isCoursesLoading, isAuthorsLoading, isLecturesLoading, courses, authors, lectures
}) => {
  useEffect(() => {
    fetchCourses();
  }, []);

  const history = useHistory();
  const [current, setCurrent] = useState(0);
  
  const removeCoursefromFavourite = (id: string) => {
    changeFavourite({
      id,
      type: SourceType.COURSE
    });
    fetchCourses();
  }

  const removeAuthorfromFavourite = (id: string) => {
    changeFavourite({
      id,
      type: SourceType.AUTHOR
    });
    fetchAuthors();
  }
  
  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <div className={styles.dividerwrp}>
          <h3 className={styles.title}>Favourites</h3>
        </div>
        <div className={styles.headerRow_wrp}>
          <div className={styles.headerRow}>
            <div className={styles.item_wrp} >
              <button 
                onClick={() => setCurrent(0)} 
                className={`${styles.menu_item}
                ${current === 0 ? styles.menu_selected : styles.menu_default}`}
              >
                  Courses
              </button>
              {current === 0 && <div className={styles.underline}></div>}
            </div>
            <div className={styles.item_wrp} >
              <button 
                onClick={() => setCurrent(1)} 
                className={`${styles.menu_item}
                ${current === 1 ? styles.menu_selected : styles.menu_default}`}
              >
                  Authors
              </button>
              {current === 1 && <div className={styles.underline}></div>}
            </div>
            <div className={styles.item_wrp} >
              <button 
                onClick={() => setCurrent(2)} 
                className={`${styles.menu_item}
                ${current === 2 ? styles.menu_selected : styles.menu_default}`}
              >
                  Lectures
              </button>
              {current === 2 && <div className={styles.underline}></div>}
            </div>
            <div className={styles.item_wrp} >
              <button 
                onClick={() => setCurrent(3)} 
                className={`${styles.menu_item}
                ${current === 3 ? styles.menu_selected : styles.menu_default}`}
              >
                  Paths
              </button>
              {current === 3 && <div className={styles.underline}></div>}
            </div>
            <div className={styles.item_wrp} >
              <button 
                onClick={() => setCurrent(4)} 
                className={`${styles.menu_item}
                ${current === 4 ? styles.menu_selected : styles.menu_default}`}
              >
                  Articles
              </button>
              {current === 4 && <div className={styles.underline}></div>}
            </div>
          </div>
        </div>
        <div className={styles.wide_container}>
          <LoaderWrapper loading={isCoursesLoading && isLecturesLoading && isAuthorsLoading}>
            {current === 0 && <FavouriteCourses remove={removeCoursefromFavourite} courses={courses} />}
            {current === 1 && <FavouriteAuthors remove={removeAuthorfromFavourite} authors={authors} />}
          </LoaderWrapper>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { lectures, courses, authors } = state.favourites.data;
  return {
    isCoursesLoading: state.favourites.requests.coursesRequest.loading,
    isAuthorsLoading: state.favourites.requests.authorsRequest.loading,
    isLecturesLoading: state.favourites.requests.lecturesRequest.loading,
    lectures,
    courses,
    authors
  };
};

const mapDispatchToProps = {
  fetchCourses: fetchFavouriteCoursesRoutine,
  fetchAuthors: fetchFavouriteAuthorsRoutine,
  fetchLectures: fetchFavouriteLecturesRoutine,
  changeFavourite: removeCourseFavouriteRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);