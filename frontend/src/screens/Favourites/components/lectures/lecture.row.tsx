import React from 'react';
import styles from './styles.module.sass';
import { convertFromSeconds } from '@screens/Favourites/services/helper';
import { ILecture } from '@screens/Favourites/models/ILecture';
import { history } from '@helpers/history.helper';
import { Label, Icon } from 'semantic-ui-react';
import noVideo from '@images/noVideo.png';

interface ILectureRowProps {
  lecture: ILecture;
  remove: (id: string) => void;
}

export const LectureRow: React.FunctionComponent<ILectureRowProps> = ({
  lecture, remove
}) => {
  const redirectToLecture = () => {
    window.open(`/lecture/${lecture.id}`);
  };
  return (
    <div className={styles.row}>
      <div onClick={() => redirectToLecture()} className={styles.gridrow}>
        <div className={styles.content_item__first}>
          <img className={lecture.image? styles.course_image : styles.no_video} src={lecture.image ? lecture.image : noVideo} />
        </div>
        <div className={styles.content_name}>{lecture.name}</div>
        <div className={styles.content_item}>{lecture.course}</div>
        <div className={styles.content_item}>{lecture.author}</div>
        <div className={styles.content_item}>{convertFromSeconds(lecture.duration)}</div>
        <div className={styles.color_item}>{lecture.rating}</div>
      </div>
      <div className={styles.icon_wrp}>
        <Label
          basic
          size="tiny"
          as="a"
          className={styles.toolBarIcon}
          onClick={() => remove(lecture.id)}
        >
          <Icon name="minus" size="large" inverted />
        </Label>
      </div>
    </div>
  );
};

