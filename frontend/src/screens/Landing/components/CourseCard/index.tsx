import React from 'react';
import { Button, Card, CardContent, CardHeader, CardMeta, Icon, Image, Rating } from 'semantic-ui-react';
import styles from './styles.module.sass';
import './rating.sass';

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
}

export const CourseCard: React.FunctionComponent<ICourseCardProps> = ({
  category, imageSrc, name, author, duration,
  level, rating, onOpenClick
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
      <Rating defaultRating={rating} maxRating={5} size="huge" className="landing__rating_bar" />
      <Button icon labelPosition="right" onClick={onOpenClick} className={styles.btn_more}>
        Find out more
        <Icon name="angle right" className={styles.btn_more_arrow} />
      </Button>
    </CardContent>
  </Card>
);
