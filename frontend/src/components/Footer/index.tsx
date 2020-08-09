import styles from './styles.module.sass';
import React from 'react';

export const Footer: React.FunctionComponent = () => (
  <div className={styles.footer__layer}>
    <footer className={styles.wide_container}>
      <span>Copyright © 2020 BSA. All rights reserved.</span>
      <a href="/" className={styles.footer__align_right}>Terms & Conditions</a>
      <a href="/">Privacy Policy</a>
    </footer>
  </div>
);
