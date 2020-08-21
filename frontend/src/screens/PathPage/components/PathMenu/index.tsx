import React, { useState } from 'react';
import styles from './styles.module.sass';
import CoursesList from '@screens/PathPage/components/CoursesList';
import { CourseCard } from '@screens/PathPage/components/CourseCard';
import { courses } from '@screens/PathPage/services/mock';
import AboutSection from "@screens/PathPage/components/AboutSection";

const PathMenu = () => {
  const [selected, setSelected] = useState(0);
  return (
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
            <p>About</p>
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
          <CoursesList />
        )}
        {selected === 1 && (
          <AboutSection />
        )}
      </div>
    </div>
  );
};

export default PathMenu;
