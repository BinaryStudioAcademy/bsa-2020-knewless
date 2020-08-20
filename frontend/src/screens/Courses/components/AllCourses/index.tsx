import React, { useState } from 'react';
import { ITag } from "@screens/Courses/models/ITag";
import { ICourseItem } from "@screens/Courses/models/ICourseItem";
import { IBindingAction, IBindingCallback1 } from "@models/Callbacks";

import styles from '../../containers/CoursesPage/styles.module.sass';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { Input } from 'semantic-ui-react';
import { CoursePreview } from '@components/CoursePreview';

export interface IAllCourses {
  courses: ICourseItem[];
  tags: ITag[];
  fetchData: IBindingAction;
  fetchCoursesByTag: IBindingCallback1<string>;
  loading: boolean;
}

export const AllCourses: React.FC<IAllCourses> = ({ courses, tags, fetchData, fetchCoursesByTag, loading }) => {
  const [allCoursesLoading, setAllCoursesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const handleClickTab = (tab: string, id?: string) => {
    setAllCoursesLoading(prev => !prev);
    setActiveTab(tab);
    if (id) {
      fetchCoursesByTag(id);
    } else {
      fetchData();
    }
    setTimeout(() => {
      setAllCoursesLoading(prev => !prev);
    }, 1000);
  }

  return (
    <>
      <div id='all_courses' className={`${styles.wide_container} ${styles.content_row}`}>
        <h3 className={`${styles.title}`}>Courses</h3>
        <div className={styles.courses_title}>
          <div className={styles.tags_title_container}>
            <div id='scrolable' className={styles.tags_wrapper}>
              <div className={styles.tags_content}>
                <div onClick={() => handleClickTab('All')} className={`${styles.tag} ${activeTab === 'All' && styles.active}`}>All</div>
                {loading || tags.map(t => (
                  <div
                    key={Math.random() * 100}
                    onClick={() => handleClickTab(t.name, t.id)}
                    className={`${styles.tag} ${activeTab === t.name && styles.active}`}
                  >
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.filter}>
            <Input size='mini' icon='search' fluid placeholder='Filter...' />
          </div>
        </div>
      </div>
      <div className={`${styles.wide_container} ${styles.content_row}`} style={{minHeight: '150px'}}>
        {
          allCoursesLoading
            ? <InlineLoaderWrapper loading={allCoursesLoading} centered={true} />
            : (
              <div className={styles.courses_container}>
                {
                  courses.map((c, index) => (
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
                  ))
                }
              </div>
            )}
      </div>
    </>
  )
}