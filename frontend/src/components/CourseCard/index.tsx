import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardMeta, Icon, Image } from 'semantic-ui-react';
import styles from './styles.module.sass';
import GradientButton from '../buttons/GradientButton';
import { StyledRating } from '../StyledRating';
import defaultCourseImage from 'assets/images/default_course_image.jpg';
import { timeFormat } from '@helpers/time.helper';

export interface ICardCategory {
  name: string;
  onClick: () => void;
}

export interface ICourseCardProps {
  id?: string;
  category: ICardCategory;
  imageSrc: string;
  name: string;
  author: string;
  duration: number;
  level: string;
  rating: number;
  hideButton?: boolean;
  ratingCount: number;
}

export const CourseCard: React.FunctionComponent<ICourseCardProps> = ({
  id,
  category,
  imageSrc,
  name,
  author,
  duration,
  level,
  rating,
  hideButton,
  ratingCount
}) => {
  const history = useHistory();
  return (
    <Card className={styles.course_card}>
      <Image src={imageSrc || defaultCourseImage} wrapped ui={false} className={styles.card_image} />
      <CardContent className={styles.inner_wrapper}>
        <Button basic onClick={category.onClick} className={styles.btn_category}>{category.name}</Button>
        <CardHeader className={styles.title}>{name}</CardHeader>
        <CardMeta className={styles.meta_info}>
          <span>{author}</span>
          <span>{timeFormat(duration)}</span>
          <span>{level}</span>
        </CardMeta>
        <div className={styles.rating_block}>
          <StyledRating rating={rating} disabled />
          <p>
            (
            {' '}
            {ratingCount}
            {' '}
            )
          </p>
        </div>
        {
          !hideButton
          && (
            <GradientButton
              icon
              labelPosition="right"
              onClick={() => history.push(`/course/${id}`)}
              className={styles.btn_more}
            >
              Find out more
              <Icon name="angle right" className={styles.btn_more_arrow} />
            </GradientButton>
          )
        }
      </CardContent>
    </Card>
  );
};
