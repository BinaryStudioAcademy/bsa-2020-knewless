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
  coursesLoading: boolean;
  coursesByTagLoading: boolean;
  allCoursesLoading: boolean;
  allAuthorCoursesLoading: boolean;
  allTagsLoading: boolean;
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
  coursesLoading,
  coursesByTagLoading,
  allCoursesLoading,
  allAuthorCoursesLoading,
  allTagsLoading,
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

  if (coursesLoading || coursesByTagLoading || allCoursesLoading || allAuthorCoursesLoading || allTagsLoading) {
    return (
      <div className={styles.courses_content}>
        <InlineLoaderWrapper loading centered />
      </div>
    );
  }
  const notStartedCourses = [];
  const continueCoursesIds = continueCourses.map(c => c.id);
  courses.forEach(course => {
    if (!continueCoursesIds.includes(course.id)) {
      notStartedCourses.push(course);
    }
  });
  return (
    <div className={styles.courses_content}>
      <>
        {role && (
        <MyCourses
          continueCourses={continueCourses}
          loading={coursesLoading || allAuthorCoursesLoading}
          role={role.name}
        />
        )}
        {!role || role.name !== 'AUTHOR' ? (
          <AllCourses
            courses={notStartedCourses}
            tags={tags}
            fetchData={fetchAllCourses}
            fetchCoursesByTag={fetchCoursesByTag}
            loading={allCoursesLoading || allAuthorCoursesLoading}
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
  coursesLoading: state.coursesPage.requests.coursesRequest.loading,
  coursesByTagLoading: state.coursesPage.requests.coursesByTagRequest.loading,
  allCoursesLoading: state.coursesPage.requests.allCoursesRequest.loading,
  allAuthorCoursesLoading: state.coursesPage.requests.allAuthorCoursesRequest.loading,
  allTagsLoading: state.coursesPage.requests.allTagsRequest.loading,
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
