import React from 'react';
import { Progress } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { ICourse } from 'screens/StudentPage/models/ICourse';

const img = 'https://zendenwebdesign.com/wp-content/uploads/2017/10/Top-7-Programing-Languages-for-Web-Development.jpg';

interface ICurrentCourseProps {
  course: ICourse;
}
const CurrentCourse: React.FC<ICurrentCourseProps> = props => {
  const { course } = props;
  const handleOnClick = () => {
    console.log('click');
  };
  return (
    <div className={styles.courseCard}>
      <div className={styles.wrapperImage}>
        <div className={styles.progress}>
          <img src={course.image} alt="img" className={styles.imageCourse} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.category}>
          Category
        </div>
        <div className={styles.title}>
          {course.name}
        </div>
      </div>
      <div className={styles.progress}>
        <div className={styles.progressTime}>12h 2m</div>
        <div className={styles.wrapperProgress}>
          <Progress percent={80} className={styles.pg}>{course.progress}</Progress>
        </div>
      </div>
    </div>
  );
};

export default CurrentCourse;

