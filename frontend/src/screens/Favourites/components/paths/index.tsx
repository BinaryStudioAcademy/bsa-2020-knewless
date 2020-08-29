import React from 'react';
import styles from './styles.module.sass';
import { IPath } from '@screens/Favourites/models/IPath';
import { PathRow } from './path.row';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';

interface IFavouritePathsProps {
  paths: Array<IPath>;
  remove: (id: string) => void;
  filterByName: Function;
}

export const FavouritePaths: React.FunctionComponent<IFavouritePathsProps> = ({
  paths, remove, filterByName
}) => {
  return (
    <>
      {paths?.length === 0 && 
      <div className={styles.placeholderwrp}>
        <ListPlaceholder
          title="It' empty now"
          description="Currently you haven't favourite paths"
        />
      </div>}
      {paths?.length > 0 && (
      <div className={styles.tablecontent}>
        <div className={styles.rowheader}>
          <div className={styles.gridrowheader}>
            <div className={styles.header_item}></div>
            <div className={styles.header_item}>Name</div>
            <div className={styles.header_item}>Author</div>
            <div className={styles.header_item}>Courses</div>
            <div className={styles.header_item}>Duration</div>
          </div>
        </div>
        {paths.filter(p=>filterByName(p)).map(p => (
          <PathRow remove={remove} path={p} key={p.id} />
        ))}
      </div>)}
    </>
  );    
};