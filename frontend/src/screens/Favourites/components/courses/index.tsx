import React from 'react';
import styles from './styles.module.sass';
import { ICourse } from '@screens/Favourites/models/ICourse';
import { CourseRow } from './course.row';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';

interface IFavouriteCoursesProps {
  courses: Array<ICourse>;
  remove: (id: string) => void;
  filterByName: Function;
}

export const FavouriteCourses: React.FC<IFavouriteCoursesProps> = ({
  courses, remove, filterByName
}) => (
  <>
    {courses?.length === 0 && (
      <div className={styles.placeholderwrp}>
        <ListPlaceholder
          title="It's empty here."
          description="Currently you have no favourite courses."
        />
      </div>
    )}
    {courses?.length > 0 && (
      <div className={styles.tablecontent}>
        <div className={styles.rowheader}>
          <div className={styles.gridrowheader}>
            <div className={styles.header_item} />
            <div className={styles.header_name}>Name</div>
            <div className={styles.header_item}>Author</div>
            <div className={styles.header_item}>Level</div>
            <div className={styles.header_item}>Duration</div>
            <div className={styles.header_item}>Rating</div>
          </div>
        </div>
        {courses.filter(c => filterByName(c)).map(c => (
          <CourseRow remove={remove} course={c} key={c.id} />
        ))}
      </div>
    )}
  </>
);
