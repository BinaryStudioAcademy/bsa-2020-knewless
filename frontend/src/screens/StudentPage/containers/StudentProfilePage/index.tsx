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
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';

interface IStudentProfileProps {
  studentProfile: IStudentProfile;
  fetchStudentProfile: IBindingAction;
  isStudentProfileLoading: boolean;
}

const StudentProfile: React.FC<IStudentProfileProps> = ({
  studentProfile: profile,
  fetchStudentProfile: getStudentProfile,
  isStudentProfileLoading = true
}) => {
  useEffect(() => {
    getStudentProfile();
  }, []);

  const handleOnClickCourse = () => {
    console.log('click');
  };
  if (isStudentProfileLoading) return <InlineLoaderWrapper loading centered />;
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
        {profile.courses && profile.courses.filter(c => c.progress !== 100).length !== 0 ? (
          <div className={styles.currentCourse}>
            <List relaxed>
              {profile.courses.sort((a, b) => (a.progress > b.progress ? 1 : -1)).map(course => (
                course.progress !== 100
                && (
                <List.Item className={styles.course} onClick={handleOnClickCourse}>
                  <CurrentCourse
                    id={course.id}
                    author={course.author}
                    category={course.category}
                    level={course.level}
                    name={course.name}
                    timeMinutes={course.timeSeconds}
                    key={course.id}
                    previewSrc={course.image}
                    rating={course.rating}
                    progress={course.progress}
                  />
                </List.Item>
                )
              ))}
            </List>
          </div>
        ) : <RowPlaceholder />}
        <div className={styles.title}>Completed courses</div>
        <div className={styles.completedCourse}>
          <List relaxed>
            {profile.courses && profile.courses.filter(c => c.progress === 100).length !== 0
              ? profile.courses.map(course => (
                course.progress === 100
              && (
              <List.Item className={styles.completedCourseItem}>
                <CompletedCourse
                  id={course.id}
                  author={course.author}
                  category={course.category}
                  level={course.level}
                  name={course.name}
                  timeMinutes={course.timeSeconds}
                  key={course.id}
                  previewSrc={course.image}
                  rating={course.rating}
                  progress={course.progress}
                />
              </List.Item>
              )))
              : <RowPlaceholder webOnLeft={false} />}
          </List>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { studentProfile: { studentProfile } } = state;
  return {
    studentProfile,
    isStudentProfileLoading: state.studentProfile.requests.studentProfileRequest.loading
  };
};

const mapDispatchToProps = {
  fetchStudentProfile: fetchGetStudentProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
