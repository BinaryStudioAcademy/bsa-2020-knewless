import React from 'react';
import styles from './styles.module.sass';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';
import { IBindingFunction, IBindingCallback1 } from '@models/Callbacks';
import { IFavouriteArticle } from '@screens/ArticlePage/models/domain';
import { ArticleRow } from '@screens/Favourites/components/articles/article.row';

interface IFavouriteArticlesProps {
  filterByName: IBindingFunction<any, boolean>;
  remove: IBindingCallback1<string>;
  articles: Array<IFavouriteArticle>;
}

export const FavouriteArticles: React.FC<IFavouriteArticlesProps> = ({
  filterByName, remove, articles
}) => (
  <>
    {articles?.length === 0 ? (
      <div className={styles.placeholderWrapper}>
        <ListPlaceholder title="It's empty here." description="Currently you have no favourite articles." />
      </div>
    ) : (
      <div className={styles.tablecontent}>
        <div className={styles.rowheader}>
          <div className={styles.gridrowheader}>
            <div className={styles.header_item} />
            <div className={styles.header_item}>Name</div>
            <div className={styles.header_item}>Reading time</div>
            <div className={styles.header_item}>Author</div>
          </div>
        </div>
        {articles.filter(a => filterByName(a)).map(a => (
          <ArticleRow remove={remove} article={a} key={a.id} />
        ))}
      </div>
    )}
  </>
);
