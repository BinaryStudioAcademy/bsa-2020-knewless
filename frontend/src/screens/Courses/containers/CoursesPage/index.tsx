import React, { useEffect } from 'react';
import {
  fetchCoursesRoutine,
  fetchCoursesByTagRoutine,
  fetchAllCoursesRoutine,
  fetchAllAuthorCoursesRoutine,
  fetchAllTagsRoutine,
  fetchDataForStudentRoutine
} from '../../routines';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { ICourseItem } from '@screens/Courses/models/ICourseItem';
import { ITag } from '@screens/Courses/models/ITag';
import { AllCourses } from '../../components/AllCourses';
import { MyCourses } from '@screens/Courses/components/MyCourses';
import { IRole, RoleTypes } from '@containers/AppRouter/models/IRole';
import styles from './styles.module.sass';
import {
  extractAllCoursesLoading,
  extractCoursesByTagLoading,
  extractDataForStudentLoading
} from '@screens/Courses/models/ICoursesState';

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
  fetchDataForStudent: IBindingAction;
  coursesLoading: boolean;
  coursesByTagLoading: boolean;
  allCoursesLoading: boolean;
  allAuthorCoursesLoading: boolean;
  allTagsLoading: boolean;
  loadingDataForStudent: boolean;
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
  fetchDataForStudent,
  coursesLoading,
  coursesByTagLoading,
  allCoursesLoading,
  allAuthorCoursesLoading,
  allTagsLoading,
  loadingDataForStudent,
  role
}) => {
  useEffect(() => {
    switch (role?.name) {
      case undefined: {
        fetchTags();
        fetchAllCourses();
        break;
      }
      case RoleTypes.USER: {
        fetchDataForStudent();
        break;
      }
      case RoleTypes.AUTHOR: {
        fetchAllAuthorCourses();
        break;
      }
      default: fetchData();
    }
  }, [fetchData, fetchAllAuthorCourses, fetchAllCourses, role]);
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
        {(!role || role.name !== RoleTypes.AUTHOR) && (
          <AllCourses
            courses={notStartedCourses}
            tags={tags as any}
            fetchData={fetchAllCourses}
            fetchCoursesByTag={fetchCoursesByTag}
            loadingCourses={allCoursesLoading || allAuthorCoursesLoading || coursesByTagLoading
            || loadingDataForStudent}
            loadingTags={loadingDataForStudent || allTagsLoading}
          />
        )}
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
  loadingDataForStudent: extractDataForStudentLoading(state),
  role: state.appRouter.user.role
});

const mapDispatchToProps = {
  fetchData: fetchCoursesRoutine,
  fetchCoursesByTag: fetchCoursesByTagRoutine,
  fetchAllCourses: fetchAllCoursesRoutine,
  fetchTags: fetchAllTagsRoutine,
  fetchAllAuthorCourses: fetchAllAuthorCoursesRoutine,
  fetchDataForStudent: fetchDataForStudentRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
