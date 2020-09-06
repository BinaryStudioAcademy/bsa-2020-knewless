import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  clearCourseRoutine,
  fetchEditCourseRoutine,
  fetchLecturesRoutine,
  fetchTagsRoutine,
  saveCourseRoutine,
  updateCourseRoutine
} from 'screens/AddCourse/routines';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { ICourse } from '../../models/ICourse';
import { Button, Dropdown, Input, Label } from 'semantic-ui-react';
import { Footer } from '@components/Footer';
import { useParams, useLocation } from 'react-router-dom';
import { history } from '@helpers/history.helper';
import styles from './styles.module.sass';
import { compareName, getMinutes, isImage } from '../../services/helper.service';
import { IFilterableItem } from '@components/FilterableList';
import { ILecture } from '../../models/ILecture';
import { LectureCard } from '../../components/LectureCard';
import { AddCourseDependenciesSelector } from '../../components/AddCourseDependenciesSelector';
import { CoursePreview } from '@components/CoursePreview';
import { IAppState } from 'models/AppState';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import UploadLectureModal from '../../components/UploadLectureModal';
import CourseImage from '@images/default_course_image.jpg';
import {
  COURSE_NAME_MESSAGE,
  DESCRIPTION_MESSAGE,
  IMAGE_FORMAT_MESSAGE,
  isOverviewValid,
  isValidCourseDescription,
  isValidCourseName,
  OVERVIEW_MESSAGE,
  REQUIRED_FIELD_MESSAGE
} from '@helpers/validation.helper';
import { levelOptions } from '@models/LevelsEnum';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import { IUpdateCourse } from '@screens/AddCourse/models/IUpdateCourse';
import { ITag } from '@screens/AddPath/models/domain';
import { fetchAuthorRoutine } from '@screens/AuthorMainPage/routines/index';
import OverviewModal from '@components/OverviewModal';
import { IRole } from '@containers/AppRouter/models/IRole';

interface IAddCourseProps {
  lectures: ILecture[];
  tags: ITag[];
  isTagsLoaded: boolean;
  fetchTags: IBindingAction;
  editCourse: IFullCourseData;
  courseId: string;
  isLecturesLoaded: boolean;
  fetchLectures: Function;
  saveCourse: IBindingCallback1<ICourse>;
  updateCourse: IBindingCallback1<IUpdateCourse>;
  fetchCourse: IBindingCallback1<string>;
  clearCourse: IBindingAction;
  fetchAuthor: IBindingAction;
  authorName: string;
  authorId: string;
  loadingEditCourse: boolean;
  isAuthorized: boolean;
  saveloading: boolean;
  role: IRole;
}

