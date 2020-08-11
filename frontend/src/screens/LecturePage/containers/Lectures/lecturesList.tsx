import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { MdTimer } from 'react-icons/md';

import { IBindingCallback1 } from 'models/Callbacks';
import { chooseVideoRoutine } from '../../routines';
import { CourseData } from '../../models/CourseData';
import { ILecturesList } from '../../models/ILecturesList';

import './styles.sass';

export interface ILecturesListProps {
    listProps: ILecturesList;
    course: CourseData;
    setChoosedVideo: IBindingCallback1<ILecturesList>;
}

function secondsToTime(mins: any): string { // have to be fixed with moment.js
  const hours = Math.floor(mins / 60);

  const divisorForMinutes = mins % 60;
  const minutes = Math.floor(divisorForMinutes);

  const result = `${hours}h ${minutes}m 0s`;
  return result;
}

const LecturesList: React.FunctionComponent<ILecturesListProps> = ({
  course, listProps, setChoosedVideo
}) => (
  <div>
    {course.lectures.map((l, i) => (
      <Card
        className={listProps.choosedVideo === l.id ? 'lecture active' : 'lecture'}
        onClick={() => setChoosedVideo({ choosedVideo: l.id })}
        animated={false}
      >
        <div className="numberWrapper">
          <div className="cardNumber">
            <p className="numberText">
              {i + 1}
            </p>
          </div>
        </div>
        <Card.Description className="videoDescription">
          <div className="descriptionText">
            {l.description.slice(0, 30)}
          </div>
        </Card.Description>
        <Card.Content
          className="videoDuration"
          meta={
            [<MdTimer className="timerImage" />,
              <div className="durationText">{secondsToTime(l.duration)}</div>]
          }
        />
      </Card>
    ))}
  </div>
);

const mapStateToProps = (state: any) => ({
  listProps: state.lecturePage.choosedVideo,
  course: state.lecturePage.lectureDto
});

const mapDispatchToProps = {
  setChoosedVideo: chooseVideoRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturesList);
