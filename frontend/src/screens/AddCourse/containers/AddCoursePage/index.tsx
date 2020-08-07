import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { IBindingCallback1 } from 'models/Callbacks';
import { ICourse } from '../../models/ICourse';
import { Loader, Input, Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';
import { levelOptions } from '../../models/options';
import { compareName } from '../../components/shared/service';
import { IItem } from '../../components/shared/sharedInterface/IItem';
import PullSet from '../../components/shared/Pull';
import { IAppState } from '../../../../models/AppState';
import SelectedSet from '../../components/shared/Selected';

interface IAddCourseProps {
  lectures: IItem [];
  teacherId?: string;
  loading: boolean;
  fetchLectures: IBindingCallback1<string>;
  saveCourse: IBindingCallback1<ICourse>;
}

const AddCourse: React.FunctionComponent<IAddCourseProps> = ({
  lectures,
  teacherId,
  loading,
  fetchLectures: getLectures,
  saveCourse: save
}) => {
  const [pull, setPull] = useState(Array<IItem>());
  useEffect(() => {
    getLectures('teacherId');
    setPull([...lectures.sort(compareName)]);
  }, [lectures, getLectures]);

  const handleBack = () => {
    useHistory.push('/');
  };

  const [selected, setSelected] = useState(Array<IItem>());
  const [description, setDescription] = useState('');
  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');

  const removeLectureFromPull = (lecture: IItem) => {
    const pullafter = pull.filter(i => i.id !== lecture.id);
    setPull(pullafter);
    const selectedafter = [...selected, lecture];
    selectedafter.sort(compareName);
    setSelected(selectedafter);
  };

  const removeLectureFromSelected = (lecture: IItem) => {
    const selectedafter = selected.filter(i => i.id !== lecture.id);
    setSelected(selectedafter);
    const pullafter = [...pull, lecture];
    pullafter.sort(compareName);
    setPull(pullafter);
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.settingsContainer}>
        <div className={styles.settingsInput}>
          <div className={styles.top}>
            <div className={styles.inputfield}>
              Course Name
              <br />
              <Input
                fluid
                type="text"
                value={courseName}
                placeholder="course..."
                onChange={ev => setCourseName(ev.target.value)}
                inverted
              />
            </div>
            <div className={styles.dropdown}>
              Complexity level:
              <br />
              <Dropdown
                clearable
                onChange={(e, data) => setLevel(data.value as string)}
                placeholder="Level"
                search
                selection
                options={levelOptions}
              />
            </div>
          </div>
          <div className={styles.textareacontainer}>
            Add some description:
            <br />
            <textarea className={styles.customtextarea} />
          </div>
        </div>
        <div className={styles.lecturesBox}>
          {loading ? <Loader active inline="centered" />
            : (
              <PullSet
                items={pull}
                remove={removeLectureFromPull}
              />
            )}
        </div>
      </div>
      <div className={styles.lecturesSelectedFlex}>
        <SelectedSet
          items={selected}
          remove={removeLectureFromSelected}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { lectures } = state.addcourse.data;
  return {
    lectures,
    loading: state.addcourse.requests.dataRequest.loading
  };
};

const mapDispatchToProps = {
  fetchLectures: fetchLecturesRoutine,
  saveCourse: saveCourseRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
