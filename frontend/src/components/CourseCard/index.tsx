import React from 'react';
import { history } from '@helpers/history.helper';
import { Card, CardContent, CardHeader, CardMeta, Icon, Image } from 'semantic-ui-react';
import styles from './styles.module.sass';
import GradientButton from '../buttons/GradientButton';
import { StyledRating } from '../StyledRating';
import defaultCourseImage from 'assets/images/default_course_image.jpg';
import { timeFormat } from '@helpers/time.helper';
import { Tag } from '@components/TagSelector';

export interface ICourseCardProps {
  id?: string;
  imageSrc: string;
  name: string;
  author: string;
  authorId?: string;
  duration: number;
  level: string;
  rating: number;
  hideButton?: boolean;
  ratingCount: number;
  tags?: Tag[];
}

export const CourseCard: React.FC<ICourseCardProps> = ({
  id,
  imageSrc,
  name,
  author,
  authorId,
  duration,
  level,
  rating,
  hideButton,
  ratingCount,
  tags
}) => (
  <Card className={styles.course_card}>
    <Image src={imageSrc || defaultCourseImage} wrapped ui={false} className={styles.card_image} />
    <div className={styles.block_top}>
      <div className={styles.tags}>
        {tags && tags.slice(0, 3).map(t => <span>{t.name}</span>)}
      </div>
    </div>
    <CardContent className={styles.inner_wrapper}>
      <CardHeader className={styles.title}>
        <a href={`/course/${id}`} className={styles.link}><span>{name}</span></a>
      </CardHeader>
      <CardMeta className={styles.meta_info}>
        {authorId ? <span><a href={`/author/${authorId}`}>{author}</a></span> : <span>{author}</span>}
        <span className={styles.duration}>{timeFormat(duration)}</span>
        <span className={styles.level_text}>{level}</span>
      </CardMeta>
      <div className={styles.rating_block}>
        <StyledRating rating={rating} disabled />
        <p>{`( ${ratingCount} )`}</p>
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
