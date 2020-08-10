import React from 'react';
import { Card, CardContent, CardHeader, CardMeta, Image } from 'semantic-ui-react';
import { AuthorOptionsDropdown } from '../AuthorOptionsDropdown';
import styles from './styles.module.sass';

export interface IAuthorCourseCardProps {
  imageSrc: string;
  name: string;
  onOpenClick: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export const AuthorCourseCard: React.FunctionComponent<IAuthorCourseCardProps> = ({
  imageSrc,
  name,
  onEditClick,
  onDeleteClick
}) => (
  <Card className={styles.course_card}>
    <Image src={imageSrc} wrapped ui={false} className={styles.card_image} />
    <CardContent className={styles.inner_wrapper}>
      <CardHeader className={styles.title}>
        <div className={styles.btns}>
          <span>{name}</span>
          {(onEditClick || onDeleteClick) && (
            <div className={styles.dropdown_right}>
              <AuthorOptionsDropdown
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardMeta className={styles.meta_info} />
    </CardContent>
  </Card>
);
