import React, { useState } from 'react';
import styles from './styles.module.sass';
import { ICourse } from '@screens/Favourites/models/ICourse';
import { CourseRow } from './course.row';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';

interface IFavouriteCoursesProps {
  courses: Array<ICourse>;
  remove: (id: string) => void;
  filterByName: Function;
}

export const FavouriteCourses: React.FunctionComponent<IFavouriteCoursesProps> = ({
  courses, remove, filterByName
}) => {
  return (
    <>
      {courses?.length === 0 && 
      <div className={styles.placeholderwrp}>
        <ListPlaceholder
          title="It' empty now"
          description="Currently you haven't favourite courses"
        />
      </div>}
      {courses?.length > 0 && (
      <div className={styles.tablecontent}>
        <div className={styles.rowheader}>
          <div className={styles.gridrowheader}>
            <div className={styles.header_item}></div>
            <div className={styles.header_name}>Name</div>
            <div className={styles.header_item}>Author</div>
            <div className={styles.header_item}>Level</div>
            <div className={styles.header_item}>Duration</div>
            <div className={styles.header_item}>Rating</div>
          </div>
        </div>
        {courses.filter(c=>filterByName(c)).map(c => (
          <CourseRow remove={remove} course={c} key={c.id} />
        ))}
      </div>)}
    </>
  );    
};