import React from 'react';
import styles from './styles.module.sass';
import { IAuthor } from '@screens/Favourites/models/IAuthor';
import { AuthorRow } from './author.row';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';

interface IFavouriteCoursesProps {
  authors: Array<IAuthor>;
  remove: (id: string) => void;
  filterByName: Function;
}

export const FavouriteAuthors: React.FC<IFavouriteCoursesProps> = ({
  authors, remove, filterByName
}) => (
  <>
    {authors?.length === 0 && (
      <div className={styles.placeholderwrp}>
        <ListPlaceholder
          title="It's empty here."
          description="Currently you have no favourite authors."
        />
      </div>
    )}
    {authors?.length > 0 && (
    <div className={styles.tablecontent}>
      <div className={styles.rowheader}>
        <div className={styles.gridrowheader}>
          <div className={styles.header_item} />
          <div className={styles.header_item}>Name</div>
          <div className={styles.header_item}>School</div>
          <div className={styles.header_item}>Followers</div>
          <div className={styles.header_item}>Created Paths</div>
          <div className={styles.header_item}>Created Courses</div>
        </div>
      </div>
      {authors.filter(a => filterByName(a)).map(a => (
        <AuthorRow remove={remove} author={a} key={a.id} />
      ))}
    </div>
    )}
  </>
);
