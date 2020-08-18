import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { IBindingCallback1, IBindingAction } from 'models/Callbacks';
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
import { CoursePreview } from '@components/CoursePreview';
import { IAppState } from 'models/AppState';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import UploadLectureModal from '../../components/UploadLectureModal';
import CourseImage from '../../../../assets/images/default_course_image.jpg';

interface IAddCourseProps {
  lectures: ILecture [];
  courseId: string;
  isLecturesLoaded: boolean;
  fetchLectures: IBindingAction;
  saveCourse: IBindingCallback1<ICourse>;
}

const AddCourse: React.FunctionComponent<IAddCourseProps> = ({
  lectures,
  fetchLectures: getLectures,
  saveCourse: save,
  isLecturesLoaded
}) => {
  const history = useHistory();
  const [selected, setSelected] = useState(Array<ILecture>());
  const [pool, setPool] = useState(Array<ILecture>());
  useEffect(() => {
    if (lectures.length === 0 && !isLecturesLoaded) {
      getLectures();
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
        lectureURL={lecture.lectureURL}
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
    const pattern = /^[a-zA-Z0-9!:;=<>@#_$&()\\`.+,"-/ ]{2,40}$/;
    setIsValidName(pattern.test(courseName));
  };

  const validateDescription = () => {
    if (description.length === 0) return;
    const pattern = /^[a-zA-Z0-9!:;=<>@#_$&()\\`.+,"-/ ]{10,}$/;
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

  const isSaveble = (level !== '' && !isSaved && isValidName && isValidDescription
    && courseName.length > 1 && (description.length === 0 || description.length > 9));

  const isReleseble = isSaveble && selected.length > 0;

  const handleSave = (isRelease: boolean) => {
    if (!isSaveble) return;
    if (isRelease && !isReleseble) return;
    setIsSaved(true);
    setButtonLoading(true);
    save({
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
    history.push("/");
  };

  const handleUpdateLectures = () => {
    getLectures();
    const updated = [...lectures.sort(compareName)];
    const filtered = updated.filter(l => !selected.map(s => s.id).includes(l.id));
    setPool(filtered);
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
                <div className={styles.input_warning_container}>
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
                  {isValidName ? '' : 
                  (
                    <Label
                      basic
                      className={styles.warninglabel}
                      promt="true"
                    >
                      Should consists of 2-40 Latin letters, numbers or special characters.
                    </Label>
                  )}
                </div>
              </div>
              <div className={styles.dropdown}>
                <div className={styles.textcontainer}>Complexity level:</div>
                <div className={styles.dropdown_warning_container}>
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
                  {isValidLevel ? '' : 
                  (
                    <Label
                      basic
                      className={styles.warninglabel}
                      promt="true"
                    >
                      Shouldn't be empty.
                    </Label>
                  )}
                </div>
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
              {isValidDescription ? '' : 
                (
                  <Label
                    basic
                    className={styles.warninglabel}
                    promt="true"
                  >
                    Description should consists of 10 or more Latin letters, numbers or special characters, or be skipped.
                  </Label>
                )}
            </div>
            <div className={styles.textcontainer}>Preview:</div>
              <div className={styles.preview_warning_container}>
                <CoursePreview
                  image={previewImage}
                  lecturesNumber={selected.length}
                  name={courseName}
                  level={level}
                  durationMinutes={getMinutes(selected)}
                  action={handleUploadFile}
                  description={description}
                />
                {isValidImage ? '' : 
                (
                  <Label
                    basic
                    className={styles.warninglabel}
                    promt="true"
                  >
                    You should add image with jpg, png, jpeg file extension, or use default.
                  </Label>
                )}
              </div>
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
