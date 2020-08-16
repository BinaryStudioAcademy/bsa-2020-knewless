import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import ViewTotalTime from 'screens/StudentPage/components/ViewTotalTime';
import { connect } from 'react-redux';
import { fetchGetStudentProfileRoutine } from '../../routines';
import { CurrentCourse } from 'screens/StudentPage/components/CurrentCourse';
import { CompletedCourse } from 'screens/StudentPage/components/CompletedCourse';
import { List } from 'semantic-ui-react';
import { IStudentProfile } from 'screens/StudentPage/models/IStudentProfile';
import { IBindingAction } from 'models/Callbacks';

interface IStudentProfileProps{
  studentProfile: IStudentProfile;
  fetchStudentProfile: IBindingAction;
}

const StudentProfile: React.FunctionComponent<IStudentProfileProps> = ({
  studentProfile: profile,
  fetchStudentProfile: getStudentProfile
}) => {
  useEffect(() => {
    getStudentProfile();
  }, []);

  const handleOnClickCourse = () => {
    console.log('click');
  };
  return (
    <div className={styles.profile}>
      <div className={styles.wrapperTitle}>
        <div id={styles.profileTitle}>Profile</div>
      </div>
      <div className={styles.wrapperTime}>
        <div className={styles.timeBlock}>
          <ViewTotalTime totalTime={profile.totalContentWatched} />
        </div>
      </div>
      <div className={styles.detailsProfile}>
        <div className={styles.title}>Currently learning</div>
        <div className={styles.currentCourse}>
          <List relaxed>
            {profile.courses ? profile.courses.map(course => (
              <List.Item className={styles.course} onClick={handleOnClickCourse}>
                <CurrentCourse
                  author={course.author}
                  category={course.category}
                  level={course.level}
                  name={course.name}
                  timeMinutes={course.timeMinutes}
                  key={course.id}
                  previewSrc={course.image}
                  rating={course.rating}
                />
              </List.Item>
            ))
              : <div className={styles.empty}>No courses here :(</div>}
          </List>
        </div>
        <div className={styles.title}>Completed courses</div>
        <div className={styles.completedCourse}>
          <List relaxed>
            {profile.courses ? profile.courses.map(course => (
              <List.Item className={styles.completedCourseItem}>
                <CompletedCourse
                  author={course.author}
                  category={course.category}
                  level={course.level}
                  name={course.name}
                  timeMinutes={course.timeMinutes}
                  key={course.id}
                  previewSrc={course.image}
                  rating={course.rating}
                />
              </List.Item>
            ))
              : <div className={styles.empty}>No courses here :(</div>}
          </List>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { studentProfile: { studentProfile } } = state;
  return {
    studentProfile
  };
};

const mapDispatchToProps = {
  fetchStudentProfile: fetchGetStudentProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
