import React from 'react';
import ArticleDiscussion from '@containers/discussions/ArticleDiscussion';
import styles from './styles.module.sass';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICommentsSectionProps {
  authorId: string;
  yourId: string;
  articleId: string;
}

export const CommentsSection: React.FC<ICommentsSectionProps> = (
  { authorId, yourId, articleId }
) => (
  <div>
    <h3 className={styles.title}>Comments</h3>
    <div className={styles.container}>
      <ArticleDiscussion authorId={authorId} yourId={yourId} articleId={articleId} />
    </div>
  </div>
);
