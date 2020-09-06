import React from 'react';
import styles from './styles.module.sass';
import AuthorCard from '@screens/PathPage/components/AuthorCard';
import { IPath } from '@screens/PathPage/models/IPath';

export interface IAboutSectionProps {
 path: IPath;
}

const AboutSection: React.FC<IAboutSectionProps> = ({ path }) => (
  <div className={styles.content}>
    <div className={styles.description}>
      <h1>Description</h1>
      {path?.description ? <p>{path.description}</p> : <p className={styles.no_description}>No description.</p>}
    </div>
    <div>
      <h1>Authors</h1>
      <div className={styles.authors}>
        {path.authors?.map(a => (
          <AuthorCard
            biography={a?.biography}
            name={`${a?.firstName} ${a?.lastName}`}
            imageSrc={a?.avatar}
          />
        ))}
      </div>
    </div>
  </div>
);

export default AboutSection;
