import React from 'react';
import styles from './styles.module.sass';
import { NavigationSection } from '../NavigationSection';
import LogoWithText from '@components/LogoWithText';
import { ICourseCardProps } from '@components/CourseCard';
import { IPathCardProps } from '@components/PathCard';
import { navigations } from '@screens/Landing/services/mock';

interface IBottomNavigationProps {
  courses: ICourseCardProps[];
  paths: IPathCardProps[];
}

const courseToLink = (course: ICourseCardProps) => ({ url: `/course/${course.id}`, text: course.name });
const pathToLink = (path: IPathCardProps) => ({ url: `/path/${path.id}`, text: path.name });

export const BottomNavigation: React.FunctionComponent<IBottomNavigationProps> = ({ courses, paths }) => (
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
      {courses.length > 0 && <NavigationSection key="Courses" title="Courses" links={courses.map(courseToLink)} />}
      {paths.length > 0 && <NavigationSection key="Paths" title="Paths" links={paths.map(pathToLink)} />}
      {navigations?.map(section => (
        <NavigationSection key={section.title} title={section.title} links={section.links} />
      ))}
    </div>
  </div>
);
