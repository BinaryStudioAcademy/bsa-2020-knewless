import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IBindingCallback1 } from 'models/Callbacks';
import { fetchAuthorDataRoutine, followAuthorRoutine, unfollowAuthorRoutine } from '../../routines';
import { IAuthorData } from 'screens/AuthorPublicPage/models/IAuthorData';
import { GradientButton } from 'components/buttons/GradientButton';
import styles from './styles.module.sass';
import AuthorPublicMenu from './authorPublicMenu';
import { IUser } from '@containers/AppRouter/models/IUser';
import AvatarWithGradient from '@components/avatar/AvatarWithBackground';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';

export interface IAuthorPublic {
  match: any;
  fetchAuthorData: IBindingCallback1<string>;
  authorData: IAuthorData;
  followAuthor: IBindingCallback1<string>;
  unfollowAuthor: IBindingCallback1<string>;
  user: IUser;
  loading: boolean;
}

const AuthorPublicPage: React.FunctionComponent<IAuthorPublic> = ({
  match, fetchAuthorData, authorData, followAuthor, unfollowAuthor, user, loading = true
}) => {
  useEffect(() => {
    fetchAuthorData(match.params.authorId);
  }, []);
  const handleOnClickFollow = () => {
    followAuthor(match.params.authorId);
  };
  const handleOnClickUnfollow = () => {
    unfollowAuthor(match.params.authorId);
  };
  const isSelfPublicPage = user.id === authorData.userId;
  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.wideContainer}>
          <InlineLoaderWrapper loading={loading} centered />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.page}>
      <div className={styles.wideContainer}>
        <div className={styles.authorMainContainer}>
          <div className={styles.authorAvatarWrapper}>
            <AvatarWithGradient
              className={styles.authorPublicAvatar}
              imageSrc={authorData.avatar}
              alt={`${authorData.firstName} ${authorData.lastName} avatar`}
            />
          </div>
          <div className={styles.authorMainInfoWrapper}>
            <div className={styles.authorNamePublicPage}>
              {`${authorData.firstName} ${authorData.lastName}`}
            </div>
            {authorData.schoolName !== '' && (
              <div className={styles.authorKnewlessStatic}>
                <Link className={styles.cardSchoolLinkWrapper} to={`/school/${authorData.schoolId}`}>
                  {`Author in ${authorData.schoolName}`}
                </Link>
              </div>
            )}
            {!isSelfPublicPage && authorData.printFollowButton && (
              <div className={styles.buttonsFollowLikeAuthor}>
                <GradientButton className={styles.authorFollowButton} onClick={handleOnClickFollow}>
                  <div className={styles.textButtonFollow}>Follow</div>
                </GradientButton>
              </div>
            )}
            {!isSelfPublicPage && !authorData.printFollowButton && (
              <div className={styles.buttonsFollowLikeAuthor}>
                <GradientButton className={styles.authorFollowButton} onClick={handleOnClickUnfollow}>
                  <div className={styles.unfollow}>
                    <div className={styles.textButtonUnfollow}>
                      Following
                    </div>
                  </div>
                </GradientButton>
              </div>
            )}
            <div className={styles.subscribersNumber}>
              <p className={styles.authorNumberFollowers}>
                {authorData.numberOfSubscribers}
              </p>
              &nbsp; followers
            </div>
            <div className={styles.authorBiography}>
              <p>ABOUT AUTHOR</p>
              <p>{authorData.biography}</p>
            </div>
          </div>
          <div className={styles.cardsAuthorPublicPageWrapper}>
            <div className={styles.cardsGridLines}>
              <div className={styles.cardCoursesNumberWrapper}>
                <div className={styles.cardStyleAuthorPublic}>
                  <div className={`${styles.cardMainInfo} ${styles.cardTextField}`}>
                    {authorData.courses.length}
                  </div>
                  <div className={styles.cardBottomText}>
                    Courses
                  </div>
                </div>
              </div>
              <div className={styles.cardSchoolLinkWrapper}>
                <div className={styles.cardStyleAuthorPublic}>
                  <div className={`${styles.cardMainInfo} ${styles.cardTextField}`}>
                    35
                  </div>
                  <div className={styles.cardBottomText}>
                    Practices
                  </div>
                </div>
              </div>
              <div className={styles.cardArticlesNumberWrapper}>
                <div className={styles.cardStyleAuthorPublic}>
                  <div className={`${styles.cardMainInfo} ${styles.cardTextField}`}>
                    {authorData.articles.length}
                  </div>
                  <div className={styles.cardBottomText}>
                    Articles
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.listCoursesArticlesWrapper}>
            <AuthorPublicMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  authorData: state.authorPublicData.authorData,
  user: state.appRouter.user,
  loading: state.authorPublicData.requests.dataRequest.loading
});

const mapDispatchToProps = {
  fetchAuthorData: fetchAuthorDataRoutine,
  followAuthor: followAuthorRoutine,
  unfollowAuthor: unfollowAuthorRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPublicPage);
