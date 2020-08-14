import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { IBindingCallback1 } from 'models/Callbacks';
import { ICourse } from '../../models/ICourse';
import { Input, Dropdown, Button } from 'semantic-ui-react';
import { Footer } from '../../../../components/Footer';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';
import { levelOptions } from '../../models/options';
import { compareName, getMinutes } from '../../services/helper.service';
import { IFilterableItem } from '../../../../components/FilterableList';
import { ILecture } from '../../models/ILecture';
import { LectureCard } from '../../components/LectureCard';
import { AddCourseDependenciesSelector } from '../../components/AddCourseDependenciesSelector';
import { CoursePreview } from '../../../../components/CoursePreview';
import { IAppState } from 'models/AppState';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import UploadLectureModal from '../../components/UploadLectureModal';
import CourseImage from '../../../../assets/images/default_course_image.jpg';

interface IAddCourseProps {
  lectures: ILecture [];
  userId?: string;
  courseId: string;
  isLecturesLoaded: boolean;
  fetchLectures: IBindingCallback1<string>;
  saveCourse: IBindingCallback1<ICourse>;
}

const AddCourse: React.FunctionComponent<IAddCourseProps> = ({
  lectures,
  userId,
  courseId,
  fetchLectures: getLectures,
  saveCourse: save,
  isLecturesLoaded
}) => {
  const history = useHistory();
  const [pool, setPool] = useState(Array<ILecture>());
  useEffect(() => {
    if (lectures.length === 0 && !isLecturesLoaded) {
      getLectures(userId);
    }
    setPool([...lectures.sort(compareName)]);
  }, [lectures, getLectures]);

  const handleBack = () => {
    history.push('/');
  };

  const itemToJsxWithClick = (item: IFilterableItem, click: (item) => void, isSelected?: boolean) => {
    const lecture = item as ILecture;
    return (
      <LectureCard
        name={lecture.name}
        description={lecture.description}
        timeMinutes={lecture.timeMinutes}
        key={lecture.id}
        onClick={() => click(lecture)}
        isSelected={isSelected}
      />
    );
  };

  const [uploadImage, setUploadImage] = useState(null);
  const [selected, setSelected] = useState(Array<ILecture>());
  const [description, setDescription] = useState('');
  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(CourseImage);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
    setIsSaved(true);
    setButtonLoading(true);
    save({
      userId,
      name: courseName,
      level,
      isReleased: isRelease,
      lectures: selected.map(i => i.id),
      description,
      image: previewImage,
      uploadImage
    });
    setButtonLoading(false);
  };

  const handleCancel = () => {
    setPool([...lectures.sort(compareName)]);
    setSelected(Array<ILecture>());
    setDescription('');
    setCourseName('');
    setLevel('');
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <div className={styles.dividerwrp}>
          <h3 className={styles.title}>New Course</h3>
        </div>
        <div className={styles.wide_container}>
          <div className={styles.settingsInput}>
            <div className={styles.top}>
              <div className={styles.inputfield}>
                <div className={styles.textcontainer}>Course Name:</div>
                <Input
                  fluid
                  type="text"
                  value={courseName}
                  className={styles.customInput}
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
            <div className={styles.textcontainer}>Preview:</div>
            <CoursePreview
              image={previewImage}
              lecturesNumber={selected.length}
              name={courseName}
              level={level}
              durationMinutes={getMinutes(selected)}
              action={handleUploadFile}
              description={description}
            />
            <div className={styles.buttonGroup}>
              <div className={styles.buttonSaveGroup}>
                <Button
                  content="Save"
                  loading={buttonLoading}
                  className={isSaveble && !isSaved ? styles.button_save : styles.button_save_disabled}
                  onClick={() => handleSave(false)}
                />
                <GradientButton
                  loading={buttonLoading}
                  className={isReleseble && !isSaved ? styles.button_release : styles.button_release_disabled}
                  onClick={() => handleSave(true)}
                >
                  Release
                </GradientButton>
              </div>
              <GrayOutlineButton
                className={styles.buttonCancel}
                onClick={() => handleCancel()}
              >
                Cancel
              </GrayOutlineButton>
            </div>
          </div>
          <div className={styles.list_container}>
            <AddCourseDependenciesSelector
              selected={selected}
              stored={pool}
              selectedToStored={removeLectureFromSelected}
              storedToSelected={removeLectureFromPool}
              dependencyName="lecture"
              itemToJsx={itemToJsxWithClick}
              sortFn={compareName}
              openModalAction={setModalAddOpen}
            />
          </div>
        </div>
      </div>
      <Footer />
      {courseId === '' ? '' : <UploadLectureModal isOpen={modalAddOpen} openAction={setModalAddOpen} />}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { lectures, isLecturesLoaded, courseId } = state.addcourse.data;
  const { appRouter } = state;
  return {
    userId: appRouter.user.id,
    courseId,
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
