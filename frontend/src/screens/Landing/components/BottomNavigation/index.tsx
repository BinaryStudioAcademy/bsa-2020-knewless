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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nulla faucibus egestas elit, at eleifend elit ornare ut.
      </p>
    </div>
    <div className={styles.navigation}>
      {navigations?.map(section => (
        <NavigationSection title={section.title} links={section.links} />
      ))}
    </div>
  </div>
);
