import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IAuthorData } from 'screens/AuthorPublicPage/models/IAuthorData';
import CoursesList from './authorCoursesList';
import ArticlesList from './authorArticlesList';
import styles from './styles.module.sass';

export interface IAuthorPublicMenu {
  authorData: IAuthorData;
}

const AuthorPublicMenu: React.FunctionComponent<IAuthorPublicMenu> = ({ authorData }) => {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className={styles.menu}>
        <div className={styles.menu__header}>
          <div className={styles.menu__options}>
            <button
              type="button"
              onClick={() => setSelected(0)}
              className={`${styles.menu__button}
                ${selected === 0 ? styles.button_selected : styles.button_ordinary}`}
            >
              <p>Courses</p>
            </button>
            <button
              type="button"
              onClick={() => setSelected(1)}
              className={`${styles.menu__button}
                ${selected === 1 ? styles.button_selected : styles.button_ordinary}`}
            >
              <p>Articles</p>
            </button>
            <div />
            {
              [...Array(2).keys()].map(i => (
                <div
                  className={i === selected ? styles.selected_separator : styles.separator}
                  key={i}
                />
              ))
            }
            <div className={`${styles.separator}`} />
          </div>
        </div>
        <div className={styles.menu__content_container}>
          {selected === 0 && (
            <CoursesList authorData={authorData} />
          )}
          {selected === 1 && (
            <ArticlesList authorData={authorData} />
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  authorData: state.authorPublicData.authorData
});

export default connect(mapStateToProps)(AuthorPublicMenu);
