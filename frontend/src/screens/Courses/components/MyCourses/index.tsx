import React, { useState, useEffect } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { CoursePreview } from '@components/CoursePreview';

import styles from '../../containers/CoursesPage/styles.module.sass';
import { ICourseItem } from '@screens/Courses/models/ICourseItem';

export interface IMyCourses {
  continueCourses: ICourseItem[];
  role: string;
  loading: boolean;
}

export const MyCourses: React.FC<IMyCourses> = ({
  continueCourses, loading, role
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (role === 'AUTHOR') {
      setActiveIndex(1);
    }
  }, [role]);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <div className={styles.title_container}>
          <h3 className={`${styles.title} ${styles.wide_container}`}>My Courses <Icon name='dropdown' /></h3>
        </div>
      </Accordion.Title>
      <div className={`${styles.wide_container} ${styles.content_row}`}>
        <div className={styles.courses_container}>
          {
            loading || continueCourses.slice(0, 4).map((c, index) => (
              <CoursePreview
                key={index}
                id={c.id}
                authorName={c.authorName}
                authorId={c.authorId}
                tags={c.tags}
                rating={c.rating}
                image={c.imageSrc}
                lecturesNumber={c.lectures}
                durationMinutes={c.duration}
                level={c.level}
                flag={null}
                action={null}
                name={c.name}
                description={c.description}
              />
            ))}
        </div>
      </div>
      {
        continueCourses.length > 4 && (
          <Accordion.Content active={activeIndex === 1}>
            <div className={`${styles.wide_container}`}>
              <div className={styles.courses_container}>
                {
                  loading || continueCourses.slice(4, continueCourses.length).map((c, index) => (
                    <CoursePreview
                      key={index}
                      id={c.id}
                      authorName={c.authorName}
                      authorId={c.authorId}
                      tags={c.tags}
                      rating={c.rating}
                      image={c.imageSrc}
                      lecturesNumber={c.lectures}
                      durationMinutes={c.duration}
                      level={c.level}
                      flag={null}
                      action={null}
                      name={c.name}
                      description={c.description}
                    />
                  ))}
              </div>
            </div>
          </Accordion.Content>
        )
      }
    </Accordion>
  )
}