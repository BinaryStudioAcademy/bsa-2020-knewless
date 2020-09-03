import React from 'react';
import { Card, CardContent, Placeholder, Icon } from 'semantic-ui-react'
import GradientButton from '@components/buttons/GradientButton';
import styles from './styles.module.sass';

export interface IArticleCardPlaceHolderProps {
  hideButton: boolean;
}

export const ArticleCardPlaceHolder: React.FunctionComponent<IArticleCardPlaceHolderProps> = ({ hideButton}) => {
  return (
    <Card className={styles.course_card}>
      <Placeholder className={styles.img_wrp}>
        <Placeholder.Image />
      </Placeholder>
      <CardContent className={styles.inner_wrapper}>
        <Placeholder
          inverted 
          className={styles.coursecard_landing_placeholder}
        >
          <Placeholder.Line className={styles.line_placeholder} length='full' />
          <Placeholder.Line className={styles.line_placeholder} length='medium' />
        </Placeholder>
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