import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { MdTimer } from 'react-icons/md';
import { ICourseData } from '../../models/ICourseData';
import { ILecturesList } from '../../models/ILecturesList';

import './styles.sass';
import { timeFormatLecture } from '@helpers/time.helper';

export interface ILecturesListProps {
    listProps: ILecturesList;
    course: ICourseData;
    setChosenVideo: Function;
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
              <div className="durationText">{timeFormatLecture(l.duration)}</div>]
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
