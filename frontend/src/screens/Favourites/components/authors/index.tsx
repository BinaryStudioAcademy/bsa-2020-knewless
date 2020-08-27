import React, { useState } from 'react';
import styles from './styles.module.sass';
import { IAuthor } from '@screens/Favourites/models/IAuthor';

interface IFavouriteCoursesProps {
  authors: Array<IAuthor>;
  remove: (id: string) => void
}

export const FavouriteAuthors: React.FunctionComponent<IFavouriteCoursesProps> = ({
    authors, remove
  }) => {  
  return (
    <div className={styles.tablecontent}>
      <div className={styles.rowheader}>
        <div className={styles.gridrowheader}>
          <div className={styles.header_item}></div>
          <div className={styles.header_name}>Name</div>
          <div className={styles.header_item}>School</div>
          <div className={styles.header_item}>Followers</div>
          <div className={styles.header_item__last}>Created Courses</div>
        </div>
      </div>
    </div>
  );    
};