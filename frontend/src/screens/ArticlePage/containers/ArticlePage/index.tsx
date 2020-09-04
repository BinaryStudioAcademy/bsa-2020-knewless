import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { IArticle } from '../../models/domain';
import {
  fetchArticleDataRoutine
} from '../../routines';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { IBindingCallback1 } from '@models/Callbacks';
import ReactHtmlParser from 'react-html-parser';
import { ArticleCard } from '../../components/ArticleCard';
import { CardsSegment } from '@components/CardsSegment';
import AuthorCard from '../../components/AuthorCard';
import { ArticleCardPlaceHolder } from '@components/placeholder/ArticleCardPlaceHolder';
import readingTime from 'reading-time';
import { history } from '@helpers/history.helper';

export interface IArticleProps {
  article: IArticle;
  getArticle: IBindingCallback1<string>;
  isAuthorized: boolean;
  loading: boolean;
}

export const ArticlePage: React.FC<IArticleProps> = ({
  getArticle, article, loading
}) => {
  const { articleId } = useParams();

  useEffect(() => {
    if (articleId) {
      getArticle(articleId);
    }
  }, [articleId]);

  if (loading) return null;

  return (
    <>
      <div className={styles.wrapperTitle}>
        <div id={styles.articleTitle}>Article</div>
      </div>
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          <div className={styles.wrapPreview}>
            <div className={styles.preview}>
              <div className={styles.form__name}>
                <span className={styles.form__label}>{article?.name}</span>
                <div className={styles.author}>
                  <NavLink exact to={`/author/${article.author?.id}`}>
                    <span>
                      <i>{`by ${article.author?.name}`}</i>
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className={styles.container}>
                <div className={styles.back}>
                  <div className={styles.article_image}>
                    <img src={article?.image} alt="Article" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.wide_container}>
            <div className={styles.form__container}>
              <div id={styles.content_block}>
                {ReactHtmlParser(article.text)}
              </div>
              <div className={styles.author_block}>
                <AuthorCard
                  name={article.author?.name}
                  biography={article.author?.biography}
                  image={article.author?.avatar}
                  id={article.author?.id}
                />
              </div>
              <div className={styles.articles_block}>
                <div className={styles.content_row}>
                  <CardsSegment
                    title={`More from ${article.author?.name}`}
                    onViewAllClick={() => history.push(`/author/${article.author?.id}`)}
                    loading={false}
                  >
                    {loading && [1, 2, 3].map(x => <ArticleCardPlaceHolder key={x} hideButton={false} />)}
                    {!loading && article?.author?.articles?.filter(a => a.id !== articleId).slice(0, 3).map(a => (
                      <div key={a.id} className={styles.article_card}>
                        <ArticleCard
                          id={a.id}
                          name={a.name}
                          duration={Math.max(readingTime(a.text).time / 1000, 60)}
                          imageSrc={a.image}
                        />
                      </div>
                    ))}
                  </CardsSegment>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { loading } = state.articlePage.requests.fetchArticleRequest;
  const { article } = state.articlePage.articleData;
  const { isAuthorized } = state.auth.auth;
  return {
    article,
    isAuthorized,
    loading
  };
};

const mapDispatchToProps = {
  getArticle: fetchArticleDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);

