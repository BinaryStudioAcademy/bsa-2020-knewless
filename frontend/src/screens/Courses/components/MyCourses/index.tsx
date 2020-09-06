import React, { useState, useEffect } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { CoursePreview } from '@components/CoursePreview';

import styles from '../../containers/CoursesPage/styles.module.sass';
import { ICourseItem } from '@screens/Courses/models/ICourseItem';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';
import { history } from '@helpers/history.helper';

export interface IMyCourses {
  continueCourses: ICourseItem[];
  role: string;
  loading: boolean;
}

export const MyCourses: React.FC<IMyCourses> = ({
  continueCourses, loading, role
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const isAuthor = role === 'AUTHOR';
  useEffect(() => {
    if (isAuthor) {
      setActiveIndex(1);
    }
  }, [role]);

  if (loading) return null;

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const handleCreateCourseClick = () => history.push('/add_course');

  const noCoursesPlaceholder = isAuthor ? (
    <RowPlaceholder
      button={{ text: 'Create first course', onClick: handleCreateCourseClick }}
      description="Let's fix it! 🙂"
    />
  ) : <RowPlaceholder description="Just start your first course!" />;

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <div className={styles.title_container}>
          <h3 className={`${styles.title} ${styles.wide_container}`}>
            My Courses
            <Icon name="dropdown" />
          </h3>
        </div>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        {continueCourses.length > 0 ? (
          <div className={`${styles.wide_container}`}>
            <div className={styles.courses_container}>
              {loading || continueCourses.map(c => (
                <CoursePreview
                  key={c.id}
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
                  members={c?.members}
                  ratingCount={c.ratingCount}
                  role={role}
                  isReleased={c.releasedDate !== null}
                />
              ))}
            </div>
          </div>
        ) : noCoursesPlaceholder}
      </Accordion.Content>
    </Accordion>
  );
};
