import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom';
import { ICourseData } from '@screens/LecturePage/models/ICourseData';
import { IBindingCallback1 } from 'models/Callbacks';
import {
  chooseVideoRoutine,
  fetchCourseDtoRoutine,
  saveCourseReviewRoutine,
  saveWatchTimeRoutine
} from 'screens/LecturePage/routines';
import LecturesMenu from 'screens/LecturePage/containers/Lectures/lecturesMenu';
import { ILectures } from 'screens/LecturePage/models/ILectures';
import { IAppState } from '@models/AppState';
import useInterval from '../../../../services/use.interval.hook';
import './styles.sass';
import RatingModal from '@components/RatingModal';

export interface ILectureProps {
  match: any;
  lecturesData: ICourseData;
  fetchCourseDto: IBindingCallback1<string>;
  chosenVideoId: string;
  setChosenVideo: ({ chosenVideo }: {chosenVideo: string}) => void;
  saveWatchTime: Function;
  saveReview: IBindingCallback1<object>;
  isSaveReviewLoading: boolean;
  role: string;
}

function chooseSource(lecture: ILectures) {
  return lecture.webLink ? lecture.webLink : lecture.urlOrigin;
}

function necessaryVideo(chosenVideoProps: string, responseData: ICourseData, incomingLectureId: string) {
  if (chosenVideoProps === '') {
    if (responseData.id === null) {
      return '';
    }
    // This return gives lecture that you have called
    return chooseSource(responseData.lectures.filter(l => l.id === incomingLectureId)[0]);
  }
  if (responseData.id !== null) {
    // This return gives chosen video
    return chooseSource(responseData.lectures.filter(l => l.id === chosenVideoProps)[0]);
  }
  return '';
}

interface IPlayerProgress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const AUTOSAVE_MS = 10000;
const LecturePage: React.FunctionComponent<ILectureProps> = ({
  lecturesData,
  chosenVideoId,
  match, fetchCourseDto: getCourseDto,
  setChosenVideo,
  saveWatchTime,
  saveReview,
  isSaveReviewLoading,
  role
}) => {
  const [playerProgress, setPlayerProgress] = useState<IPlayerProgress>(
    { playedSeconds: 0, loaded: 0, loadedSeconds: 0, played: 0 }
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const initialLectureId = match.params.lectureId;

  // without suppression it becomes one long line
  // eslint-disable-next-line arrow-body-style
  const triggerSaveTime: any = useCallback(() => {
    return saveWatchTime(
      { watchTime: Math.round(playerProgress.playedSeconds), fraction: playerProgress.played, lectureId: chosenVideoId }
    );
  }, [playerProgress, chosenVideoId]);

  const saveCallback = useRef<Function>();

  useEffect(() => {
    saveCallback.current = triggerSaveTime;
  }, [triggerSaveTime]);

  useEffect(() => {
    getCourseDto(initialLectureId);
    setChosenVideo({ chosenVideo: initialLectureId });
    saveWatchTime({ watchTime: 0, fraction: 0, lectureId: initialLectureId });
    return () => saveCallback.current();
  }, []);

  const autoSave = () => {
    if (isPlaying) {
      triggerSaveTime();
    }
  };
  useInterval(() => autoSave(), AUTOSAVE_MS);

  const result = necessaryVideo(chosenVideoId, lecturesData, initialLectureId);

  const handlePause = () => {
    setIsPlaying(false);
    triggerSaveTime();
  };

  const handleEnded = () => {
    const prev = lecturesData.lectures.findIndex(l => l.id === chosenVideoId);
    const nextId = lecturesData.lectures[prev + 1] ? lecturesData.lectures[prev + 1].id : lecturesData.lectures[0].id;
    setChosenVideo({ chosenVideo: nextId });
    triggerSaveTime();
    if (role !== 'AUTHOR' && !lecturesData.reviewed && prev + 1 === lecturesData.lectures.length) {
      setIsReviewOpen(true);
    }
  };

  const handleChooseVideo = useCallback(chosenVideo => {
    triggerSaveTime();
    // When we switch to another video, player may not refresh it's progress before autosave
    // that's because it's refreshing it's progress once a second.
    // Due to that, we need to manually reset the progress so that when the interval
    // does autosave, it won't set the progress from the previous video to the one
    // we switched to.
    setPlayerProgress({ playedSeconds: 0, loaded: 0, loadedSeconds: 0, played: 0 });
    setChosenVideo(chosenVideo);
    saveWatchTime({ watchTime: 0, fraction: 0, lectureId: chosenVideo.chosenVideo });
  }, [triggerSaveTime]);

  const submitReview = (rating: number) => {
    saveReview({ rating, courseId: lecturesData.id });
    setIsReviewOpen(false);
  };

  const closeReview = () => {
    setIsReviewOpen(false);
  };

  return (
    <div>
      <RatingModal onClose={closeReview} isOpen={isReviewOpen} submit={submitReview} isLoading={isSaveReviewLoading} />
      <div className="mainContainer">
        <div className="player">
          <ReactPlayer
            className="react-player"
            url={result}
            width="100%"
            height="100%"
            playing
            controls
            onProgress={setPlayerProgress}
            onPlay={() => setIsPlaying(true)}
            onPause={handlePause}
            onEnded={() => handleEnded()}
          />
        </div>
        <div className="courseName">
          {lecturesData.name}
        </div>
        <div className="authorName">
          By&nbsp;
          <Link
            className="authorLink"
            to={`/author/${lecturesData.author.id}`}
          >
            {`${lecturesData.author.firstName} ${lecturesData.author.lastName}`}
          </Link>
        </div>
        <div className="lecturesList">
          <LecturesMenu setChosenVideo={handleChooseVideo} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  lecturesData: state.lecturePage.lectureDto,
  chosenVideoId: state.lecturePage.chosenVideo.chosenVideo,
  isSaveReviewLoading: state.coursePage.requests.saveReviewRequest.loading,
  role: state.appRouter.user.role.name
});

const mapDispatchToProps = {
  fetchCourseDto: fetchCourseDtoRoutine,
  setChosenVideo: chooseVideoRoutine,
  saveWatchTime: saveWatchTimeRoutine,
  saveReview: saveCourseReviewRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturePage);
