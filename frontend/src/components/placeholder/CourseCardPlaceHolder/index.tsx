import React, { useState } from 'react';
import { Card, CardContent, Placeholder, Icon } from 'semantic-ui-react'
import { StyledRating } from '@components/StyledRating';
import GradientButton from '@components/buttons/GradientButton';
import styles from './styles.module.sass';


export interface ICourseCardPlaceHolderProps {
  hideButton: boolean;
  dependencyName: string;
}

export const CourseCardPlaceHolder: React.FunctionComponent<ICourseCardPlaceHolderProps> = ({ hideButton, dependencyName }) => {

  return (
    <Card className={styles.course_card}>
      <Placeholder className={styles.img_wrp}>
        <Placeholder.Image />
      </Placeholder>
      <CardContent className={styles.inner_wrapper}>
        <Placeholder
          inverted 
          className={(dependencyName === 'landing' && styles.coursecard_landing_placeholder) ||
                      (dependencyName === 'student' && styles.coursecard_student_placeholder) ||
                      (dependencyName === 'author' && styles.coursecard_author_placeholder)}
        >
            {(dependencyName === 'landing') && 
              <Placeholder.Line className={styles.line_placeholder} length='medium' />}
            {dependencyName === 'landing' &&  
              <Placeholder.Line className={styles.line_placeholder} length='full' />}
            {dependencyName === 'landing' &&  
              <Placeholder.Line className={styles.line_placeholder} length='full' />}
            {dependencyName === 'landing' && 
              <Placeholder.Line className={styles.line_placeholder} length='full' />}
        </Placeholder>
        {dependencyName === 'landing' && (
          <div className={styles.rating_block}>
            <StyledRating rating={0} disabled />
          </div>
        )}
        {!hideButton
        && (
          <GradientButton
          icon
          labelPosition="right"
          disabled
          className={styles.btn_more}
          >
            <br />
            <Icon name="angle right" className={styles.btn_more_arrow} />
          </GradientButton>
        )
        }
      </CardContent>
    </Card>
  )
}