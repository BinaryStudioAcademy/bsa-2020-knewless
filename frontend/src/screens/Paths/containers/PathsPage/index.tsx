import React, { useEffect } from 'react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import styles from './styles.module.sass';
import { IRole, RoleTypes } from '@containers/AppRouter/models/IRole';
import { IPathCardProps } from '@components/PathCard';
import {
  fetchPathsRoutine,
  fetchPathsByTagRoutine,
  fetchAllPathsRoutine,
  fetchAllTagsRoutine,
  fetchAllAuthorPathsRoutine
} from '@screens/Paths/routines';
import { MyPaths } from '@screens/Paths/components/MyPaths';
import { AllPaths } from '@screens/Paths/components/AllPaths';
import { ITagData } from '@screens/CoursePage/models/ITagData';

export interface IPathsPageProps {
  paths: IPathCardProps[];
  myPaths: IPathCardProps[];
  tags: ITagData[];
  role?: IRole;
  fetchData: IBindingAction;
  fetchAllAuthorPaths: IBindingAction;
  fetchAllPaths: IBindingAction;
  fetchTags: IBindingAction;
  fetchPathsByTag: IBindingCallback1<string>;
  loadingData: boolean;
  loadingAllPaths: boolean;
  loadingPathsByTag: boolean;
}

const PathsPage: React.FC<IPathsPageProps> = ({
  paths,
  myPaths,
  tags,
  role,
  fetchData,
  fetchAllAuthorPaths,
  fetchAllPaths,
  fetchTags,
  fetchPathsByTag,
  loadingData,
  loadingAllPaths,
  loadingPathsByTag
}) => {
  useEffect(() => {
    switch (role?.name) {
      case undefined: {
        fetchTags();
        fetchAllPaths();
        break;
      }
      case 'AUTHOR': {
        fetchAllAuthorPaths();
        break;
      }
      default: {
        fetchData();
      }
    }
  }, []);

  return (
    <div className={styles.courses_content}>
      {!loadingData && !loadingAllPaths && !loadingPathsByTag ? (
        <>
          {role && (
            <MyPaths
              myPaths={myPaths}
              loading={loadingData}
              role={role.name}
            />
          )}
          {(!role || role.name !== RoleTypes.AUTHOR) && (
            <AllPaths
              paths={paths}
              tags={tags as any}
              fetchData={fetchAllPaths}
              fetchPathsByTag={fetchPathsByTag}
              loadingData={loadingData}
              loadingAllPaths={loadingAllPaths}
              loadingPathsByTag={loadingPathsByTag}
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
  loadingData: state.pathsPage.requests.dataRequest.loading,
  loadingAllPaths: state.pathsPage.requests.allPathsRequest.loading,
  loadingPathsByTag: state.pathsPage.requests.pathsByTagRequest.loading,
  role: state.appRouter.user.role
});

const mapDispatchToProps = {
  fetchData: fetchPathsRoutine,
  fetchPathsByTag: fetchPathsByTagRoutine,
  fetchAllPaths: fetchAllPathsRoutine,
  fetchTags: fetchAllTagsRoutine,
  fetchAllAuthorPaths: fetchAllAuthorPathsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PathsPage);
