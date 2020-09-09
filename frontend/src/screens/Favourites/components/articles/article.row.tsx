import React from 'react';
import styles from './styles.module.sass';
import { history } from '@helpers/history.helper';
import { Label, Icon } from 'semantic-ui-react';
import noImage from '@images/no_image.png';
import { IBindingCallback1 } from '@models/Callbacks';
import { IFavouriteArticle } from '@screens/ArticlePage/models/domain';

interface IArticleRowProps {
  article: IFavouriteArticle;
  remove: IBindingCallback1<string>;
}

export const ArticleRow: React.FC<IArticleRowProps> = ({ article, remove }) => {
  const redirectToArticle = () => {
    history.push(`/article/${article.id}`);
  };
  return (
    <div className={styles.row}>
      <div onClick={() => redirectToArticle()} className={styles.gridrow}>
        <div className={styles.content_item}>
          <img className={styles.course_image} src={article.image ? article.image : noImage} />
        </div>
        <div className={styles.content_name}>{article.name}</div>
        <div className={styles.color_item}>{`${article.readingTime}m`}</div>
        <div className={styles.content_item}>{article.authorName}</div>
      </div>
      <div className={styles.icon_wrp}>
        <Label
          basic
          size="tiny"
          as="a"
          className={styles.toolBarIcon}
          onClick={() => remove(article.id)}
        >
          <Icon name="minus" size="large" inverted />
        </Label>
      </div>
    </div>
  );
};

