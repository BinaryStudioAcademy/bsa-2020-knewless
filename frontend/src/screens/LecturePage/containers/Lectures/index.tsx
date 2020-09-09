import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import { Link, Redirect } from 'react-router-dom';
import { ICourseData } from '@screens/LecturePage/models/ICourseData';
import { IBindingCallback1 } from 'models/Callbacks';
import {
  chooseVideoQualityRoutine,
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
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { OutlineDropdown } from '@components/Dropdown';
import { history } from '@helpers/history.helper';

export interface ILectureProps {
  match: any;
  lecturesData: ICourseData;
  isLecturesLoading: boolean;
  fetchCourseDto: IBindingCallback1<string>;
  chosenVideoId: string;
  setChosenVideo: ({ chosenVideo }: {chosenVideo: string}) => void;
  saveWatchTime: Function;
  saveReview: IBindingCallback1<object>;
  isSaveReviewLoading: boolean;
  role: string;
  quality: number;
  setQuality: IBindingCallback1<number>;
  loadingError: string;
}

function chooseSource(lecture: ILectures, quality = 720) {
  let url = '';
  let isShow = true;

  if (lecture.webLink) {
    return { url: lecture.webLink, isShow: false };
  }

  switch (quality) {
    case 1080: {
      url = lecture.url1080;
      if (url) break;
    }
    case 720: {
      url = lecture.url720;
      if (url) break;
    }
    case 480: {
      url = lecture.url480;
      if (url) break;
    }
    default: {
      url = lecture.urlOrigin;
      isShow = false;
      break;
    }
  }
  return { url, isShow };
}

// eslint-disable-next-line max-len
function necessaryVideo(chosenVideoProps: string, responseData: ICourseData, incomingLectureId: string, quality: number) {
  if (chosenVideoProps === '') {
    if (responseData.id === null) {
      return { url: '', isShow: false };
    }
    // This return gives lecture that you have called
    return chooseSource(responseData.lectures.filter(l => l.id === incomingLectureId)[0], quality);
  }
  if (responseData.id !== null) {
    // This return gives chosen video
    return chooseSource(responseData.lectures.filter(l => l.id === chosenVideoProps)[0], quality);
  }
  return { url: '', isShow: false };
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
  isLecturesLoading,
  chosenVideoId,
  match,
  fetchCourseDto: getCourseDto,
  setChosenVideo,
  saveWatchTime,
  saveReview,
  isSaveReviewLoading,
  role,
  quality,
  setQuality,
  loadingError
}) => {
  const [playerProgress, setPlayerProgress] = useState<IPlayerProgress>(
    { playedSeconds: 0, loaded: 0, loadedSeconds: 0, played: 0 }
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const initialLectureId = match.params.lectureId;
  const [result, setResult] = useState('');
  const [isShowQuality, setIsShowQuality] = useState(false);
  const [currentVideoDuration, setCurrentVideoDuration] = useState<number>(0);

  const triggerSaveTime: any = useCallback(
    () => saveWatchTime({
      watchTime: Math.round(playerProgress.playedSeconds),
      fraction: playerProgress.played,
      lectureId: chosenVideoId
    }), [playerProgress, chosenVideoId]
  );

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

  useEffect(() => {
    if (chosenVideoId) history.push(`/lecture/${chosenVideoId}`);
  }, [chosenVideoId]);

  const autoSave = () => {
    if (isPlaying) {
      triggerSaveTime();
    }
  };
  useInterval(() => autoSave(), AUTOSAVE_MS);

  useEffect(() => {
    const { url, isShow } = necessaryVideo(chosenVideoId, lecturesData, initialLectureId, quality);
    setResult(url);
    setIsShowQuality(isShow);
  }, [chosenVideoId, lecturesData]);

  useEffect(() => {
    const { url, isShow } = necessaryVideo(chosenVideoId, lecturesData, initialLectureId, quality);
    setResult(url);
    setIsShowQuality(isShow);
  }, [quality]);

  const handlePause = () => {
    setIsPlaying(false);
    triggerSaveTime();
  };

  const handleEnded = () => {
    const prev = lecturesData.lectures.findIndex(l => l.id === chosenVideoId);
    setPlayerProgress({ playedSeconds: 0, loaded: 0, loadedSeconds: 0, played: 0 });
    if (prev + 1 !== lecturesData.lectures.length) {
      const nextId = lecturesData.lectures[prev + 1].id;
      setChosenVideo({ chosenVideo: nextId });
    } else if (role !== 'AUTHOR' && !lecturesData.reviewed && !isReviewed) {
      setIsReviewOpen(true);
    }
    saveWatchTime({ watchTime: currentVideoDuration, fraction: 1, lectureId: chosenVideoId });
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
    setIsReviewed(true);
  };

  const closeReview = () => {
    setIsReviewOpen(false);
  };

  const onQualityChange = data => {
    setQuality(data);
  };

  if (loadingError) return <Redirect to="/404" />;

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
            onEnded={handleEnded}
            onDuration={setCurrentVideoDuration}
          />
          {isShowQuality && (
            <OutlineDropdown
              className="button_quality"
              placeholder="Quality"
              value={quality}
              onChange={(e, { value }) => onQualityChange(value)}
              options={[{ text: 1080, value: 1080 }, { text: 720, value: 720 }, { text: 480, value: 480 }]}
            />
          )}
        </div>
        {isLecturesLoading ? (
          <div className="courseName">
            <InlineLoaderWrapper loading={isLecturesLoading} centered={false} />
          </div>
        ) : (
          <>
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
              <LecturesMenu
                role={role}
                setChosenVideo={handleChooseVideo}
                playerProgress={playerProgress.playedSeconds}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  lecturesData: state.lecturePage.lectureDto,
  isLecturesLoading: state.lecturePage.requests.dataRequest.loading,
  loadingError: state.lecturePage.requests.dataRequest.error,
  chosenVideoId: state.lecturePage.chosenVideo.chosenVideo,
  isSaveReviewLoading: state.coursePage.requests.saveReviewRequest.loading,
  role: state.appRouter.user.role.name,
  quality: state.lecturePage.chosenVideo.quality
});

const mapDispatchToProps = {
  fetchCourseDto: fetchCourseDtoRoutine,
  setChosenVideo: chooseVideoRoutine,
  saveWatchTime: saveWatchTimeRoutine,
  saveReview: saveCourseReviewRoutine,
  setQuality: chooseVideoQualityRoutine.fulfill
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturePage);
