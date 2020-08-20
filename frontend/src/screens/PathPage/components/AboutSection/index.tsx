import React from 'react';
import styles from './styles.module.sass';
import { authors, path } from '@screens/PathPage/services/mock';
import AuthorCard from '@screens/PathPage/components/AuthorCard';

const AboutSection = () => (
  <div className={styles.content}>
    <div className={`${styles.flex_item} ${styles.description}`}>
      <h1>Description</h1>
      <p>{path.description}</p>
    </div>
    <div className={styles.flex_item}>
      <h1>Authors</h1>
      <div className={styles.authors}>
        {
        authors.map(a => (
          <AuthorCard
            biography={a.biography}
            name={a.name}
            imageSrc={a.imageSrc}
          />
        ))
      }
      </div>
    </div>
  </div>
);

export default AboutSection;
