import React from 'react';
import styles from './styles.module.sass';
import { Label, Icon, Segment } from 'semantic-ui-react';
import { ILecture } from '../../models/ILecture';

interface ILectureComponentProps {
    id: string;
    name: string;
    isSelected: boolean;
    add?: Function;
    remove?: Function;
  }

const LectureComponent: React.FunctionComponent<ILectureComponentProps> = ({
  id,
  name,
  isSelected,
  add,
  remove
}) => {
  const handleClick = () => {
    const lecture: ILecture = {
      key: id,
      name
    };
    if (isSelected) {
      remove(lecture);
    } else {
      add(lecture);
    }
  };
  return (
    <div className={styles.lectureContainer}>
      <Segment>
        <Label
          attached="top right"
          basic
          size="small"
          as="a"
          inverted
          onClick={() => handleClick()}
        >
          {!isSelected ? <Icon name="plus" size="small" /> : <Icon name="x" size="small" /> }
        </Label>
        {name}
      </Segment>
    </div>
  );
};

export default LectureComponent;
