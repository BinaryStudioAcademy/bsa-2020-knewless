import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import { ICourseData } from '@screens/LecturePage/models/ICourseData';
import { IBindingCallback1 } from 'models/Callbacks';
import { chooseVideoRoutine, fetchCourseDtoRoutine, saveWatchTimeRoutine } from 'screens/LecturePage/routines';
import LecturesMenu from 'screens/LecturePage/containers/Lectures/lecturesMenu';
import { ILectures } from 'screens/LecturePage/models/ILectures';

import './styles.sass';
import { IAppState } from '@models/AppState';
import useInterval from '../../../../services/use.interval.hook';

export interface ILectureProps {
  match: any;
  lecturesData: ICourseData;
  fetchCourseDto: IBindingCallback1<string>;
  chosenVideoId: string;
  setChosenVideo: ({ chosenVideo }: {chosenVideo: string}) => void;
  saveWatchTime: Function;
}

function necessaryVideo(chosenVideoProps: string, responseData: ICourseData, incomingLectureId: string) {
  if (chosenVideoProps === '') {
    if (responseData.id === null) {
      return '';
    }
    // This return gives lecture that you have called
    return responseData.lectures.filter(l => l.id === incomingLectureId)[0].sourceUrl;
  }

  if (responseData.id !== null) {
    // This return gives chosen video
    return responseData.lectures.filter(l => l.id === chosenVideoProps)[0].sourceUrl;
  }

  return '';
}

function videosQueue(chosenVideoProps: string, responseData: ICourseData, incomingLectureId: string) {
  const necessary = necessaryVideo(chosenVideoProps, responseData, incomingLectureId);
  if (necessary !== '') {
    const array = responseData.lectures.map(l => l.sourceUrl);
    const nessVidId = (lectures: ILectures[], nessVidResult: string) => {
      for (let i = 0; i < lectures.length; i += 1) {
        if (lectures[i].sourceUrl === nessVidResult) {
          return i;
        }
      }
      return undefined;
    };

    const resultArray = [];
    const indexNessVideo = nessVidId(responseData.lectures, necessary);

    for (let i = 0; i < array.length; i += 1) {
      if (indexNessVideo + i < array.length) {
        resultArray.push(array[indexNessVideo + i]);
      } else {
        resultArray.push(array[i - array.length + indexNessVideo]);
      }
    }
    return resultArray;
  }
  return necessary;
}

interface IPlayerProgress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const AUTOSAVE_MS = 10000;
const LecturePage: React.FunctionComponent<ILectureProps> = ({
  lecturesData, chosenVideoId, match, fetchCourseDto: getCourseDto, setChosenVideo, saveWatchTime
}) => {
  const [playerProgress, setPlayerProgress] = useState<IPlayerProgress>(
    { playedSeconds: 0, loaded: 0, loadedSeconds: 0, played: 0 }
  );
  const [isPlaying, setIsPlaying] = useState(false);
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

  const resultList = videosQueue(chosenVideoId, lecturesData, initialLectureId);

  const handlePause = () => {
    setIsPlaying(false);
    triggerSaveTime();
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

  return (
    <div>
      <div className="mainContainer">
        <div className="player">
          <ReactPlayer
            className="react-player"
            url={resultList}
            width="100%"
            height="100%"
            playing
            controls
            onProgress={setPlayerProgress}
            onPlay={() => setIsPlaying(true)}
            onPause={handlePause}
            onEnded={() => triggerSaveTime()}
          />
        </div>
        <div className="courseName">
          {lecturesData.name}
        </div>
        <div className="authorName">
          By &nbsp;
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
  chosenVideoId: state.lecturePage.chosenVideo.chosenVideo
});

const mapDispatchToProps = {
  fetchCourseDto: fetchCourseDtoRoutine,
  setChosenVideo: chooseVideoRoutine,
  saveWatchTime: saveWatchTimeRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturePage);
