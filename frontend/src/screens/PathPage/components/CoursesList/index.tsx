import React, { useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { courses } from '@screens/PathPage/services/mock';
import { CourseCard } from '@screens/PathPage/components/CourseCard';

const courseLevels = {
  BEGINNER: [],
  INTERMEDIATE: [],
  ADVANCED: []
};

const CoursesList = () => {
  const groupedCourses = courses.reduce((result = courseLevels, course) => {
    const { level } = course;
    const res = result;
    if (!Object.prototype.hasOwnProperty.call(result, level)) {
      res[level] = [];
    }
    res[level].push(course);
    return res;
  }, {});
  const [selected, setSelected] = useState(
    [...Array(Object.keys(groupedCourses).length).keys()]
  );
  const handleClick = i => {
    if (selected.includes(i)) {
      const newState = selected.filter(num => num !== i);
      setSelected(newState);
    } else {
      setSelected([...selected, i]);
    }
  };
  const compareCourseLevels = (a, b) => {
    switch (a) {
      case 'BEGINNER':
        return -1;
      case 'INTERMEDIATE':
        return 0;
      default:
        return 1;
    }
  };
  const getCourses = () => Object.keys(groupedCourses).sort(compareCourseLevels).map((key, i) => (
    <Accordion fluid>
      <Accordion.Title
        active={selected.includes(i)}
        index={i}
        onClick={() => handleClick(i)}
        className={styles.accordion_title}
      >
        <Icon name="dropdown" />
        {key}
      </Accordion.Title>
      <Accordion.Content active={selected.includes(i)}>
        <div className={styles.courses}>
          {
            groupedCourses[key].map(c => (
              <CourseCard
                id={c.id}
                name={c.name}
                author={c.author}
                level={c.level}
                imageSrc={c.imageSrc}
                duration={c.duration}
              />
            ))
          }
        </div>
      </Accordion.Content>
    </Accordion>
  ));

  return (
    <div>
      {getCourses()}
    </div>
  );
};

export default CoursesList;
