import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { ICourse } from '../../models/ICourse';
import { Button, Dropdown, Input, Label } from 'semantic-ui-react';
import { Footer } from '@components/Footer';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.sass';
import { levelOptions } from '../../models/options';
import { compareName, getMinutes, isImage } from '../../services/helper.service';
import { IFilterableItem } from '@components/FilterableList';
import { ILecture } from '../../models/ILecture';
import { LectureCard } from '../../components/LectureCard';
import { AddCourseDependenciesSelector } from '../../components/AddCourseDependenciesSelector';
import { CoursePreview } from '@components/CoursePreview';
import { IAppState } from 'models/AppState';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import UploadLectureModal from '../../components/UploadLectureModal';
import CourseImage from '@images/default_course_image.jpg';
import {
  COURSE_NAME_MESSAGE,
  DESCRIPTION_MESSAGE,
  IMAGE_FORMAT_MESSAGE,
  isValidCourseDescription,
  isValidCourseName,
  REQUIRED_FIELD_MESSAGE
} from '@helpers/validation.helper';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';

interface IAddCourseProps {
  lectures: ILecture [];
  courseId: string;
  isLecturesLoaded: boolean;
  fetchLectures: IBindingAction;
  saveCourse: IBindingCallback1<ICourse>;
  authorName: string;
}

const AddCourse: React.FunctionComponent<IAddCourseProps> = ({
  lectures,
  fetchLectures: getLectures,
  saveCourse: save,
  isLecturesLoaded,
  authorName
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

  const validateName = (newName?: string) => {
    const lastChangesName = typeof newName === 'string' ? newName : courseName;
    setIsValidName(!!lastChangesName && isValidCourseName(lastChangesName));
  };
  const validateDescription = (newName?: string) => setIsValidDescription(
    isValidCourseDescription(typeof newName === 'string' ? newName : description)
  );
  const validateLevel = (newName?: string) => {
    const lastChangesName = typeof newName === 'string' ? newName : level;
    setIsValidLevel(!!lastChangesName && levelOptions.filter(l => l.value === lastChangesName).length > 0);
  };
  const isRequiredFieldsValid = !!courseName && isValidName && isValidDescription && !!level && isValidLevel
    && isValidImage;
  const isReleseble = isRequiredFieldsValid && selected.length > 0;

  const handleUploadFile = file => {
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

  const handleSave = (isRelease: boolean) => {
    if (isRelease && !isReleseble) return;
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
    history.push('/');
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
                <div className={styles.textcontainer}>Name:</div>
                <div className={styles.input_warning_container}>
                  <Input
                    fluid
                    type="text"
                    error={!isValidName}
                    value={courseName}
                    onBlur={() => validateName()}
                    className={styles.customInput}
                    onChange={ev => {
                      const { value } = ev.target;
                      setCourseName(value);
                      validateName(value);
                    }}
                    inverted
                  />
                  {!isValidName && (
                    <Label
                      basic
                      className={styles.warninglabel}
                      promt="true"
                      content={COURSE_NAME_MESSAGE}
                    />
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
                    onChange={(e, data) => {
                      const value = data.value as string;
                      setLevel(value);
                      validateLevel(value);
                    }}
                    search
                    selection
                    options={levelOptions}
                  />
                  {!isValidLevel && (
                    <Label
                      basic
                      className={styles.warninglabel}
                      promt="true"
                    >
                      {REQUIRED_FIELD_MESSAGE}
                    </Label>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.textcontainer}>Description:</div>
            <div className={styles.textareacontainer}>
              <textarea
                className={isValidDescription ? styles.customtextarea : styles.customtextarea_error}
                onChange={ev => {
                  const { value } = ev.target;
                  setDescription(value);
                  validateDescription(value);
                }}
                value={description}
                onBlur={() => validateDescription()}
              />
              {!isValidDescription && (
                <Label
                  basic
                  className={styles.warninglabel}
                  promt="true"
                >
                  {DESCRIPTION_MESSAGE}
                </Label>
              )}
            </div>
            <div className={styles.textcontainer}>Preview:</div>
            <div className={styles.preview_warning_container}>
              <CoursePreview
                authorName={authorName}
                tags={['tag1', 'tag2', 'tag3']}
                rating={0}
                image={previewImage}
                lecturesNumber={selected.length}
                name={courseName}
                level={level}
                durationMinutes={getMinutes(selected)}
                action={handleUploadFile}
                description={description}
              />
              {!isValidImage && (
                <Label
                  basic
                  className={styles.warninglabel}
                  promt="true"
                >
                  {IMAGE_FORMAT_MESSAGE}
                </Label>
              )}
            </div>
            <div className={styles.buttonGroup}>
              <GrayOutlineButton
                className={styles.buttonCancel}
                onClick={() => handleCancel()}
                content="Cancel"
              />
              <div className={styles.buttonSaveGroup}>
                <Button
                  content="Save"
                  className={styles.button_save_disabled}
                  onClick={() => handleSave(false)}
                  disabled
                />
                <GradientButton
                  disabled={!isReleseble}
                  className={isReleseble ? styles.button_release : styles.button_release_disabled}
                  onClick={() => handleSave(true)}
                  loading={buttonLoading}
                  content="Release"
                />
              </div>
            </div>
          </div>
          <div className={styles.list_container}>
            <InlineLoaderWrapper loading={isLecturesLoaded} centered>
              {!isLecturesLoaded && (
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
              )}
            </InlineLoaderWrapper>
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
  const { firstName, lastName } = state.authorMainPage.data.author;
  return {
    userId: appRouter.user.id,
    authorName: `${firstName} ${lastName}`,
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
