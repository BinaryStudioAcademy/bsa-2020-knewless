import React, { useEffect, useState, useRef } from 'react';
import styles from './styles.module.sass';
import { IArticle } from '../../models/domain';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { IBindingCallback1 } from '@models/Callbacks';
import ReactHtmlParser from 'react-html-parser';
import { ArticleCard } from '../../components/ArticleCard';
import { CardsSegment } from '@components/CardsSegment';
import AuthorCard from '../../components/AuthorCard';
import { ArticleCardPlaceHolder } from '@components/placeholder/ArticleCardPlaceHolder';
import readingTime from 'reading-time';
import { history } from '@helpers/history.helper';
import AddToFavouriteButton, { IFavourite } from '@components/AddToFavouritesButton/component';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import { RoleTypes } from '@containers/AppRouter/models/IRole';
import {
  changeFavouriteArticleStateRoutine,
  checkFavouriteArticleStateRoutine,
  fetchArticleDataRoutine
} from '@screens/ArticlePage/routines';
import { Icon, Label } from 'semantic-ui-react';
import { IUser } from '@containers/AppRouter/models/IUser';
import { CommentsSection } from '@screens/ArticlePage/components/ArticleCommentsSection';

export interface IArticleProps {
  article: IArticle;
  fetchArticle: IBindingCallback1<string>;
  isAuthorized: boolean;
  loading: boolean;
  favourite: boolean;
  error: string;
  role: string;
  checkFavourite: IBindingCallback1<IFavourite>;
  changeFavourite: IBindingCallback1<IFavourite>;
  user: IUser;
}

export const ArticlePage: React.FC<IArticleProps> = ({
  fetchArticle, article, loading, error, user, role, isAuthorized, favourite,
  checkFavourite, changeFavourite
}) => {
  const { articleId } = useParams();
  const discussionRef = useRef(null);
  const [toDiscussion, setToDiscussion] = useState(undefined);

  useEffect(() => {
    setToDiscussion(history.location?.state?.toDiscussion);
  },[history.location?.state]);

  useEffect(() => {
    if (toDiscussion && discussionRef.current?.offsetTop) {
      window.scrollTo(0, discussionRef.current?.offsetTop);
    }
  },[toDiscussion, discussionRef.current?.offsetTop, loading]);

  useEffect(() => {
    if (articleId) {
      fetchArticle(articleId);
    }
  }, [articleId]);

  useEffect(() => {
    if (articleId) {
      checkFavourite({
        id: articleId,
        type: SourceType.ARTICLE
      });
    }
  }, [articleId]);

  if (loading) return null;
  if (error) return <Redirect to="/404" />;

  const isUser = role === RoleTypes.USER;

  return (
    <>
      <div className={styles.wrapperTitle}>
        <div id={styles.articleTitle}>
          <div>Article</div>
          {isAuthorized && isUser && (
            <div className={styles.button_favourite_wrp}>
              <AddToFavouriteButton
                id={articleId}
                type={SourceType.ARTICLE}
                changeFavourite={changeFavourite}
                isFavourite={favourite}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          <div className={styles.wrapPreview}>
            <div className={styles.preview}>
              <div className={styles.form__name}>
                <span className={styles.form__label}>
                  {article?.name}
                  {article?.author?.userId === user?.id && (
                    <Label
                      style={{
                        background: 'transparent',
                        color: '#fff',
                        verticalAlign: 'super',
                        position: 'relative',
                        top: '-8px',
                        left: '10px',
                        fontSize: '1.3rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => history.push(`/article/edit/${articleId}`)}
                    >
                      <Icon name="pencil" />
                    </Label>
                  )}
                </span>
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
              {(article?.author?.articles?.filter(a => a.id !== articleId).length !== 0 || loading) && (
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
              )}
              <div ref={discussionRef}>
                {articleId && article
                && <CommentsSection articleId={articleId} yourId={user?.id} authorId={article.author?.userId} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { loading, error } = state.articlePage.requests.fetchArticleRequest;
  const { article, favourite } = state.articlePage.articleData;
  const { user } = state.appRouter;
  const { isAuthorized } = state.auth.auth;
  const { role } = state.appRouter.user;
  return {
    article,
    favourite,
    isAuthorized,
    user,
    loading,
    error,
    role: role?.name
  };
};

const mapDispatchToProps = {
  fetchArticle: fetchArticleDataRoutine,
  changeFavourite: changeFavouriteArticleStateRoutine,
  checkFavourite: checkFavouriteArticleStateRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);

