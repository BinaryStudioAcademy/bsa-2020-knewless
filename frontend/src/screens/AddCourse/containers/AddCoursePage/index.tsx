import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { IBindingCallback1 } from 'models/Callbacks';
import { ICourse } from '../../models/ICourse';
import { Input, Dropdown, Button, Icon } from 'semantic-ui-react';
import { Footer } from '../../../../components/Footer';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';
import { levelOptions } from '../../models/options';
import { compareName } from '../../services/helper.service';
import { IFilterableItem } from '../../../../components/FilterableList';
import { ILecture } from '../../models/ILecture';
import { LectureCard } from '../../components/LectureCard';
import { DependenciesSelector } from '../../../../components/DependenciesSelector';
import { IAppState } from 'models/AppState';

interface IAddCourseProps {
  lectures: ILecture [];
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
  const [pool, setPool] = useState(Array<ILecture>());
  useEffect(() => {
    if (lectures.length === 0 && !isLecturesLoaded) {
      getLectures('f5f987b5-eaee-4709-93f4-94ac585cb812'); // getLectures(teacherId);
    }
    setPool([...lectures.sort(compareName)]);
  }, [lectures, getLectures]);

  const handleBack = () => {
    useHistory.push('/');
  };

  const itemToJsxWithClick = (item: IFilterableItem, click: (item) => void) => {
    const lecture = item as ILecture;
    return (
      <LectureCard
        name={lecture.name}
        description={lecture.description}
        timeMinutes={lecture.timeMinutes}
        key={lecture.id}
        onClick={() => click(lecture)}
      />
    );
  };

  const [uploadImage, setUploadImage] = useState(null);
  const [selected, setSelected] = useState(Array<ILecture>());
  const [description, setDescription] = useState('');
  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const history = useHistory();

  const handleUploadFile = async file => {
    setUploadImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const removeLectureFromPool = useCallback((dependency: IFilterableItem) => {
    setPool(prev => prev.filter(c => c.id !== dependency.id));
    setSelected(prev => [...prev, dependency as ILecture]);
  }, [pool, selected]);

  const removeLectureFromSelected = useCallback((dependency: IFilterableItem) => {
    setSelected(prev => prev.filter(c => c.id !== dependency.id));
    setPool(prev => [...prev, dependency as ILecture]);
  }, [pool, selected]);

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
    history.push('/main');
  };

  const handleCancle = () => {
    setPool([...lectures.sort(compareName)]);
    setSelected(Array<ILecture>());
    setDescription('');
    setCourseName('');
    setLevel('');
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <h1 className={`${styles.title} ${styles.wide_container}`}>New Course</h1>
        <div className={styles.wide_container}>
          <div className={styles.settingsInput}>
            <div className={styles.top}>
              <div className={styles.inputfield}>
                <div className={styles.textcontainer}>Course Name:</div>
                <Input
                  fluid
                  type="text"
                  value={courseName}
                  onChange={ev => setCourseName(ev.target.value)}
                  inverted
                />
              </div>
              <div className={styles.dropdown}>
                <div className={styles.textcontainer}>Complexity level:</div>
                <Dropdown
                  className={styles.lvldrop}
                  clearable
                  value={level}
                  onChange={(e, data) => setLevel(data.value as string)}
                  search
                  selection
                  options={levelOptions}
                />
              </div>
            </div>
            <div className={styles.textcontainer}>Description:</div>
            <div className={styles.textareacontainer}>
              <textarea
                onChange={ev => setDescription(ev.target.value)}
                className={styles.customtextarea}
                value={description}
              />
            </div>
            <div className={styles.buttonGroup}>
              <div className={styles.buttonSaveGroup}>
                <Button
                  content="Save"
                  loading={buttonLoading}
                  className={isSaveble ? styles.button_save : styles.button_save_disabled}
                  onClick={() => handleSave(false)}
                />
                <Button
                  content="Release"
                  loading={buttonLoading}
                  className={isReleseble ? styles.button_release : styles.button_release_disabled}
                  onClick={() => handleSave(true)}
                />
              </div>
              <Button
                content="Cancel"
                onClick={() => handleCancle()}
                className={styles.buttonCancel}
              />
            </div>
          </div>
          <div className={styles.list_container}>
            <DependenciesSelector
              selected={selected}
              stored={pool}
              selectedToStored={removeLectureFromSelected}
              storedToSelected={removeLectureFromPool}
              dependencyName="lecture"
              itemToJsx={itemToJsxWithClick}
              sortFn={compareName}
            />
          </div>
        </div>
      </div>
      <Footer />
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
