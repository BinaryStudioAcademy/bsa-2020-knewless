import React, { createRef, useEffect, useState } from 'react';
import { Input, Label, Loader } from 'semantic-ui-react';
import styles from './styles.module.sass';
import video from '@videos/landing_video.webm';
import { CourseCard, ICourseCardProps } from '@components/CourseCard';
import { IPathCardProps, PathCard } from '@components/PathCard';
import { BottomNavigation } from '../../components/BottomNavigation';
import { connect } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';
import { INavigationSectionProps } from '../../components/NavigationSection';
import { IAppState } from '@models/AppState';
import { fetchDataRoutine } from 'screens/Landing/routines';
import { CardsSegment } from '@components/CardsSegment';
import { Footer } from '@components/Footer';
import { history } from '@helpers/history.helper';

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
  fetchData: triggerFetchData,
  loading
}) => {
  const [playerRunning, setPlayerRunning] = useState(true);
  const [query, setQuery] = useState('');
  const playerRef = createRef<HTMLVideoElement>();

  useEffect(() => {
    triggerFetchData();
  }, []);

  function setPlay(play: boolean) {
    setPlayerRunning(play);
    if (play) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }

  const onSearchFieldKeyPressed = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      history.push(`/search?q=${query}`);
    }
  };

  const onSearchFieldChange = data => {
    setQuery(data);
  };

  function handleViewAllCoursesClick() {
    console.log('clicked view all courses');
  }
  function handleViewAllPathsClick() {
    console.log('clicked view all paths');
  }

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
            <Input
              icon="search"
              placeholder="Find courses"
              onChange={((event, data) => onSearchFieldChange(data.value))}
              onKeyPress={onSearchFieldKeyPressed}
            />
          </div>
          <div className={styles.intro__video_container}>
            <div className={styles.intro__video_cover} />
            <div
              className={`${styles.intro__video__button_container} ${playerRunning && styles.hideable}`}
            >
              <Label
                className={styles.intro__video__button_play}
                onClick={() => setPlay(!playerRunning)}
                icon={playerRunning ? 'pause circle' : 'play circle'}
              />
            </div>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              loop
              autoPlay
              className={styles.video_player}
              src={video}
              muted
              ref={playerRef}
            />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={`${styles.wide_container} ${styles.content_row}`}>
          <CardsSegment
            title="Most popular courses"
            onViewAllClick={handleViewAllCoursesClick}
            loading={loading}
          >
            {loading || courses.map(c => (
              <div key={c.id} className={styles.course_card}>
                <CourseCard
                  id={c.id}
                  name={c.name}
                  category={c.category}
                  author={c.author}
                  duration={c.duration}
                  imageSrc={c.imageSrc}
                  level={c.level}
                  rating={c.rating}
                />
              </div>
            ))}
          </CardsSegment>
        </div>
        <div className={`${styles.wide_container} ${styles.card_segment} ${styles.space_under}`}>
          <CardsSegment
            title="Paths"
            onViewAllClick={handleViewAllPathsClick}
            loading={loading}
          >
            {loading || paths.map(p => (
              <div className={styles.path_card}>
                <PathCard
                  key={p.id}
                  id={p.id}
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
      <Footer />
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
