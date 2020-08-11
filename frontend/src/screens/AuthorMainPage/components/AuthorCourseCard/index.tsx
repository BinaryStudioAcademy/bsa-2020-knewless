import React from 'react';
import { Card, CardContent, CardHeader, CardMeta, Image } from 'semantic-ui-react';
import { AuthorOptionsDropdown } from '../AuthorOptionsDropdown';
import styles from './styles.module.sass';

export interface IAuthorCourseCardProps {
  imageSrc: string;
  name: string;
  onOpenClick: () => void;
  onEditClick?: () => void;
}

export const AuthorCourseCard: React.FunctionComponent<IAuthorCourseCardProps> = ({
  imageSrc,
  name,
  onEditClick
}) => (
  <Card className={styles.course_card}>
    <Image src={imageSrc} wrapped ui={false} className={styles.card_image} />
    <CardContent className={styles.inner_wrapper}>
      <CardHeader className={styles.header}>
        <div className={styles.header__container}>
          <span className={styles.header__title}>{name}</span>
          {onEditClick && (
            <div className={styles.dropdown_right}>
              <AuthorOptionsDropdown
                onEditClick={onEditClick}
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardMeta className={styles.meta_info} />
    </CardContent>
  </Card>
);
