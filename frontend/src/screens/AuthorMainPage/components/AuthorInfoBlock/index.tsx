import { Button } from 'semantic-ui-react';
import React from 'react';
import { IAuthor } from '../../models/IAuthor';
import noAvatar from 'assets/images/no_avatar.jpg';
import styles from './styles.module.sass';
import AvatarWithGradient from '../../../../components/avatar/AvatarWithBackground';

interface IAuthorInfoBlockProps {
  author: IAuthor;
}

const AuthorInfoBlock: React.FunctionComponent<IAuthorInfoBlockProps> = (
  { author: { firstName = '', lastName = '', avatar, schoolInfo, followers = 0 } }
) => {
  const handleSchoolCreation = e => {
    // handle
  };
  const isAuthorHasSchool = schoolInfo !== undefined && schoolInfo !== null && schoolInfo.name;
  return (
    <div className={styles.user_info__container}>
      <div className={styles.container__centered}>
        <div className={styles.author_info}>
          <div className={styles.author_info__img_wrapper}>
            <AvatarWithGradient imageSrc={avatar} />
          </div>
          <div className={styles.author_info_text}>
            <span className={styles.author_info_text__title}>{`${firstName} ${lastName}`}</span>
            <span className={styles.count}>{`${followers} Followers`}</span>
          </div>
        </div>
        <div className={styles.school_container}>
          {isAuthorHasSchool ? (
            <>
              <div className={styles.school_container__text}>
                <h1>{schoolInfo.name}</h1>
                <p className={styles.count}>
                  {`${schoolInfo?.membersCount || 1} members`}
                </p>
              </div>
              <div className={styles.school_container__image}>
                <img src={schoolInfo?.logo} alt={schoolInfo.name} />
              </div>
            </>
          ) : (
            <div className={styles.no_school__container}>
              <div className={styles.no_school__msg}>Have no school?</div>
              <div className={styles.no_school__btns}>
                <Button
                  id={styles.no_school_btn}
                  onClick={e => handleSchoolCreation(e)}
                  size="massive"
                >
                  <p className={styles.btn_text}>Create new</p>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorInfoBlock;
