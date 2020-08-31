import React from 'react';
import styles from './styles.module.sass';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';

interface IFavouriteArticlesProps {
  articles?: [];
}

export const FavouriteArticles: React.FC<IFavouriteArticlesProps> = ({
  articles = []
}) => (
  <>
    {articles?.length === 0 ? (
      <div className={styles.placeholderWrapper}>
        <ListPlaceholder title="It's empty here." description="Currently you have no favourite articles." />
      </div>
    ) : (
      <div className={styles.tableContent}>
        <div className={styles.rowHeader} />
      </div>
    )}
  </>
);
