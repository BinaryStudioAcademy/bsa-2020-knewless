import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BottomNavigation } from '@screens/Landing/components/BottomNavigation';
import { navigations } from '@screens/Landing/services/mock';
import { Footer } from '@components/Footer';
import styles from './styles.module.sass';
import PathOverview from '@screens/PathPage/components/PathOverview';
import PathMenu from '@screens/PathPage/components/PathMenu';

const PathPage = () => {
  const { pathId } = useParams();

  useEffect(() => {
    if (pathId) {
      // console.log('FETCHING');
    }
  }, [pathId]);
  return (
    <>
      <div className={styles.content}>
        <PathOverview />
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

export default PathPage;
