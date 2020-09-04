import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PathOverview from '@screens/PathPage/components/PathOverview';
import PathMenu from '@screens/PathPage/components/PathMenu';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import styles from './styles.module.sass';
import { IBindingCallback1 } from '@models/Callbacks';
import { IPath } from '@screens/PathPage/models/IPath';
import { fetchPathDataRoutine } from '@screens/PathPage/routines';

interface IPathPageProps {
  fetchData: IBindingCallback1<string>;
  path: IPath;
  loading: boolean;
  isAuthorized: boolean;
  role: string;
  userId: string;
  error: string;
}

const PathPage: React.FC<IPathPageProps> = ({
  fetchData, path, loading, isAuthorized, role, userId, error
}) => {
  const { pathId } = useParams();

  useEffect(() => {
    if (pathId) {
      fetchData(pathId);
    }
  }, [pathId]);
  if (loading) {
    return (
      <div className={`${styles.content} ${styles.content__loading}`}>
        <InlineLoaderWrapper loading={loading} centered />
      </div>
    );
  }

  if (error) return <Redirect to="/404" />;

  return (
    <div className={styles.content}>
      <PathOverview isAuthorized={isAuthorized} path={path} pathId={pathId} role={role} userId={userId} />
      <PathMenu path={path} />
    </div>
  );
};
const mapStateToProps = (state: IAppState) => {
  const { path } = state.pathPage.pathData;
  const { isAuthorized } = state.auth.auth;
  return {
    path,
    loading: state.pathPage.requests.dataRequest.loading,
    error: state.pathPage.requests.dataRequest.error,
    userId: state.appRouter.user.id,
    role: state.appRouter.user.role?.name,
    isAuthorized
  };
};

const mapDispatchToProps = {
  fetchData: fetchPathDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PathPage);
