import React from 'react';
import styles from './styles.module.sass';
import { useHistory } from 'react-router-dom';
import defaultCourseImage from 'assets/images/default_course_image.jpg';
import { Card, CardContent, CardHeader, CardMeta, Image } from 'semantic-ui-react';
import GradientButton from '@components/buttons/GradientButton';

export interface ICourseCardProps {
  id: string;
  imageSrc: string;
  name: string;
  author: string;
  duration: string;
  level: string;
}

export const CourseCard: React.FunctionComponent<ICourseCardProps> = ({
  id,
  imageSrc,
  name,
  author,
  duration,
  level
}) => {
  const history = useHistory();
  return (
    <Card className={styles.course_card}>
      <Image src={imageSrc || defaultCourseImage} wrapped ui={false} className={styles.card_image} />
      <CardContent className={styles.inner_wrapper}>
        <CardHeader className={styles.title}>{name}</CardHeader>
        <CardMeta className={styles.meta_info}>
          <span className={styles.author_name}>{author}</span>
          <span>{duration}</span>
          <span>{level}</span>
        </CardMeta>
        <GradientButton
          icon
          onClick={() => history.push(`/course/${id}`)}
          className={styles.btn_more}
        >
          Details
        </GradientButton>
      </CardContent>
    </Card>
  );
};
