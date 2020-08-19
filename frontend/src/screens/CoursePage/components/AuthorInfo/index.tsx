import React from 'react';
import styles from './styles.module.sass';
import CoursesList from '@screens/CoursePage/components/CoursesList';
import { IAuthorCourseData } from '@screens/CoursePage/models/IAuthorCourseData';
import { IAuthorData } from '@screens/CoursePage/models/IAuthorData';
import noAvatar from 'assets/images/no_avatar.jpg';

interface IAuthorInfoProps {
  author: IAuthorData;
  courses: IAuthorCourseData[];
  courseId: string;
}

const AuthorInfo: React.FunctionComponent<IAuthorInfoProps> = ({
  author,
  courses,
  courseId
}) => (
  <div className="content_row">
    <div className={`${styles.info} flex_item aligned_item`}>
      <div className={`${styles.info_content} left_container`}>
        <img src={author?.avatar || noAvatar} className={styles.author_image} alt="Author" />
        <h1 className={styles.author_name}>
          {`${author?.firstName} ${author?.lastName}` || ''}
        </h1>
        {
          author?.schoolInfo?.name
          && (
          <div className={styles.school}>
            {`Author in ${author.schoolInfo.name}`}
          </div>
          )
        }
        <div className={styles.followers}>
          {author?.followers}
          &nbsp; followers
        </div>
        {
          author?.biography
          && (
          <p className={styles.author_biography}>
            <p className={styles.biography_header}>About author</p>
            {author?.biography}
          </p>
)
        }
      </div>
    </div>
    <div className={`${styles.more} flex_item`}>
      <h1 className={styles.more__title}>More from the author</h1>
      <CoursesList
        courses={courses}
        courseId={courseId}
      />
    </div>
  </div>
);

export default AuthorInfo;
