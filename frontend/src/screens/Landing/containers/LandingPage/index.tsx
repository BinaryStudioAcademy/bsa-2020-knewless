import React, { useEffect } from 'react';
import { Input, Loader } from 'semantic-ui-react';
import styles from './styles.module.sass';
import video from '../../../../assets/videos/landing_video.webm';
import { CourseCard, ICourseCardProps } from '../../components/CourseCard';
import { IPathCardProps, PathCard } from '../../components/PathCard';
import { BottomNavigation } from '../../components/BottomNavigation';
import { connect } from 'react-redux';
import { IBindingAction } from '../../../../models/Callbacks';
import { INavigationSectionProps } from '../../components/NavigationSection';
import { IAppState } from '../../../../models/AppState';
import { fetchDataRoutine } from 'screens/Landing/routines';
import { CardsSegment } from '../../components/CardsSegment';

// eslint-disable-next-line
export interface ILandingProps {
  courses: ICourseCardProps[];
  paths: IPathCardProps[];
  navigations: INavigationSectionProps[];
  fetchData: IBindingAction;
  loading: boolean;
}

export const LandingPage: React.FunctionComponent<ILandingProps> = ({
  courses,
  paths,
  navigations,
  fetchData: getData,
  loading
}) => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.intro__container}>
        <div className={`${styles.wide_container} ${styles.intro__layout}`}>
          <div className={styles.intro__text}>
            <h1>Develop skills</h1>
            <h1>to drive results</h1>
            <p>
              With KnewLess, you can align your technology strategy to a skills strategy that moves you forward faster.
            </p>
            <Input icon="search" placeholder="Find courses" />
          </div>
          <div className={styles.intro__video_container}>
            <div className={styles.intro__video_cover} />
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              loop
              autoPlay
              className={styles.video_player}
              src={video}
            />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Most popular courses"
            onViewAllClick={() => (console.log('clicked view all courses'))}
            loading={loading}
          >
            {courses.map(c => (
              <div className={styles.course_card}>
                <CourseCard
                  name={c.name}
                  category={c.category}
                  author={c.author}
                  duration={c.duration}
                  imageSrc={c.imageSrc}
                  level={c.level}
                  rating={c.rating}
                  onOpenClick={c.onOpenClick}
                />
              </div>
            ))}
          </CardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.card_segment} ${styles.space_under}`}>
          <CardsSegment
            title="Paths"
            onViewAllClick={() => (console.log('clicked view all paths'))}
            loading={loading}
          >
            {paths.map(p => (
              <div className={styles.path_card}>
                <PathCard
                  name={p.name}
                  logoSrc={p.logoSrc}
                  courses={p.courses}
                  duration={p.duration}
                />
              </div>
            ))}
          </CardsSegment>
        </div>
      </div>
      <div className={styles.navigation_layer}>
        <div className={styles.wide_container}>
          {loading ? <Loader active inline="centered" />
            : <BottomNavigation navigations={navigations} />}
        </div>
      </div>
      <div className={styles.footer__layer}>
        <footer className={styles.wide_container}>
          <span>Copyright © 2018 Grada. All rights reserved.</span>
          <a href="/" className={styles.footer__align_right}>Terms & Conditions</a>
          <a href="/">Privacy Policy</a>
        </footer>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { navigations, paths, courses } = state.landing.data;
  return ({
    navigations,
    paths,
    courses,
    loading: state.landing.requests.dataRequest.loading
  });
};

const mapDispatchToProps = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
