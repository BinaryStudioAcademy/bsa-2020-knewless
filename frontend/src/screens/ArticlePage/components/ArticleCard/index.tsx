import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardMeta, Icon, Image } from 'semantic-ui-react';
import styles from './styles.module.sass';
import GradientButton from '@components/buttons/GradientButton';
import defaultCourseImage from 'assets/images/default_course_image.jpg';
import { timeFormat } from '@helpers/time.helper';
import { history } from '@helpers/history.helper';

export interface ICardCategory {
  name: string;
  onClick: () => void;
}

export interface IArticleCardProps {
  id?: string;
  imageSrc: string;
  name: string;
  duration: number;
  hideButton?: boolean;
}

export const ArticleCard: React.FunctionComponent<IArticleCardProps> = ({
  id,
  imageSrc,
  name,
  duration,
  hideButton
}) => (
  <Card className={styles.course_card}>
    <Image src={imageSrc || defaultCourseImage} wrapped ui={false} className={styles.card_image} />
    <CardContent className={styles.inner_wrapper}>
      <CardHeader className={styles.title}>
        <Link to={`/article/${id}`} className={styles.link}><span>{name}</span></Link>
      </CardHeader>
      <CardMeta className={styles.meta_info}>
        <span className={styles.duration}>{timeFormat(duration)}</span>
        <span className={styles.label}> reading time</span>
      </CardMeta>
      {
          !hideButton
          && (
            <GradientButton
              icon
              labelPosition="right"
              onClick={() => history.push(`/article/${id}`)}
              className={styles.btn_more}
            >
              Read more
              <Icon name="angle right" className={styles.btn_more_arrow} />
            </GradientButton>
          )
        }
    </CardContent>
  </Card>
);
