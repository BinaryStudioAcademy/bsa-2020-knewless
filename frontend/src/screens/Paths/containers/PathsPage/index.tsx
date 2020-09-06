import React, { useEffect } from 'react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import styles from './styles.module.sass';
import { IRole, RoleTypes } from '@containers/AppRouter/models/IRole';
import { IPathCardProps } from '@components/PathCard';
import {
  fetchPathsAndTagsRoutine,
  fetchPathsByTagRoutine,
  fetchAllPathsRoutine,
  fetchAllTagsRoutine,
  fetchAllAuthorPathsRoutine
} from '@screens/Paths/routines';
import { MyPaths } from '@screens/Paths/components/MyPaths';
import { AllPaths } from '@screens/Paths/components/AllPaths';
import { ITagData } from '@screens/CoursePage/models/ITagData';
import {
  extractAllPathsLoading, extractAllTagsLoading, extractAuthorPathsLoading,
  extractPathsAndTagsLoading,
  extractPathsByTagsLoading
} from '@screens/Paths/models/IPathsState';

export interface IPathsPageProps {
  paths: IPathCardProps[];
  myPaths: IPathCardProps[];
  tags: ITagData[];
  role?: IRole;
  fetchPathsAndTags: IBindingAction;
  fetchAuthorPaths: IBindingAction;
  fetchAllPaths: IBindingAction;
  fetchTags: IBindingAction;
  fetchPathsByTag: IBindingCallback1<string>;
  pathsAndTagsLoading: boolean;
  allPathsLoading: boolean;
  pathsByTagsLoading: boolean;
  authorPathsLoading: boolean;
  allTagsLoading: boolean;
}

const PathsPage: React.FC<IPathsPageProps> = ({
  paths,
  myPaths,
  tags,
  role,
  fetchPathsAndTags,
  fetchAuthorPaths,
  fetchAllPaths,
  fetchTags,
  fetchPathsByTag,
  pathsAndTagsLoading,
  allPathsLoading,
  pathsByTagsLoading,
  allTagsLoading
}) => {
  useEffect(() => {
    switch (role?.name) {
      case undefined: {
        fetchTags();
        fetchAllPaths();
        break;
      }
      case 'AUTHOR': {
        fetchAuthorPaths();
        break;
      }
      default: {
        fetchPathsAndTags();
      }
    }
  }, []);

  return (
    <div className={styles.courses_content}>
      {!pathsAndTagsLoading ? (
        <>
          {role && (
            <MyPaths
              myPaths={myPaths}
              loading={pathsAndTagsLoading}
              role={role.name}
            />
          )}
          {(!role || role.name !== RoleTypes.AUTHOR) && (
            <AllPaths
              paths={paths}
              tags={tags as any}
              fetchData={fetchAllPaths}
              fetchPathsByTag={fetchPathsByTag}
              loadingData={pathsAndTagsLoading}
              loadingAllPaths={allPathsLoading}
              loadingPathsByTag={pathsByTagsLoading}
              loadingTags={allTagsLoading}
            />
          )}
        </>
      ) : (<InlineLoaderWrapper loading centered />)}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  paths: state.pathsPage.data.paths,
  myPaths: state.pathsPage.data.myPaths,
  tags: state.pathsPage.data.tags,
  pathsAndTagsLoading: extractPathsAndTagsLoading(state),
  allPathsLoading: extractAllPathsLoading(state),
  pathsByTagsLoading: extractPathsByTagsLoading(state),
  authorPathsLoading: extractAuthorPathsLoading(state),
  allTagsLoading: extractAllTagsLoading(state),
  role: state.appRouter.user.role
});

const mapDispatchToProps = {
  fetchPathsAndTags: fetchPathsAndTagsRoutine,
  fetchPathsByTag: fetchPathsByTagRoutine,
  fetchAllPaths: fetchAllPathsRoutine,
  fetchTags: fetchAllTagsRoutine,
  fetchAuthorPaths: fetchAllAuthorPathsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PathsPage);
