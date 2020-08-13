import React from 'react';
import { Button, Card, CardContent, CardHeader, CardMeta, Icon, Image } from 'semantic-ui-react';
import styles from './styles.module.sass';
import GradientButton from '../buttons/GradientButton';
import { StyledRating } from '../StyledRating';

export interface ICardCategory {
  name: string;
  onClick: () => void;
}

export interface ICourseCardProps {
  category: ICardCategory;
  imageSrc: string;
  name: string;
  author: string;
  duration: string;
  level: string;
  rating: number;
  onOpenClick: () => void;
  hideButton?: boolean;
}

export const CourseCard: React.FunctionComponent<ICourseCardProps> = ({
  category,
  imageSrc,
  name,
  author,
  duration,
  level,
  rating,
  onOpenClick,
  hideButton
}) => (
  <Card className={styles.course_card}>
    <Image src={imageSrc} wrapped ui={false} className={styles.card_image} />
    <CardContent className={styles.inner_wrapper}>
      <Button basic onClick={category.onClick} className={styles.btn_category}>{category.name}</Button>
      <CardHeader className={styles.title}>{name}</CardHeader>
      <CardMeta className={styles.meta_info}>
        <span>{author}</span>
        <span>{duration}</span>
        <span>{level}</span>
      </CardMeta>
      <StyledRating rating={rating} disabled />
      {
        !hideButton
        && (
        <GradientButton icon labelPosition="right" onClick={onOpenClick} className={styles.btn_more}>
          Find out more
          <Icon name="angle right" className={styles.btn_more_arrow} />
        </GradientButton>
        )
      }
    </CardContent>
  </Card>
);
