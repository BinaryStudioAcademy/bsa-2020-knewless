import React from 'react';
import { ICourseItem } from '@screens/Courses/models/ICourseItem';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { Input } from 'semantic-ui-react';
import { CoursePreview } from '@components/CoursePreview';
import styles from '../../containers/CoursesPage/styles.module.sass';
import { ITagData } from '@screens/CoursePage/models/ITagData';
import { TagTabSelector } from '@screens/Courses/components/TagTabSelector';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';

export interface IAllCourses {
  courses: ICourseItem[];
  tags: ITagData[];
  fetchData: IBindingAction;
  fetchCoursesByTag: IBindingCallback1<string>;
  loadingCourses: boolean;
  loadingTags: boolean;
}

export const AllCourses: React.FC<IAllCourses> = (
  { courses, tags, fetchData, fetchCoursesByTag, loadingCourses, loadingTags }
) => {
  function handleFetch(id: string) {
    if (id) {
      fetchCoursesByTag(id);
    } else {
      fetchData();
    }
  }

  return (
    <>
      <div id="all_courses" className={`${styles.wide_container} ${styles.content_row}`}>
        <h3 className={`${styles.title}`}>Courses</h3>
        <div className={styles.courses_title}>
          <TagTabSelector fetchData={id => handleFetch(id)} loading={loadingTags} tags={tags} />
          <div className={styles.filter}>
            <Input size="mini" icon="search" fluid placeholder="Filter..." />
          </div>
        </div>
      </div>
      <div className={`${styles.wide_container} ${styles.content_row}`} style={{ minHeight: '150px' }}>
        <InlineLoaderWrapper loading={loadingCourses} centered>
          <div className={styles.courses_container}>
            { courses.length !== 0 ? (
              courses.map(c => (
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
                />
              ))
            ) : (
              <RowPlaceholder
                className={styles.row_placeholder}
                title="No courses found by this tag"
                description="Try to select another one"
              />
            )}
          </div>
        </InlineLoaderWrapper>
      </div>
    </>
  );
};
