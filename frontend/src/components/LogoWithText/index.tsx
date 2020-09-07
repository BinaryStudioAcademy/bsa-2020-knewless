import React from 'react';
import Logo from '../Logo';
import styles from './styles.module.sass';
import { Link } from 'react-router-dom';

const LogoWithText = () => (
  <Link to="/" className={styles.container}>
    <Logo />
    <span className={styles.slogan}>KnewLess</span>
  </Link>
);

export default LogoWithText;
