import React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { ICourse } from 'screens/StudentPage/models/ICourse';

interface ICompletedCourseProps {
  course: ICourse;
}

const CompletedCourse: React.FC<ICompletedCourseProps> = props => {
  const { course } = props;
  const handleOnClick = () => {
    console.log('click');
  };
  return (
    <div className={styles.courseCard}>
      <div className={styles.wrapperProgress}>
        <div className={styles.progress}>
          {course.progress}
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
      <div className={styles.ready}>
        <Icon name="check" className={styles.icon} />
      </div>
    </div>
  );
};

export default CompletedCourse;
