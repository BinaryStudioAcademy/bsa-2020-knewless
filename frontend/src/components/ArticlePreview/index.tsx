import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.sass';
import Ellipsis from 'react-ellipsis-pjs';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { timeFormat } from '@helpers/time.helper';
import  readingTime from 'reading-time';

export interface IArticlePreviewProps {
  id?: string;
  image: string;
  authorName: string;
  authorId?: string;
  description?: string;
  name: string;
  action?: (any) => void;
  className?: string;
}

export const ArticlePreview: React.FC<IArticlePreviewProps> = ({
  image, action, name, description,
  id, authorName, authorId, className
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.meta__image}>
        <img src={image} alt="" className={styles.imageArticle} />
      </div>
      <div className={styles.card_content_box}>
        <div className={styles.title_container}>
          <div className={styles.article_name}>
            <NavLink exact to={`/article/${id}`}>
              <div className={styles.nameText}>
                <Ellipsis text={name} lines={2} />
              </div>
            </NavLink>
          </div>
        </div>
        <div className={styles.author}>
          <NavLink exact to={`/author/${authorId}`}>
            <span>
              <i>{`by ${authorName}`}</i>
            </span>
          </NavLink>
        </div>
        <div className={styles.description}>
          <div className={styles.description_text}>
            <HTMLEllipsis
              unsafeHTML={description}
              maxLine='4'
              ellipsis='...'
              basedOn='letters'
            />
          </div>
        </div>
        <div className={styles.bottom_flex}>
          <div>
            <span className={styles.title}>read:</span>
            <span className={styles.number}>{timeFormat(Math.max(readingTime(description).time/1000,60))}</span>
          </div>
        </div>
      </div>
    </div>
   );
};
