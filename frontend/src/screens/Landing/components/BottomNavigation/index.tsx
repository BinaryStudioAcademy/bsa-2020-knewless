import React from 'react';
import styles from './styles.module.sass';
import { INavigationSectionProps, NavigationSection } from '../NavigationSection';
import LogoWithText from '@components/LogoWithText';

interface IBottomNavigationProps {
  navigations: INavigationSectionProps[];
}

export const BottomNavigation: React.FunctionComponent<IBottomNavigationProps> = (
  { navigations }
) => (
  <div className={styles.layout}>
    <div>
      <div className={styles.logo}>
        <LogoWithText />
      </div>
      <p className={styles.about}>
        We are a BSA students&rsquo; team, who have created this website
        for you to improve your skills and for us to share our knowledge.
      </p>
    </div>
    <div className={styles.navigation}>
      {navigations?.map(section => (
        <NavigationSection key={section.title} title={section.title} links={section.links} />
      ))}
    </div>
  </div>
);
