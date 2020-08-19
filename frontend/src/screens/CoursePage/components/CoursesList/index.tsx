import React from 'react';
import styles from './styles.module.sass';
import '../../styles/common.sass';
import { IAuthorCourseData } from '@screens/CoursePage/models/IAuthorCourseData';
import defaultCourseImage from 'assets/images/default_course_image.jpg';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';

interface ICoursesListProps {
  courses: IAuthorCourseData[];
  courseId: string;
}

const CoursesList: React.FunctionComponent<ICoursesListProps> = ({
  courses,
  courseId
}) => {
  const otherCourses = courses?.filter(c => c.id !== courseId).slice(0, 4);
  return (
    <div className={styles.list}>
      {
        otherCourses?.length > 0
          ? otherCourses?.map(c => (
            <React.Fragment key={c.id}>
              <div className={styles.course} key={c.id}>
                <img className={styles.course__image} src={c.imageSrc || defaultCourseImage} alt="Author's course" />
                <p className={styles.course__level}>{c.level}</p>
                <p className={styles.course__name}>{c.name}</p>
                <div className={styles.course__separator} />
              </div>
            </React.Fragment>
          ))
          : (
            <div className={styles.empty_list}>
              <ListPlaceholder
                title={"It's empty here"}
                description={"Author doesn't have other courses yet"}
              />
            </div>
          )
      }
    </div>
  );
};

export default CoursesList;
