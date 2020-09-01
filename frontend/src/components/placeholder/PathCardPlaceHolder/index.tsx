import React from 'react';
import { Placeholder } from 'semantic-ui-react'
import styles from './styles.module.sass';

export interface IPathPlaceHolderCardProps {
    className?: string;
  }
  
export const PathCardPlaceHolder: React.FunctionComponent<IPathPlaceHolderCardProps> = ({ className }) => {
  return(
    <div className={className || ''}>
      <div className={styles.container}>
        <Placeholder inverted className={styles.logo}>
          <Placeholder.Image />
        </Placeholder>
        <Placeholder inverted className={styles.pathcard_placeholder}>
          <Placeholder.Line className={styles.line_placeholder}  length='medium' />
          <Placeholder.Line className={styles.line_placeholder}  length='full' />
          <Placeholder.Line className={styles.line_placeholder}  length='full' />
          <Placeholder.Line className={styles.line_placeholder}  length='very short' />
        </Placeholder>
      </div>
    </div>
  );
}
  
