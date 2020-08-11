import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import { CourseData } from 'screens/LecturePage/models/CourseData';
import { IBindingCallback1 } from 'models/Callbacks';
import { fetchCourseDtoRoutine, chooseVideoRoutine } from 'screens/LecturePage/routines';
import LecturesMenu from 'screens/LecturePage/containers/Lectures/lecturesMenu';
import { ILecturesList } from 'screens/LecturePage/models/ILecturesList';
import { ILectures } from 'screens/LecturePage/models/ILectures';

import './styles.sass';

export interface ILectureProps {
  match: any;
  lecturesData: CourseData;
  fetchCourseDto: IBindingCallback1<string>;
  lecturesListProps: ILecturesList;
  setChoosedVideo: IBindingCallback1<ILecturesList>;
}

function neccessaryVideo(choosedVideoProps: string, responseData: CourseData, incomingLectureId: string) {
  if (choosedVideoProps === '') {
    if (responseData.id === null) {
      return '';
    }
    // This return gives lecture that you have called
    return responseData.lectures.filter(l => l.id === incomingLectureId)[0].sourceUrl;
  }

  if (responseData.id !== null) {
    // This return gives choosed video
    return responseData.lectures.filter(l => l.id === choosedVideoProps)[0].sourceUrl;
  }

  return '';
}

function videosQueue(choosedVideoProps: string, responseData: CourseData, incomingLectureId: string) {
  const neccessaryVideoResult = neccessaryVideo(choosedVideoProps, responseData, incomingLectureId);
  if (neccessaryVideoResult !== '') {
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
    const indexNessVideo = nessVidId(responseData.lectures, neccessaryVideoResult);

    for (let i = 0; i < array.length; i += 1) {
      if (indexNessVideo + i < array.length) {
        resultArray.push(array[indexNessVideo + i]);
      } else {
        resultArray.push(array[i - array.length + indexNessVideo]);
      }
    }
    return resultArray;
  }
  return neccessaryVideoResult;
}
// videosQueue(lecturesListProps.choosedVideo, lecturesData, match.params.lectureId)

const LecturePage: React.FunctionComponent<ILectureProps> = ({
  lecturesData, lecturesListProps, match, fetchCourseDto: getCourseDto, setChoosedVideo
}) => {
  useEffect(() => {
    getCourseDto(match.params.lectureId);
    setChoosedVideo({ choosedVideo: match.params.lectureId });
  }, []);


  const booleanTrue = true;
  const resultList = videosQueue(lecturesListProps.choosedVideo, lecturesData, match.params.lectureId);

  return (
    <div>
      <div className="mainContainer">
        <div className="player">
          <ReactPlayer
            className="react-player"
            url={resultList}
            width="100%"
            height="100%"
            playing={booleanTrue}
            controls={booleanTrue}
            loop={booleanTrue}
          />
        </div>
        <div className="courseName">
          {lecturesData.name}
        </div>
        <div className="authorName">
          By &nbsp;
          <Link
            className="authorLink"
            to={`/author/${lecturesData.author.name}/${lecturesData.author.id}`}
          >
            {lecturesData.author.name}
          </Link>
        </div>
        <div className="lecturesList">
          <LecturesMenu />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  lecturesData: state.lecturePage.lectureDto,
  lecturesListProps: state.lecturePage.choosedVideo
});

const mapDispatchToProps = {
  fetchCourseDto: fetchCourseDtoRoutine,
  setChoosedVideo: chooseVideoRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturePage);
