import React from 'react';
import { Card, CardContent, CardHeader, CardMeta, Image } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { Link } from 'react-router-dom';

export interface IAuthorCourseCardProps {
  id?: string;
  imageSrc: string;
  name: string;
}

export const AuthorCourseCard: React.FC<IAuthorCourseCardProps> = ({ id, imageSrc, name }) => (
  <Card className={styles.course_card}>
    <Image
      src={imageSrc}
      wrapped
      ui={false}
      className={styles.card_image}
    />
    <CardContent className={styles.inner_wrapper}>
      <CardHeader className={styles.title}>
        {id ? <span><Link to={`/course/${id}`}>{name}</Link></span> : <span>{name}</span>}
      </CardHeader>
      <CardMeta className={styles.meta_info} />
    </CardContent>
  </Card>
);
