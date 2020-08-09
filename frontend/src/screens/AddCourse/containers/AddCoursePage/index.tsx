import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { IBindingCallback1 } from 'models/Callbacks';
import { ICourse } from '../../models/ICourse';
import { Loader, Input, Dropdown, Button, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';
import { levelOptions } from '../../models/options';
import { compareName } from '../../components/shared/service';
import { IItem } from '../../components/shared/sharedInterface/IItem';
import PullSet from '../../components/shared/Pull';
import SelectedSet from '../../components/shared/Selected';
import { IAppState } from 'models/AppState';

interface IAddCourseProps {
  lectures: IItem [];
  teacherId?: string;
  loading: boolean;
  isLecturesLoaded: boolean;
  fetchLectures: IBindingCallback1<string>;
  saveCourse: IBindingCallback1<ICourse>;
}

const AddCourse: React.FunctionComponent<IAddCourseProps> = ({
  lectures,
  teacherId,
  loading,
  fetchLectures: getLectures,
  saveCourse: save,
  isLecturesLoaded
}) => {
  const [pull, setPull] = useState(Array<IItem>());
  useEffect(() => {
    if (lectures.length === 0 && !isLecturesLoaded) {
      getLectures('f5f987b5-eaee-4709-93f4-94ac585cb812');
    }
    setPull([...lectures.sort(compareName)]);
  }, [lectures, getLectures]);

  const handleBack = () => {
    useHistory.push('/');
  };

  const [selected, setSelected] = useState(Array<IItem>());
  const [description, setDescription] = useState('');
  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const isSaveble = (description !== '' && courseName !== '' && level !== '');
  const isReleseble = !(!isSaveble || selected.length < 1);

  const handleSave = (isRelease: boolean) => {
    if (!isSaveble) return;
    if (isRelease && !isReleseble) return;
    setButtonLoading(true);
    save({
      userId: 'f5f987b5-eaee-4709-93f4-94ac585cb812',
      name: courseName,
      level,
      isReleased: isRelease,
      lectures: selected.map(i => i.id),
      description
    });
    setButtonLoading(false);
    setSaved(true);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.settingsContainer}>
        <div className={styles.settingsInput}>
          <div className={styles.top}>
            <div className={styles.inputfield}>
              <div className={styles.textcontainer}>Course Name:</div>
              <Input
                disabled={saved}
                fluid
                type="text"
                value={courseName}
                placeholder="course..."
                onChange={ev => setCourseName(ev.target.value)}
                inverted
              />
            </div>
            <div className={styles.dropdown}>
              <div className={styles.textcontainer}>Complexity level:</div>
              <Dropdown
                disabled={saved}
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
            <div className={styles.textcontainer}>Add some description:</div>
            <textarea
              disabled={saved}
              onChange={ev => setDescription(ev.target.value)}
              className={!saved ? styles.customtextarea : styles.customtextareablurred}
              value={description}
            />
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
      {saved ? ''
        : (
          <div className={styles.buttonGroup}>
            <Button
              loading={buttonLoading}
              className={isSaveble ? styles.button_save : styles.button_save_disabled}
              animated={isSaveble ? 'vertical' : false}
              onClick={() => handleSave(false)}
            >
              {isSaveble ? (
                <div>
                  <Button.Content visible>Save</Button.Content>
                  <Button.Content hidden>
                    <Icon size="large" name="check" />
                  </Button.Content>
                </div>
              ) : 'Save' }
            </Button>
            <Button
              loading={buttonLoading}
              className={isReleseble ? styles.button_release : styles.button_release_disabled}
              animated={isReleseble ? 'vertical' : false}
              onClick={() => handleSave(true)}
            >
              {isReleseble ? (
                <div>
                  <Button.Content visible>Release</Button.Content>
                  <Button.Content hidden>
                    <Icon size="large" name="rocket" />
                  </Button.Content>
                </div>
              ) : 'Release' }
            </Button>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { lectures, isLecturesLoaded } = state.addcourse.data;
  return {
    lectures,
    isLecturesLoaded,
    loading: state.addcourse.requests.dataRequest.loading
  };
};

const mapDispatchToProps = {
  fetchLectures: fetchLecturesRoutine,
  saveCourse: saveCourseRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
