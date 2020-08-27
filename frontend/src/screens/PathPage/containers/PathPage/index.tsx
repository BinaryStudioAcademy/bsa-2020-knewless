import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BottomNavigation } from '@screens/Landing/components/BottomNavigation';
import { navigations } from '@screens/Landing/services/mock';
import { Footer } from '@components/Footer';
import PathOverview from '@screens/PathPage/components/PathOverview';
import PathMenu from '@screens/PathPage/components/PathMenu';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import styles from './styles.module.sass';

interface IPathPageProps {
  loading: boolean;
  isAuthorized: boolean;
  role: string;
}

const PathPage: React.FC<IPathPageProps> = ({ loading, isAuthorized, role }) => {
  const { pathId } = useParams();

  useEffect(() => {
    if (pathId) {
      // console.log('FETCHING');
    }
  }, [pathId]);
  if (loading) return (<InlineLoaderWrapper loading={loading} centered />);
  return (
    <>
      <div className={styles.content}>
        <PathOverview pathId={pathId} role={role} isAuthorized={isAuthorized} />
        <PathMenu />
      </div>
      <div className={styles.navigation_layer}>
        <div className={styles.wide_container}>
          <BottomNavigation navigations={navigations} />
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { isAuthorized } = state.auth.auth;
  return {
    loading: state.pathPage.requests.dataRequest.loading,
    role: state.appRouter.user?.role?.name,
    isAuthorized
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PathPage);
