import React from 'react';
import styles from './styles.module.sass';
import GradientButton from '@components/buttons/GradientButton';
import { history } from '@helpers/history.helper';

export const NotFoundPage: React.FC = () => (
  <div className={styles.main_container}>
    <div className={styles.wide_container}>
      <div className={styles.glitch} data-text="Oops!">Oops!</div>
      <div className={styles.not_found}>404 - Page not found</div>
      <div className={styles.error_description}>
        The page you are looking for might have been removed,
        had its name changed or is temporarily unavailable
      </div>
      <GradientButton
        className={styles.button_home}
        content="Go to homepage"
        onClick={() => history.push('/')}
      />
    </div>
  </div>
);
