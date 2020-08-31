import React from 'react';
import styles from './styles.module.sass';
import { ILecture } from '@screens/Favourites/models/ILecture';
import { LectureRow } from './lecture.row';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';

interface IFavouriteLecturesProps {
  lectures: Array<ILecture>;
  remove: (id: string) => void;
  filterByName: Function;
}

export const FavouriteLectures: React.FC<IFavouriteLecturesProps> = ({
  lectures, remove, filterByName
}) => (
  <>
    {lectures?.length === 0 && (
    <div className={styles.placeholderwrp}>
      <ListPlaceholder
        title="It's empty here."
        description="Currently you have no favourite lectures."
      />
    </div>
    )}
    {lectures?.length > 0 && (
      <div className={styles.tablecontent}>
        <div className={styles.rowheader}>
          <div className={styles.gridrowheader}>
            <div className={styles.header_item} />
            <div className={styles.header_name}>Name</div>
            <div className={styles.header_item}>Course</div>
            <div className={styles.header_item}>Author</div>
            <div className={styles.header_item}>Duration</div>
            <div className={styles.header_item}>Likes</div>
          </div>
        </div>
        {lectures.filter(l => filterByName(l)).map(l => (
          <LectureRow remove={remove} lecture={l} key={l.id} />
        ))}
      </div>
    )}
  </>
);
