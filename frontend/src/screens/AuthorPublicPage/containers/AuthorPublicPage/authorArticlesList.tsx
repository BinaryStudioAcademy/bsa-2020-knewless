import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { IAuthorArticles } from '../../models/IAuthorArticles';
import styles from './styles.module.sass';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';

export interface IAuthorCoursesList {
  articles: IAuthorArticles[];
}

const ArticlesList: React.FunctionComponent<IAuthorCoursesList> = ({
  articles
}) => (
  <>
    {(!articles || articles?.length < 1)
      ? (<RowPlaceholder description="Articles will appear later." webOnLeft={false} />)
      : articles.map(a => (
        <Card className={styles.articlePreviewWrapper} key={a.id}>
          <Card.Description className={styles.authorArticle}>
            {a.name}
          </Card.Description>
        </Card>
      ))}
  </>
);

const mapStateToProps = (state: any) => ({
  articles: state.authorPublicData.authorData.articles
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
