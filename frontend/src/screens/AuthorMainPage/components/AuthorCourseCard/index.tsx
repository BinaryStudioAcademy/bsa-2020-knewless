import React from 'react';
import { Card, CardContent, CardHeader, CardMeta, Image } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { history } from '@helpers/history.helper';

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
      onClick={() => history.push(`/course/${id}`)}
    />
    <CardContent className={styles.inner_wrapper}>
      <CardHeader className={styles.title}>{name}</CardHeader>
      <CardMeta className={styles.meta_info} />
    </CardContent>
  </Card>
);
