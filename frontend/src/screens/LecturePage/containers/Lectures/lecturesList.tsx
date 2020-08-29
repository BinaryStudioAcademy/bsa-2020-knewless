import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { MdTimer } from 'react-icons/md';
import { ICourseData } from '../../models/ICourseData';
import { ILecturesList } from '../../models/ILecturesList';
import { IBindingCallback1 } from 'models/Callbacks';
import { IFavourite } from '@components/AddToFavouritesButton/component/index';
import { SourceType } from '@components/AddToFavouritesButton/helper/SourceType';
import AddToFavouriteButton from '@components/AddToFavouritesButton/component';
import { changeFavouriteLectureStateRoutine } from '@screens/LecturePage/routines';

import './styles.sass';
import { timeFormatLecture } from '@helpers/time.helper';

export interface ILecturesListProps {
    listProps: ILecturesList;
    course: ICourseData;
    setChosenVideo: Function;
    changeFavourite: IBindingCallback1<IFavourite>;
}

const LecturesList: React.FunctionComponent<ILecturesListProps> = ({
  course, listProps, setChosenVideo, changeFavourite
}) => (
  <div>
    {course.lectures.map((l, i) => (
      <Card
        className={listProps.chosenVideo === l.id ? 'lecture active' : 'lecture'}
        onClick={(e: any) => {if(e.target.tagName === "I") return; setChosenVideo({ chosenVideo: l.id });}}
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
          <div className="icon_wrp">
            <AddToFavouriteButton 
              id={l.id}
              type={SourceType.LECTURE}
              isFavourite={l.favourite}
              changeFavourite={changeFavourite}
            />
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
  changeFavourite: changeFavouriteLectureStateRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturesList);
