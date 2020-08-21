import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { MdTimer } from 'react-icons/md';
import { ICourseData } from '../../models/ICourseData';
import { ILecturesList } from '../../models/ILecturesList';

import './styles.sass';

export interface ILecturesListProps {
    listProps: ILecturesList;
    course: ICourseData;
    setChosenVideo: Function;
}

function secondsToTime(totalTime: any): string { 
  const HOUR = 60 * 60;
  const MIN = 60;
  console.log(totalTime);
  const hours = (totalTime > HOUR ) ? Math.trunc(totalTime / HOUR): undefined;
  totalTime = hours ? totalTime - hours * HOUR : totalTime;
  const mins = (totalTime > MIN || hours) ? Math.ceil(totalTime / MIN) : 0;
  const result = hours? `${hours}h ${mins}m`: `${mins}m`;
   return result;
}

const LecturesList: React.FunctionComponent<ILecturesListProps> = ({
  course, listProps, setChosenVideo
}) => (
  <div>
    {course.lectures.map((l, i) => (
      <Card
        className={listProps.chosenVideo === l.id ? 'lecture active' : 'lecture'}
        onClick={() => setChosenVideo({ chosenVideo: l.id })}
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
  listProps: state.lecturePage.chosenVideo,
  course: state.lecturePage.lectureDto
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturesList);
