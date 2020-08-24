import React from 'react';
import styles from './styles.module.sass';

const mock = {
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/'
  + 'thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
  name: 'Js for everybody',
  authorId: '1',
  authorName: 'Clark Kent'
};

const PathOverview = ({ isAuthorized }) => (
  <div className={styles.content}>
    <div className={`${styles.path_image}`}>
      <img src={mock.imageSrc} alt="Path" />
    </div>
    <div className={styles.description}>
      <h1 className={styles.description__path_name}>
        {mock.name}
      </h1>
      <div className={styles.description__meta_info}>
        <p>
          {'By '}
          {
            isAuthorized
              ? <a href={`/author/${mock.authorId}`}>{mock.authorName}</a>
              : <span>{mock.authorName}</span>
          }
        </p>
      </div>
    </div>
  </div>
);

export default PathOverview;
