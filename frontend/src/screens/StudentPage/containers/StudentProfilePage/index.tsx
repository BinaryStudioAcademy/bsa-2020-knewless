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
import { history } from '@helpers/history.helper';
import CirclePackingChart from '@components/Charts/CirclePackingChart';
import { ChartWrapper } from '@components/Charts/ChartWrapper';
import { getTagsNameWithCountFromCourses } from '@helpers/tag.helper';

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

  if (isStudentProfileLoading) return <InlineLoaderWrapper loading centered />;

  const handleDiscoverCoursesButtonClick = () => history.push('/courses');

  const noCoursesPlaceholder = (
    <RowPlaceholder
      description="Let's learn something new!"
      button={{ text: 'Discover new courses', onClick: handleDiscoverCoursesButtonClick }}
    />
  );

  const unfinishedCoursesAsc = [];
  const finishedCourses = [];

  if (profile?.courses?.length > 0) {
    profile.courses.forEach(c => (c.progress >= 100 ? finishedCourses.push(c) : unfinishedCoursesAsc.push(c)));
    unfinishedCoursesAsc.sort((a, b) => (a.progress > b.progress ? 1 : -1));
  }

  const chart = {
    wrapperId: 'chart',
    width: 130,
    height: 130,
    styles: {
      circlesColor: '#fff'
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.wrapperTitle}>
        <div id={styles.profileTitle}>Profile</div>
      </div>
      <div className={styles.wrapperTime}>
        <div className={styles.timeBlock}>
          <div className={styles.clock}>
            <ViewTotalTime totalTime={profile.totalContentWatched} />
          </div>
          <div className={styles.chart}>
            <ChartWrapper width={chart.width} height={chart.height} id={chart.wrapperId}>
              <CirclePackingChart
                data={getTagsNameWithCountFromCourses(profile.courses)}
                width={chart.width}
                height={chart.height}
                wrapperId={chart.wrapperId}
                styles={chart.styles}
              />
            </ChartWrapper>
            <div className={styles.chartLabel}>Topics</div>
          </div>
        </div>
      </div>
      <div className={styles.detailsProfile}>
        <div className={styles.title}>Currently learning</div>
        {unfinishedCoursesAsc.length > 0 ? (
          <div className={styles.currentCourse}>
            <List relaxed>
              {unfinishedCoursesAsc.map(course => (
                <List.Item className={styles.course}>
                  <CurrentCourse
                    id={course.id}
                    author={course.author}
                    level={course.level}
                    name={course.name}
                    timeMinutes={course.timeSeconds}
                    key={course.id}
                    previewSrc={course.image}
                    rating={course.rating}
                    progress={course.progress}
                  />
                </List.Item>
              ))}
            </List>
          </div>
        ) : noCoursesPlaceholder}
        <div className={styles.title}>Completed courses</div>
        <div className={styles.completedCourse}>
          <List relaxed>
            {finishedCourses.length > 0 ? (finishedCourses.map(course => (
              <List.Item className={styles.completedCourseItem}>
                <CompletedCourse
                  id={course.id}
                  author={course.author}
                  level={course.level}
                  name={course.name}
                  timeMinutes={course.timeSeconds}
                  key={course.id}
                  previewSrc={course.image}
                  rating={course.rating}
                  progress={course.progress}
                />
              </List.Item>
            ))) : <RowPlaceholder description="Just finish your first course." webOnLeft={false} />}
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
