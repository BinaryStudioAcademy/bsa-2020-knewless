import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { MdTimer } from 'react-icons/md';
import { ICourseData } from '../../models/ICourseData';
import { ILecturesList } from '../../models/ILecturesList';
import { CircleProgress } from 'react-gradient-progress';
import { IBindingCallback1 } from 'models/Callbacks';
import AddToFavouriteButton, { IFavourite } from '@components/AddToFavouritesButton/component/index';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';

import { changeFavouriteLectureStateRoutine } from '@screens/LecturePage/routines';

import './styles.sass';
import { timeFormatLecture } from '@helpers/time.helper';

export interface ILecturesListProps {
    listProps: ILecturesList;
    course: ICourseData;
    setChosenVideo: Function;
    playerProgress: number;
    changeFavourite: IBindingCallback1<IFavourite>;
    role: string;
}

const LecturesList: React.FunctionComponent<ILecturesListProps> = ({
  course, listProps, setChosenVideo, playerProgress, changeFavourite, role
}) => {
  const setProgress = (progressLec, durationLec, id) => {
    if (listProps.chosenVideo === id) {
      return Math.min(Math.max(Math.ceil((playerProgress * 100) / durationLec), progressLec), 100);
    }
    return Math.min(progressLec, 100);
  };

  return (
    <div>
      {course.lectures.map((l, i) => (
        <Card
          className={listProps.chosenVideo === l.id ? 'lecture active' : 'lecture'}
          onClick={(e: any) => { if (e.target.tagName === 'I') return; setChosenVideo({ chosenVideo: l.id }); }}
          animated={false}
        >
          <div className="progressWrapper">
            <CircleProgress
              percentage={l.progress = setProgress(l.progress, l.duration, l.id)}
              width={50}
              strokeWidth={2}
              fontSize="12px"
              fontColor={['#FFFF']}
              primaryColor={['#3378BD', '#FF8576']}
              secondaryColor={['#121421']}
              className="progress"
            />
          </div>
          <Card.Description className="videoDescription">
            <div className="descriptionText" title={l.name}>
              {`${i + 1}. ${l.name ? l.name : l.description}`}
            </div>
          </Card.Description>
          {role === 'USER' && (
            <div className="icon_wrp">
              <AddToFavouriteButton
                id={l.id}
                type={SourceType.LECTURE}
                isFavourite={l.favourite}
                changeFavourite={changeFavourite}
              />
            </div>
          )}
          <Card.Content
            className="videoDuration"
            meta={
            [<MdTimer className="timerImage" />,
              <div className="durationText">{timeFormatLecture(l.duration)}</div>]
          }
          />
        </Card>
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  listProps: state.lecturePage.chosenVideo,
  course: state.lecturePage.lectureDto
});

const mapDispatchToProps = {
  changeFavourite: changeFavouriteLectureStateRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturesList);
