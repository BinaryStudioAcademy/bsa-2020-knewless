import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { IAuthorArticles } from '../../models/IAuthorArticles';
import styles from './styles.module.sass';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';
import { IAuthorData } from '@screens/AuthorPublicPage/models/IAuthorData';
import { ArticlePreview } from '@components/ArticlePreview';

export interface IAuthorCoursesList {
  authorData: IAuthorData;
  articles: IAuthorArticles[];
}

const ArticlesList: React.FunctionComponent<IAuthorCoursesList> = ({
  authorData, articles
}) => (
  <>
    {(!articles || articles?.length < 1)
      ? (<RowPlaceholder description="Articles will appear later." webOnLeft={false} />)
      : articles.map(a => (
        <div className={styles.coursePreviewWrapper}>
          <ArticlePreview
            key={a.id}
            id={a.id}
            authorName={`${authorData.firstName} ${authorData.lastName}`}
            authorId={authorData.id}
            image={a.image}
            name={a.name}
            description={a.text}
            className={styles.articlePreview}
          />
        </div>
      ))}
  </>
);

const mapStateToProps = (state: any) => ({
  articles: state.authorPublicData.authorData.articles
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
