import React, { useEffect } from 'react';
import { fetchArticlesRoutine } from '../../routines';
import { IBindingAction } from '@models/Callbacks';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { IArticle } from '@screens/Articles/models/IArticle';
import { MyArticles } from '@screens/Articles/components/MyArticles';
import { IRole } from '@containers/AppRouter/models/IRole';
import styles from './styles.module.sass';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';

export interface IArticlesPageProps {
  articles: IArticle[];
  role?: IRole;
  fetchArticles: IBindingAction;
  articlesLoading: boolean;
}

const ArticlesPage: React.FC<IArticlesPageProps> = ({
  articles,
  fetchArticles,
  articlesLoading,
  role
}) => {
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className={styles.courses_content}>
      {!articlesLoading ? (
        <MyArticles
          articles={articles}
          loading={articlesLoading}
          role={role.name}
        />
      ) : (<InlineLoaderWrapper loading centered />)}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  articles: state.articlesPage.data.articles,
  articlesLoading: state.articlesPage.requests.articlesRequest.loading,
  role: state.appRouter.user.role
});

const mapDispatchToProps = {
  fetchArticles: fetchArticlesRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
