import React from 'react';
import styles from './styles.module.sass';
import { Label, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const mock = {
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/'
    + 'thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
  name: 'Js for everybody',
  authorId: '1',
  authorName: 'Clark Kent'
};

const PathOverview = ({ isAuthorized, role, pathId }) => {
  const history = useHistory();
  return (
    <div className={styles.content}>
      <div className={`${styles.path_image}`}>
        <img src={mock.imageSrc} alt="Path" />
      </div>
      <div className={styles.description}>
        <h1 className={styles.description__path_name}>
          {mock.name}
          {role && role === 'AUTHOR' && (
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
              onClick={() => history.push(`/path/edit/${pathId}`)}
            >
              <Icon name='pencil' />
            </Label>
          )}
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
}

export default PathOverview;
