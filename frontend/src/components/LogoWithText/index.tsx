import React from 'react';
import Logo from '../Logo';
import styles from './styles.module.sass';

const LogoWithText = () => (
  <div className={styles.container}>
    <Logo />
    <span className={styles.slogan}>KnewLess</span>
  </div>
);

export default LogoWithText;
