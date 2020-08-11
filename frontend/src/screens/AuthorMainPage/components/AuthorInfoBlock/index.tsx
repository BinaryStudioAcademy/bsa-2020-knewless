import styles from '../../containers/MainPage/styles.module.sass';
import { Button } from 'semantic-ui-react';
import React from 'react';
import { IAuthor } from '../../models/IAuthor';

interface IAuthorInfoBlockProps {
  author: IAuthor;
}

const AuthorInfoBlock: React.FunctionComponent<IAuthorInfoBlockProps> = (
  { author: { name, avatar, school, followers } }
) => {
  const handleSchoolCreation = e => {
    // handle
  };
  const isAuthorHasSchool = school !== undefined && school !== null && school.name;
  return (
    <div className={styles.user_info__container}>
      <div className={styles.container__centered}>
        <div className={styles.author_info}>
          <div className={styles.author_info__border_right}>
            <div className={styles.author_info__img_wrapper}>
              <img
                src={avatar}
                className={styles.author_info__img}
                alt="Author avatar"
              />
            </div>
            <div className={styles.author_info_text}>
              <p className={styles.author_info_text__title}>
                {`${name}`}
              </p>
              <p className={styles.count}>{`${followers} Followers`}</p>
            </div>
          </div>
        </div>
        <div className={styles.school_container}>
          {isAuthorHasSchool ? (
            <>
              <div className={styles.school_container__text}>
                <h1>{school.name}</h1>
                <p className={styles.count}>
                  {`${school?.membersCount || 1} members`}
                </p>
              </div>
              <div className={styles.school_container__image}>
                <img src={school?.logoLink} alt={school.name} />
              </div>
            </>
          ) : (
            <div className={styles.no_school__container}>
              <p className={styles.no_school__msg}>Have no school?</p>
              <div className={styles.no_school__btns}>
                <Button
                  id={styles.no_school_btn}
                  onSubmit={e => handleSchoolCreation(e)}
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