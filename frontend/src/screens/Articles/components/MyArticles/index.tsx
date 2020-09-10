import React, { useState, useEffect } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { ArticlePreview } from '@components/ArticlePreview';
import styles from '../../containers/ArticlesPage/styles.module.sass';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';
import { history } from '@helpers/history.helper';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import { IArticle } from '@screens/Articles/models/IArticle';

export interface IMyArticles {
  role: string;
  loading: boolean;
  articles: IArticle[];
}

export const MyArticles: React.FC<IMyArticles> = ({
  articles, loading, role
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  if (loading) return null;

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const handleCreateCourseClick = () => history.push('/add_article');

  const noCoursesPlaceholder = (
    <RowPlaceholder
      button={{ text: 'Create first article', onClick: handleCreateCourseClick }}
      description="Let's fix it! 🙂"
    />
  );

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <div className={styles.title_container}>
          <h3 className={`${styles.title} ${styles.wide_container} ${styles.my_courses_accordion}`}>
            <div>
              My Articles
              <Icon name="dropdown" />
            </div>
            {articles.length !== 0 && <GrayOutlineButton content="Create article" onClick={handleCreateCourseClick}/>}
          </h3>
        </div>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        {articles.length > 0 ? (
          <div className={`${styles.wide_container}`}>
            <div className={styles.courses_container}>
              {loading || articles.map(a => (
                 <ArticlePreview
                 key={a.id}
                 id={a.id}
                 authorName={a.authorName}
                 authorId={a.authorId}
                 image={a.image}
                 name={a.name}
                 description={a.text}
               />
              ))}
            </div>
          </div>
        ) : noCoursesPlaceholder}
      </Accordion.Content>
    </Accordion>
  );
};
