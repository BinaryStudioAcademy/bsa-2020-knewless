import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';
import { components } from 'react-select';
import ViewTotalTime from 'screens/StudentPage/components/ViewTotalTime';
import courses from './courses.json';
import CurrentCourse from 'screens/StudentPage/components/CurrentCourse';
import CompletedCourse from 'screens/StudentPage/components/CompletedCourse';
import { Label, List } from 'semantic-ui-react';

const totalViewTime = 130000050;
const StudentProfile = () => {
  const handleOnClickCourse = () => {
    console.log('hi');
  };
  return (
    <div className={styles.profile}>
      <div className={styles.wrapperTitle}>
        <div id={styles.profileTitle}>Profile</div>
      </div>
      <div className={styles.wrapperTime}>
        <div className={styles.timeBlock}>
          <ViewTotalTime totalTime={totalViewTime} />
        </div>
      </div>
      <div className={styles.detailsProfile}>
        <div className={styles.title}>Currently learning</div>
        <div className={styles.currentCourse}>
          <List divided inverted relaxed>
            {courses ? courses.map(course => (
              course.progress !== 100
                ? (
                  <List.Item>
                    <CurrentCourse course={course} />
                  </List.Item>
                )
                : null
            ))
              : <Label>Nothing</Label>}
          </List>
        </div>
        <div className={styles.title}>Completed courses</div>
        <div className={styles.completedCourse}>
          <List divided inverted relaxed>
            {courses ? courses.map(course => (
              course.progress === 100
                ? (
                  <List.Item>
                    <CompletedCourse course={course} />
                  </List.Item>
                )
                : null
            ))
              : <Label>Nothing</Label>}
          </List>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
