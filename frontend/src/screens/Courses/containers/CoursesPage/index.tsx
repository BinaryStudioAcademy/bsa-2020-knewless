import React, { useEffect } from 'react';
import {
  fetchCoursesRoutine,
  fetchCoursesByTagRoutine,
  fetchAllCoursesRoutine,
  fetchAllAuthorCoursesRoutine,
  fetchAllTagsRoutine
} from '../../routines';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { ICourseItem } from '@screens/Courses/models/ICourseItem';
import { ITag } from '@screens/Courses/models/ITag';
import { AllCourses } from '../../components/AllCourses';
import { MyCourses } from '@screens/Courses/components/MyCourses';
import { IRole } from '@containers/AppRouter/models/IRole';
import styles from './styles.module.sass';

export interface ICoursePageProps {
  courses: ICourseItem[];
  continueCourses: ICourseItem[];
  tags: ITag[];
  role?: IRole;
  fetchData: IBindingAction;
  fetchAllAuthorCourses: IBindingAction;
  fetchAllCourses: IBindingAction;
  fetchTags: IBindingAction;
  fetchCoursesByTag: IBindingCallback1<string>;
  loading: boolean;
}

const CoursePage: React.FC<ICoursePageProps> = ({
  courses,
  continueCourses,
  tags,
  fetchData,
  fetchAllCourses,
  fetchTags,
  fetchCoursesByTag,
  fetchAllAuthorCourses,
  loading,
  role
}) => {
  useEffect(() => {
    switch (role?.name) {
      case undefined: {
        fetchTags();
        fetchAllCourses();
        break;
      }
      case 'AUTHOR': {
        fetchAllAuthorCourses();
        break;
      }
      default: fetchData();
    }
  }, [fetchData, fetchAllAuthorCourses, fetchAllCourses, role]);

  if (loading) {
    return (
      <div className={styles.courses_content}>
        <InlineLoaderWrapper loading centered />
      </div>
    );
  }

  return (
    <div className={styles.courses_content}>
      <>
        {role && (
        <MyCourses
          continueCourses={continueCourses}
          loading={loading}
          role={role.name}
        />
        )}
        {!role || role.name !== 'AUTHOR' ? (
          <AllCourses
            courses={courses}
            tags={tags}
            fetchData={fetchAllCourses}
            fetchCoursesByTag={fetchCoursesByTag}
            loading={loading}
          />
        ) : null}
      </>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  courses: state.coursesPage.data.courses,
  continueCourses: state.coursesPage.data.continueCourses,
  tags: state.coursesPage.data.tags,
  loading: state.coursesPage.requests.dataRequest.loading,
  role: state.appRouter.user.role
});

const mapDispatchToProps = {
  fetchData: fetchCoursesRoutine,
  fetchCoursesByTag: fetchCoursesByTagRoutine,
  fetchAllCourses: fetchAllCoursesRoutine,
  fetchTags: fetchAllTagsRoutine,
  fetchAllAuthorCourses: fetchAllAuthorCoursesRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
