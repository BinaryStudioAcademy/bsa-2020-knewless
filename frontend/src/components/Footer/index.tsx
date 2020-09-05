import styles from './styles.module.sass';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FunctionComponent = () => (
  <div className={styles.footer__layer}>
    <footer className={styles.wide_container}>
      <span>Copyright © 2020 BSA. All rights reserved.</span>
      <Link to="/" className={styles.footer__align_right}>Terms & Conditions</Link>
      <Link to="/">Privacy Policy</Link>
    </footer>
  </div>
);
