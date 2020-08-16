import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { IBindingCallback1 } from 'models/Callbacks';
import { ICourse } from '../../models/ICourse';
import { Input, Dropdown, Button, Label } from 'semantic-ui-react';
import { Footer } from '../../../../components/Footer';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';
import { levelOptions } from '../../models/options';
import { compareName, getMinutes, isImage } from '../../services/helper.service';
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
  fetchLectures: getLectures,
  saveCourse: save,
  isLecturesLoaded
}) => {
  const history = useHistory();
  const [selected, setSelected] = useState(Array<ILecture>());
  const [pool, setPool] = useState(Array<ILecture>());
  useEffect(() => {
    if (lectures.length === 0 && !isLecturesLoaded) {
      getLectures(userId);
    }
    const updated = [...lectures.sort(compareName)];
    const filtered = updated.filter(l => !selected.map(s => s.id).includes(l.id));
    setPool(filtered);
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

  const [isValidName, setIsValidName] = useState(true);
  const [isValidLevel, setIsValidLevel] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidImage, setIsValidImage] = useState(true);
  const [uploadImage, setUploadImage] = useState(null);
  const [description, setDescription] = useState('');
  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(CourseImage);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const validateName = () => {
    if (courseName.length === 0) {
      setIsValidName(false);
      return;
    }
    const pattern = /^[a-zA-Z0-9!:;=<>@#$&()\\-`.+,"/ ]{3,40}$/;
    setIsValidName(pattern.test(courseName));
  };

  const validateDescription = () => {
    if (description.length === 0) return;
    const pattern = /^[a-zA-Z0-9!:;=<>@#$&()\\-`.+,"/ ]{10,120}$/;
    setIsValidDescription(pattern.test(description));
  };

  const validateLevel = () => {
    if (level === '' || level === null || level === undefined) setIsValidLevel(false);
  };

  const handleUploadFile = async file => {
    const thisFile: File = file;
    if (thisFile && isImage(thisFile.name)) {
      setUploadImage(thisFile);
      setPreviewImage(URL.createObjectURL(thisFile));
      setIsValidImage(true);
    } else if (thisFile) setIsValidImage(false);
  };

  const removeLectureFromPool = useCallback((dependency: IFilterableItem) => {
    setPool(prev => prev.filter(c => c.id !== dependency.id));
    setSelected(prev => [...prev, dependency as ILecture]);
  }, [pool, selected]);

  const removeLectureFromSelected = useCallback((dependency: IFilterableItem) => {
    setSelected(prev => prev.filter(c => c.id !== dependency.id));
    setPool(prev => [...prev, dependency as ILecture]);
  }, [pool, selected]);

  const isSaveble = (level !== '' && !isSaved && isValidName && isValidDescription && isValidImage
    && courseName.length > 1 && (description.length === 0 || description.length > 9));

  const isReleseble = isSaveble && selected.length > 0;

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
    getLectures(userId);
    setPool([...lectures.sort(compareName)]);
    setSelected(Array<ILecture>());
    setDescription('');
    setCourseName('');
    setLevel('');
  };

  const handleUpdateLectures = () => {
    getLectures(userId);
    const updated = [...lectures.sort(compareName)];
    const filtered = updated.filter(l => !selected.map(s => s.id).includes(l.id));
    setPool(filtered);
  };

  const warning = `${isValidImage ? '' : 'You should add image with jpg, png, jpeg file extension, or use default.'} 
    ${isValidName ? ''
    : 'Name should consists of 2-40 Latin letters, numbers or special characters.'} 
    ${isValidDescription ? ''
    : 'Description should consists of 10 or more Latin letters, numbers or special characters, or be skipped.'}
    ${isValidLevel ? '' : 'Level field shouldn\'t be empty.'}`;

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <div className={styles.dividerwrp}>
          <h3 className={styles.title}>New Course</h3>
        </div>
        <Label
          basic
          className={warning.length > 20 ? styles.warninglabel : styles.warninglabel_hidden}
          promt="true"
        >
          {warning}
        </Label>
        <div className={styles.wide_container}>
          <div className={styles.settingsInput}>
            <div className={styles.top}>
              <div className={styles.inputfield}>
                <div className={styles.textcontainer}>Course Name:</div>
                <Input
                  fluid
                  type="text"
                  error={!isValidName}
                  value={courseName}
                  onBlur={() => validateName()}
                  className={styles.customInput}
                  onChange={ev => { setCourseName(ev.target.value); setIsValidName(true); }}
                  inverted
                />
              </div>
              <div className={styles.dropdown}>
                <div className={styles.textcontainer}>Complexity level:</div>
                <Dropdown
                  error={!isValidLevel}
                  onBlur={() => validateLevel()}
                  className={styles.lvldrop}
                  clearable
                  value={level}
                  onChange={(e, data) => { setLevel(data.value as string); setIsValidLevel(true); }}
                  search
                  selection
                  options={levelOptions}
                />
              </div>
            </div>
            <div className={styles.textcontainer}>Description:</div>
            <div className={styles.textareacontainer}>
              <textarea
                className={isValidDescription ? styles.customtextarea : styles.customtextarea_error}
                onChange={ev => { setDescription(ev.target.value); setIsValidDescription(true); }}
                value={description}
                onBlur={() => validateDescription()}
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
              updateLectures={handleUpdateLectures}
            />
          </div>
        </div>
      </div>
      <Footer />
      <UploadLectureModal
        isOpen={modalAddOpen}
        openAction={setModalAddOpen}
      />
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
