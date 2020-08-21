import React, { useEffect } from 'react';
import { fetchCoursesRoutine, fetchCoursesByTagRoutine, fetchAllCoursesRoutine, fetchAllAuthorCoursesRoutine } from '../../routines';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { ICourseItem } from '@screens/Courses/models/ICourseItem';
import { ITag } from '@screens/Courses/models/ITag';

import styles from './styles.module.sass';
import { AllCourses } from '../../components/AllCourses';
import { MyCourses } from '@screens/Courses/components/MyCourses';

export interface ICoursePageProps {
  courses: ICourseItem[];
  continueCourses: ICourseItem[];
  tags: ITag[];
  role: string;
  fetchData: IBindingAction;
  fetchAllAuthorCourses: IBindingAction;
  fetchAllCourses: IBindingAction;
  fetchCoursesByTag: IBindingCallback1<string>;
  loading: boolean;
}

const CoursePage: React.FC<ICoursePageProps> = ({
  courses, continueCourses, tags, fetchData, fetchAllCourses, fetchCoursesByTag, fetchAllAuthorCourses, loading, role
}) => {

  useEffect(() => {
    if (role === 'AUTHOR') {
      fetchAllAuthorCourses();
    } else {
      fetchData();
    }
  }, [fetchData, fetchAllAuthorCourses, role]);

  return (
    <div className={styles.courses_content}>
      {loading
        ? <InlineLoaderWrapper loading={loading} centered={true} />
        : (
          <>
            <MyCourses
              continueCourses={continueCourses}
              loading={loading}
              role={role}
            />
            {role !== 'AUTHOR' && (
              <AllCourses
                courses={courses}
                tags={tags}
                fetchData={fetchAllCourses}
                fetchCoursesByTag={fetchCoursesByTag}
                loading={loading}
              />
            )}
          </>
        )}
    </div >
  );
};

const mapStateToProps = (state: IAppState) => ({
  courses: state.coursesPage.data.courses,
  continueCourses: state.coursesPage.data.continueCourses,
  tags: state.coursesPage.data.tags,
  loading: state.coursesPage.requests.dataRequest.loading,
  role: state.appRouter.user.role.name
});

const mapDispatchToProps = {
  fetchData: fetchCoursesRoutine,
  fetchCoursesByTag: fetchCoursesByTagRoutine,
  fetchAllCourses: fetchAllCoursesRoutine,
  fetchAllAuthorCourses: fetchAllAuthorCoursesRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);