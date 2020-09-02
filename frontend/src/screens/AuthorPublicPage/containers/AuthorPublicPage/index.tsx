import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IBindingCallback1 } from 'models/Callbacks';
import {
  fetchAuthorDataRoutine,
  followAuthorRoutine,
  unfollowAuthorRoutine,
  changeFavouriteAuthorStateRoutine,
  checkFavouriteAuthorStateRoutine
} from '../../routines';
import { IAuthorData } from 'screens/AuthorPublicPage/models/IAuthorData';
import { GradientButton } from 'components/buttons/GradientButton';
import styles from './styles.module.sass';
import AuthorPublicMenu from './authorPublicMenu';
import { IUser } from '@containers/AppRouter/models/IUser';
import AvatarWithGradient from '@components/avatar/AvatarWithBackground';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { ChartWrapper } from '@components/Charts/ChartWrapper';
import CirclePackingChart from '@components/Charts/CirclePackingChart';
import AddToFavouriteButton, { IFavourite } from '@components/AddToFavouritesButton/component/index';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import { getTagsNameWithCountFromCourses } from '@helpers/tag.helper';

export interface IAuthorPublic {
  match: any;
  fetchAuthorData: IBindingCallback1<string>;
  authorData: IAuthorData;
  followAuthor: IBindingCallback1<string>;
  unfollowAuthor: IBindingCallback1<string>;
  user: IUser;
  loading: boolean;
  checkFavourite: IBindingCallback1<IFavourite>;
  changeFavourite: IBindingCallback1<IFavourite>;
  favourite: boolean;
}

const AuthorPublicPage: React.FunctionComponent<IAuthorPublic> = ({
  match,
  fetchAuthorData,
  authorData,
  followAuthor,
  unfollowAuthor,
  user,
  loading = true,
  changeFavourite,
  checkFavourite,
  favourite
}) => {
  useEffect(() => {
    fetchAuthorData(match.params.authorId);
    checkFavourite({ id: match.params.authorId, type: SourceType.AUTHOR });
  }, [checkFavourite]);
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
  const chart = {
    wrapperId: 'chart',
    width: 110,
    height: 110
  };
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
            {!isSelfPublicPage && user.role?.name !== 'AUTHOR' && user && authorData.printFollowButton && (
              <div className={styles.buttonsFollowLikeAuthor}>
                <GradientButton className={styles.authorFollowButton} onClick={handleOnClickFollow}>
                  <div className={styles.textButtonFollow}>Follow</div>
                </GradientButton>
              </div>
            )}
            {!isSelfPublicPage && user.role?.name !== 'AUTHOR' && user && !authorData.printFollowButton && (
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
            {user.role?.name !== 'AUTHOR' && user && !isSelfPublicPage && (
              <div className={styles.button_favourite_wrp}>
                <AddToFavouriteButton
                  id={match.params.authorId}
                  type={SourceType.AUTHOR}
                  changeFavourite={changeFavourite}
                  isFavourite={favourite}
                />
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
                    <ChartWrapper width={chart.width} height={chart.height} id={chart.wrapperId}>
                      <CirclePackingChart
                        data={getTagsNameWithCountFromCourses(authorData.courses)}
                        width={chart.width}
                        height={chart.height}
                        wrapperId={chart.wrapperId}
                      />
                    </ChartWrapper>
                  </div>
                  <div className={styles.cardBottomText}>
                    Topics
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
  loading: state.authorPublicData.requests.dataRequest.loading,
  favourite: state.authorPublicData.authorData?.favourite
});

const mapDispatchToProps = {
  fetchAuthorData: fetchAuthorDataRoutine,
  followAuthor: followAuthorRoutine,
  unfollowAuthor: unfollowAuthorRoutine,
  changeFavourite: changeFavouriteAuthorStateRoutine,
  checkFavourite: checkFavouriteAuthorStateRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPublicPage);
