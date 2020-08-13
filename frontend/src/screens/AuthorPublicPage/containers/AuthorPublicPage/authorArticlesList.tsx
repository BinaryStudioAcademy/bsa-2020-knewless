import React from 'react';
import { connect } from 'react-redux';
import { IAuthorCourse } from '../../models/IAuthorCourse';
import { Card } from 'semantic-ui-react';

import { IAuthorArticles } from '../../models/IAuthorArticles';

import './styles.sass';

export interface IAuthorCoursesList {
  articles: IAuthorArticles[];
}

const ArticlesList: React.FunctionComponent<IAuthorCoursesList> = ({
  articles
}) => (
  <div className="articlesList">
    {articles === undefined ? 'No articles here'
      : articles.map((a, i) => (
        <Card className="authorArticle-wrapper">
          <Card.Description className="authorArticle">
            {a.name}
          </Card.Description>
        </Card>
      ))}
  </div>
);

const mapStateToProps = (state: any) => ({
  articles: state.authorPublicData.authorData.articles
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
