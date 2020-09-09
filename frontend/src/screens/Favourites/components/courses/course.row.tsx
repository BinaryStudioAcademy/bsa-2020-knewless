import React, { useState } from 'react';
import styles from './styles.module.sass';
import { convertFromSeconds, parseDate } from '@screens/Favourites/services/helper';
import { ICourse } from '@screens/Favourites/models/ICourse';
import { history } from '@helpers/history.helper';
import { StyledRating } from 'components/StyledRating';
import { Label, Icon } from 'semantic-ui-react';

interface ICourseRowProps {
  course: ICourse;
  remove: (id: string) => void
}

export const CourseRow: React.FunctionComponent<ICourseRowProps> = ({
  course, remove
}) => {
  const redirectToCourse = () => {
    history.push(`/course/${course.id}`);
  }
  return (
    <div className={styles.row}>
      <div onClick={() => redirectToCourse()} className={styles.gridrow}>
        <div className={styles.content_item__first}>
          <img className={styles.course_image} src={course.image}/>
        </div>
        <div className={styles.content_name}>{course.name}</div>
        <div className={styles.content_item}>{course.authorName}</div>
        <div className={styles.color_item}>{course.level}</div>
        <div className={styles.content_item}>{convertFromSeconds(course.duration)}</div>
        <div className={styles.content_item}><StyledRating rating={course.rating} className={`rating ${styles.rating}`} disabled /></div>
      </div>
      <div className={styles.icon_wrp}>
        <Label
          basic
          size="tiny"
          as="a"
          className={styles.toolBarIcon}
          onClick={() => remove(course.id)}
        >
          <Icon name="minus" size="large" inverted />
        </Label>
      </div>
    </div>
  );
};