const AddCourse: React.FunctionComponent<IAddCourseProps> = ({
  lectures,
  tags,
  isTagsLoaded,
  fetchTags,
  editCourse,
  fetchLectures: getLectures,
  saveCourse: save,
  updateCourse,
  fetchCourse,
  clearCourse,
  isLecturesLoaded,
  authorName,
  authorId,
  loadingEditCourse,
  isAuthorized,
  saveloading,
  role,
  fetchAuthor
}) => {
  const location = useLocation();
  const { courseId } = useParams();  
  const isReleased = editCourse?.releasedDate !== null && editCourse?.releasedDate !== undefined;
  const isEdit = location.pathname.startsWith('/course/edit');
  const [selectedLectures, setSelectedLectures] = useState(Array<ILecture>());
  const [pool, setPool] = useState(Array<ILecture>());
  const [isValidName, setIsValidName] = useState(true);
  const [isValidLevel, setIsValidLevel] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidImage, setIsValidImage] = useState(true);
  const [uploadImage, setUploadImage] = useState(null);
  const [description, setDescription] = useState('');
  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');
  const [courseTags, setCourseTags] = useState([]);
  const [author, setAuthor] = useState(authorName);
  const [rating, setRating] = useState(0);
  const [previewImage, setPreviewImage] = useState(CourseImage);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [overview, setOverview] = useState('');
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [isValidOverview, setIsValidOverview] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  const setDefault = () => {
    setSelectedLectures(Array<ILecture>());
    setPool(Array<ILecture>());
    setIsValidName(true);
    setIsValidLevel(true);
    setIsValidDescription(true);
    setIsValidImage(true);
    setUploadImage(null);
    setDescription('');
    setCourseName('');
    setLevel('');
    setCourseTags([]);
    setAuthor(authorName);
    setRating(0);
    setPreviewImage(CourseImage);
    setModalAddOpen(false);
    setOverview('');
    setIsShowPreview(false);
    setIsValidOverview(true);
    setIsChanged(false);
  };

  window.onbeforeunload = () => {
    clearCourse();
    setDefault();
  }

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (location.pathname === "/add_course") setDefault();
    if (isEdit && editCourse) {
      fetchCourse(courseId);
      setSelectedLectures([...editCourse.lectures]);
      setCourseName(editCourse?.name);
      setPreviewImage(editCourse.image);
      setDescription(editCourse.description);
      setLevel(editCourse.level);
      setAuthor(`${editCourse?.author.firstName} ${editCourse?.author.lastName}`);
      setRating(editCourse.rating);
      setOverview(editCourse.overview);
      if (editCourse?.tags && editCourse.tags?.length > 0) {
        setCourseTags(editCourse.tags.slice(0, 3).map(t => t.name));
      }
      if (editCourse?.author) {
        setAuthor(`${editCourse?.author.firstName} ${editCourse?.author.lastName}`);
      } else {
        setAuthor(authorName);
      }
    }
  }, [location.pathname]);

  const clearFields = () => {
    setCourseName('');
    setDescription('');
    setLevel('');
    setCourseTags([]);
    setSelectedLectures([]);
  };

  useEffect(() => {
    if (lectures.length === 0 && !isLecturesLoaded) {
      getLectures();
    }
    const updated = [...lectures.sort(compareName)];
    const filtered = updated.filter(l => !selectedLectures.map(s => s.id).includes(l.id))
      .filter(l => {
        if (!l.timeSeconds) return true;
        if (!editCourse) return true;
        return !(selectedLectures.map(s => s.id).includes(l.id) 
        || selectedLectures.map(s => s.urlOrigin).includes(l.urlOrigin));
      });
    setPool(filtered);
  }, [lectures, getLectures]);

  useEffect(() => {
    if (isEdit && (editCourse?.id !== courseId)) {
      fetchCourse(courseId);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!authorId) fetchAuthor();
    setAuthor(authorName);
  },[authorName]);

  useEffect(() => {
    if (editCourse && isEdit) {
      setSelectedLectures([...editCourse.lectures]);
      setCourseName(editCourse.name);
      setPreviewImage(editCourse.image);
      setDescription(editCourse.description);
      setLevel(editCourse.level);
      setAuthor(`${editCourse?.author.firstName} ${editCourse?.author.lastName}`);
      setRating(editCourse.rating);
      setOverview(editCourse.overview);
      if (editCourse?.tags && editCourse.tags?.length > 0) {
        setCourseTags(editCourse.tags.slice(0, 3).map(t => t.name));
      }
      if (editCourse?.author) {
        setAuthor(`${editCourse?.author.firstName} ${editCourse?.author.lastName}`);
      } else {
        setAuthor(authorName);
      }
    }
  }, [editCourse]);

  const itemToJsxWithClick = (item: IFilterableItem, click: (item) => void, isSelected?: boolean) => {
    const lecture = item as ILecture;
    return (
      <LectureCard
        isAuthorized={isAuthorized}
        name={lecture.name}
        description={lecture.description}
        timeMinutes={lecture.timeSeconds}
        key={lecture.id}
        onClick={() => click(lecture)}
        isSelected={isSelected}
        lectureURL={lecture.urlOrigin}
        role={role.name}
      />
    );
  };
  const validateOverview = (newOverview?: string) => {
    const lastOverview = typeof newOverview === 'string' ? newOverview : overview;
    setIsValidOverview(!!lastOverview && isOverviewValid(lastOverview));
  };

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
    && isValidImage && !!overview && isValidOverview;
  const isReleseble = isRequiredFieldsValid && selectedLectures.length > 0;

  const isSaveble = (!isReleased && !!courseName && isValidName && isValidDescription && isValidLevel
    && isValidImage && isValidOverview) || (isEdit && isReleseble);

  const handleUploadFile = file => {
    const thisFile: File = file;
    if (thisFile && isImage(thisFile.name)) {
      setUploadImage(thisFile);
      setPreviewImage(URL.createObjectURL(thisFile));
      setIsValidImage(true);
      setIsChanged(true);
    } else if (thisFile) setIsValidImage(false);
  };

  const removeLectureFromPool = useCallback((dependency: IFilterableItem) => {
    setIsChanged(true);
    setPool(prev => prev.filter(c => c.id !== dependency.id));
    setSelectedLectures(prev => [...prev, dependency as ILecture]);
  }, [pool, selectedLectures]);

  const removeLectureFromSelected = useCallback((dependency: IFilterableItem) => {
    setIsChanged(true);
    setSelectedLectures(prev => prev.filter(c => c.id !== dependency.id));
    setPool(prev => [...prev, dependency as ILecture]);
  }, [pool, selectedLectures]);

  const handleSave = (isRelease: boolean) => {
    if (!isChanged && !isRelease) return;
    if (isRelease && !isReleseble) return;
    if (!isSaveble) return;
    const course = {
      name: courseName,
      level,
      isReleased: isRelease,
      lectures: selectedLectures.map(i => i.id),
      description,
      image: previewImage,
      uploadImage,
      overview
    };
    if (isEdit) {
      updateCourse({ id: courseId, userId: editCourse.author.id, ...course });
    } else {
      save(course);
    }
  };

  const handleUpdateLectures = () => {
    getLectures();
    const updated = [...lectures.sort(compareName)];
    const filtered = updated.filter(l => !selectedLectures.map(s => s.id).includes(l.id))
      .filter(l => {
        if (!editCourse) return true;
        return !(selectedLectures.map(s => s.id).includes(l.id) 
        || selectedLectures.map(s => s.urlOrigin).includes(l.urlOrigin));
      });
    setPool(filtered);
  };

  const onOverviewClose = () => {
    setIsShowPreview(false);
  };

  const handleCancelClick = () => {
    clearFields();
    history.goBack();
  };

  return (
    history.location.pathname.startsWith('/course/edit') && loadingEditCourse
      ? <InlineLoaderWrapper loading={loadingEditCourse} centered />
      : (
        <div className={styles.main_container}>
          <div className={styles.main_content}>
            <div className={styles.dividerwrp}>
              <h3 className={styles.title}>{isEdit ? 'Edit Course' : 'New Course'}</h3>
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
                          setIsChanged(true);
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
                          setIsChanged(true);
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
                      setIsChanged(true);
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
                <div className={styles.textcontainer}>Overview:</div>
                <div className={styles.textareacontainer}>
                  <textarea
                    className={styles.customtextarea}
                    onChange={ev => {
                      setIsChanged(true);
                      setOverview(ev.target.value);
                      validateOverview(ev.target.value);
                    }}
                    value={overview}
                  />
                  {!isValidOverview && (
                    <Label
                      basic
                      className={styles.warninglabel}
                      promt="true"
                    >
                      {OVERVIEW_MESSAGE}
                    </Label>
                  )}
                </div>
                <div className={styles.textcontainer}>Preview:</div>
                <div className={styles.preview_warning_container}>
                  <CoursePreview
                    authorName={author}
                    tags={courseTags.map(t => t.name)}
                    rating={rating}
                    image={previewImage}
                    authorId={authorId}
                    lecturesNumber={selectedLectures.length}
                    name={courseName}
                    level={level}
                    durationMinutes={getMinutes(selectedLectures)}
                    action={handleUploadFile}
                    description={description}
                    ratingCount={0}
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
                    onClick={handleCancelClick}
                    content="Cancel"
                  />
                  <div className={styles.buttonSaveGroup}>
                    <GrayOutlineButton
                      className={styles.buttonOverview}
                      content="Overview"
                      disabled={overview?.length === 0}
                      onClick={() => setIsShowPreview(true)}
                    />
                    <Button
                      content="Save"
                      className={styles.button_save}
                      onClick={() => handleSave(false)}
                      loading={saveloading}
                      disabled={!isSaveble || !isChanged}
                    />
                    {(!isEdit || (isEdit && (isReleased === false))) && (
                    <GradientButton
                      disabled={!isReleseble}
                      className={isReleseble ? styles.button_release : styles.button_release_disabled}
                      onClick={() => handleSave(true)}
                      loading={saveloading}
                      content="Release"
                    />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.list_container}>
                <InlineLoaderWrapper loading={!isLecturesLoaded} centered>
                  {isLecturesLoaded && (
                    <AddCourseDependenciesSelector
                      selected={selectedLectures}
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
          <OverviewModal
            isOpen={isShowPreview}
            data={overview}
            onClose={onOverviewClose}
          />
          <InlineLoaderWrapper loading={!isTagsLoaded} centered>
            {isTagsLoaded && (
              <UploadLectureModal
                isOpen={modalAddOpen}
                openAction={setModalAddOpen}
                tags={tags}
              />
            )}
          </InlineLoaderWrapper>
        </div>
      )
  );
};

const mapStateToProps = (state: IAppState) => {
  const { lectures, isLecturesLoaded, courseId, tags } = state.addcourse.data;
  const { appRouter } = state;
  const { firstName, lastName, id } = state.authorMainPage.data.author;
  const { isAuthorized } = state.auth.auth;
  return {
    tags,
    isTagsLoaded: !state.addcourse.requests.tagsRequest.loading,
    userId: appRouter.user.id,
    authorName: `${firstName} ${lastName}`,
    authorId: id,
    courseId,
    editCourse: state.addcourse.data.editCourse,
    loadingEditCourse: state.addcourse.requests.editCourseRequest.loading,
    lectures,
    isLecturesLoaded,
    loading: state.addcourse.requests.dataRequest.loading,
    saveloading: state.addcourse.requests.saveCourseRequest.loading
      || state.addcourse.requests.savingEditedCourseRequest.loading,
    isAuthorized,
    role: appRouter.user.role
  };
};

const mapDispatchToProps = {
  fetchTags: fetchTagsRoutine,
  fetchLectures: fetchLecturesRoutine,
  fetchCourse: fetchEditCourseRoutine,
  updateCourse: updateCourseRoutine,
  clearCourse: clearCourseRoutine,
  saveCourse: saveCourseRoutine,
  fetchAuthor: fetchAuthorRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
