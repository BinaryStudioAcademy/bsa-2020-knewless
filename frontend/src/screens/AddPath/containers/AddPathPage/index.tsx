import React, { createRef, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { ICourse, IPath, ITag, IPathDetails } from '../../models/domain';
import { Button, Form, Input, Label, TextArea } from 'semantic-ui-react';
import { DependenciesSelector } from '@components/DependenciesSelector';
import { IFilterableItem } from '@components/FilterableList';
import { CourseCard } from '../../components/ClickableCourseCard';
import { compareName } from '@components/FilterableList/helper';
import {
  fetchCoursesRoutine,
  fetchTagsRoutine,
  savePathRoutine,
  fetchPathToEditRoutine,
  updatePathRoutine
} from '../../routines';
import { IAppState } from '@models/AppState';
import { extractCourses, extractTags, extractEditPath } from '../../models/AddPathData';
import { connect } from 'react-redux';
import {
  areCoursesLoading,
  areTagsLoading,
  isPathUploading,
  isEditPathLoading,
  isEditPathUploading
} from '../../models/AddPathState';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import noImage from '@images/no_image.png';
import { TagSelector } from '@components/TagSelector';
import { GradientButton } from '@components/buttons/GradientButton';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import { PathPreview } from '../../components/PathPreview';
import ConfirmationModal from '@components/ConfirmationModal';
import { useParams, useLocation } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import {
  DESCRIPTION_MESSAGE,
  isValidPathDescription,
  isValidPathName,
  PATH_NAME_MESSAGE
} from '@helpers/validation.helper';
import { fetchAuthorRoutine } from '@screens/AuthorMainPage/routines';
import { history } from '@helpers/history.helper';

export interface ISavePathProps {
  courses: ICourse[];
  tags: ITag[];
  editPath: IPathDetails;
  tagsLoading: boolean;
  coursesLoading: boolean;
  pathUploading: boolean;
  triggerFetchCourses: Function;
  triggerFetchTags: Function;
  triggerSavePath: (path: IPath) => void;
  fetchEditPath: IBindingCallback1<string>;
  updatePath: IBindingCallback1<IPath>;
  editPathLoading: boolean;
  editPathUploading: boolean;
  fetchAuthorData: IBindingAction;
}

export const AddPathPage: React.FC<ISavePathProps> = ({
  courses, tags, tagsLoading, coursesLoading, pathUploading, triggerFetchCourses,
  triggerFetchTags, triggerSavePath, fetchEditPath, editPath, updatePath, editPathLoading,
  fetchAuthorData, editPathUploading
}) => {
  const location = useLocation();
  const { pathId } = useParams();
  const tagsRef = createRef();
  const isEdit = location.pathname.startsWith('/path/edit');
  const isReleased = editPath?.releasedDate !== null && editPath?.releasedDate !== undefined;
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [storedCourses, setStoredCourses] = useState([]);
  const [pathName, setPathName] = useState('');
  const [pathDescription, setPathDescription] = useState('');
  const [pathImageTag, setPathImageTag] = useState(undefined);
  const [selectedTags, setSelectedTags] = useState([]);
  const [storedTags, setStoredTags] = useState([]);
  const [isPathNameValid, setIsPathNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const setDefault = () => {
    setSelectedCourses([]);
    setStoredCourses([]);
    setPathName('');
    setPathDescription('');
    setPathImageTag(undefined);
    setSelectedTags([]);
    setStoredTags([]);
    setIsPathNameValid(true);
    setIsDescriptionValid(true);
    setIsConfirming(false);
    setIsChanged(false);
  };

  useEffect(() => {
    if (location.pathname === '/add_path') setDefault();
    if (isEdit && editPath) {
      fetchEditPath(pathId);
      setPathName(editPath.name);
      setPathDescription(editPath.description);
      setPathImageTag(editPath.imageTag);
      setSelectedTags(editPath.tags);
      setSelectedCourses(editPath.courses);
      const updatedCourses = [...courses];
      const filteredCourses = updatedCourses.filter(c => !selectedCourses.map(s => s.id).includes(c.id));
      setStoredCourses(filteredCourses);
      const updatedTags = [...tags];
      const filteredTags = updatedTags.filter(t => !selectedTags.map(s => s.id).includes(t.id));
      setStoredTags(filteredTags);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isEdit && (editPath?.id !== pathId)) {
      fetchEditPath(pathId);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (editPath && isEdit) {
      setPathName(editPath.name);
      setPathDescription(editPath.description);
      setPathImageTag(editPath.imageTag);
      setSelectedTags(editPath.tags);
      setSelectedCourses(editPath.courses);
      const updatedCourses = [...courses];
      const filteredCourses = updatedCourses.filter(c => !selectedCourses.map(s => s.id).includes(c.id));
      setStoredCourses(filteredCourses);
      const updatedTags = [...tags];
      const filteredTags = updatedTags.filter(t => !selectedTags.map(s => s.id).includes(t.id));
      setStoredTags(filteredTags);
    }
  }, [editPath]);

  useEffect(() => {
    fetchAuthorData();
    triggerFetchCourses();
    triggerFetchTags();
  }, []);

  useEffect(() => {
    const updated = [...courses];
    const filtered = updated.filter(c => !selectedCourses.map(s => s.id).includes(c.id));
    setStoredCourses(filtered);
  }, [courses]);

  useEffect(() => {
    const updated = [...tags];
    const filtered = updated.filter(t => !selectedTags.map(s => s.id).includes(t.id));
    setStoredTags(filtered);
  }, [tags]);

  window.onbeforeunload = () => setDefault();

  function validatePathName(newName?: string) {
    const lastChangesName = typeof newName === 'string' ? newName : pathName;
    setIsPathNameValid(!!lastChangesName && isValidPathName(lastChangesName));
  }

  const validateDescription = (newDescription?: string) => {
    const lastChangesDescription = typeof newDescription === 'string' ? newDescription : pathDescription;
    setIsDescriptionValid(!!lastChangesDescription && isValidPathDescription(lastChangesDescription));
  };

  const isRequiredFieldsValid = !!pathName && isPathNameValid && isDescriptionValid && !!pathDescription;
  const isReadyToRelease = isRequiredFieldsValid && selectedCourses.length > 0;
  const isReadyToSave = (!isReleased && !!pathName && isPathNameValid && isDescriptionValid)
    || (isEdit && isReadyToRelease);

  function handleSavePath(isRelease: boolean) {
    if (!isChanged && !isRelease) return;
    if (isRelease && !isReadyToRelease) return;
    if (!isReadyToSave) return;
    if ((isReleased || isRelease) && !pathImageTag) {
      toastr.error('Failed to save. Please select tag image.');
      return;
    }
    const path: IPath = {
      name: pathName,
      description: pathDescription,
      isReleased: isRelease,
      courses: selectedCourses,
      tags: selectedTags,
      imageTag: pathImageTag
    };
    if (!isEdit) {
      triggerSavePath(path);
    } else {
      updatePath({ id: pathId, ...path });
    }
  }

  function handleCancel() {
    history.push('/');
  }

  function onTagAddition(tag) {
    setIsChanged(true);
    setSelectedTags(prev => [...prev, tag]);
    setStoredTags(prev => prev.filter(t => t.id !== tag.id));
  }

  function onTagDeletion(i) {
    setIsChanged(true);
    const deletedTag = selectedTags[i];
    if (deletedTag?.id === pathImageTag?.id) {
      setPathImageTag(undefined);
    }
    if (deletedTag !== undefined) {
      setSelectedTags(prev => prev.filter((_, index) => index !== i));
      setStoredTags(prev => [...prev, deletedTag]);
    }
  }

  const moveStoredToSelected = useCallback((dependency: IFilterableItem) => {
    setIsChanged(true);
    setStoredCourses(prev => prev.filter(c => c.id !== dependency.id));
    setSelectedCourses(prev => [...prev, dependency as ICourse]);
  }, [storedCourses, selectedCourses]);

  const moveSelectedToStored = useCallback((dependency: IFilterableItem) => {
    setIsChanged(true);
    setSelectedCourses(prev => prev.filter(c => c.id !== dependency.id));
    setStoredCourses(prev => [...prev, dependency as ICourse]);
  }, [storedCourses, selectedCourses]);

  function handleImageTagSelection(tag: ITag) {
    setIsChanged(true);
    setPathImageTag(tag);
  }

  const itemToJsxWithClick = (item: IFilterableItem, click: (item) => void, isSelected: boolean) => {
    const course = item as ICourse;
    return (
      <CourseCard
        author={course.author}
        level={course.level}
        name={course.name}
        timeMinutes={course.timeSeconds}
        key={course.id}
        previewSrc={course.image}
        rating={course.rating}
        onClick={() => click(course)}
        isSelectedIcon={isSelected}
        ratingCount={course.ratingCount}
      />
    );
  };

  const countOverallDuration = useCallback(
    () => selectedCourses.map(c => c.timeSeconds).reduce((a, b) => a + b, 0), [selectedCourses]
  );

  const forwardAddCourse = () => {
    setIsConfirming(false);
    history.push('/add_course');
  };

  return (
    history.location.pathname.startsWith('/path/edit') && editPathLoading
      ? <InlineLoaderWrapper loading={editPathLoading} centered />
      : (
        <>
          <div className={styles.title_container}>
            <h3 className={`${styles.title} ${styles.wide_container}`}>
              {`${isEdit ? 'Edit' : 'New'} Path`}
            </h3>
          </div>
          <div className={styles.main_container}>
            <div className={styles.main_content}>
              <div className={styles.wide_container}>
                <div className={styles.form__container}>
                  <div className={styles.form__form}>
                    <div className={styles.form__name}>
                      <span className={styles.form__label}>Name:</span>
                      <Input
                        name="Name"
                        value={pathName}
                        className={
                          `${!isPathNameValid && styles.no_bottom_rounding_field}`
                        }
                        onChange={ev => {
                          setIsChanged(true);
                          const { value } = ev.target;
                          setPathName(value);
                          validatePathName(value);
                        }}
                        onBlur={() => validatePathName()}
                        error={!isPathNameValid}
                        fluid
                      />
                      {!isPathNameValid && (
                        <Label
                          basic
                          className={styles.warningLabel}
                          promt="true"
                          content={PATH_NAME_MESSAGE}
                        />
                      )}
                    </div>
                    <div className={`${styles.form__tags} ${styles.form__group}`}>
                      {/* <label className={styles.form__label}>Tags:</label>*/}
                      <div className={styles.form__tags_selector}>
                        <InlineLoaderWrapper loading={tagsLoading} centered>
                          {!tagsLoading && (
                            <TagSelector
                              ref={tagsRef}
                              onDelete={onTagDeletion}
                              onAddition={onTagAddition}
                              suggestions={storedTags}
                              tags={selectedTags}
                              id="PathTags"
                            />
                          )}
                        </InlineLoaderWrapper>
                      </div>
                    </div>
                    <div className={`${styles.form__description} ${styles.form__group}`}>
                      <span className={styles.form__label}>Description:</span>
                      <Form className={styles.form__description_wrapper}>
                        <TextArea
                          value={pathDescription}
                          className={
                            `${styles.form__description_area} ${!isDescriptionValid && styles.no_bottom_rounding_field}`
                          }
                          rows="5"
                          onChange={(ev: any) => {
                            setIsChanged(true);
                            const { value } = ev.target;
                            setPathDescription(value);
                            validateDescription(value);
                          }}
                          error={!isDescriptionValid}
                          onBlur={() => validateDescription()}
                        />
                        {!isDescriptionValid && (
                          <Label
                            basic
                            className={styles.warningLabel}
                            promt="true"
                            content={DESCRIPTION_MESSAGE}
                          />
                        )}
                      </Form>
                    </div>
                    <div className={`${styles.form__preview} ${styles.form__group}`}>
                      <span className={styles.form__label}>Preview:</span>
                      <div className={styles.form__preview_wrapper}>
                        <PathPreview
                          name={pathName}
                          logoSrc={pathImageTag?.imageSrc || noImage}
                          courses={selectedCourses.length}
                          duration={countOverallDuration()}
                          availableTags={selectedTags}
                          selectedTag={pathImageTag}
                          handleTagSelection={handleImageTagSelection}
                        />
                      </div>
                    </div>
                    <div className={`${styles.form__buttons} ${styles.form__group}`}>
                      <div className={styles.form__button_row}>
                        <GrayOutlineButton
                          content="Cancel"
                          onClick={() => handleCancel()}
                          className={styles.btn_cancel}
                        />
                        <div className={styles.buttonSaveGroup}>
                          <Button
                            disabled={!isReadyToSave || !isChanged}
                            className={styles.btn_save}
                            loading={(!isEdit && pathUploading) || (isEdit && editPathUploading)}
                            content="Save"
                            onClick={() => handleSavePath(false)}
                          />
                          {(!isEdit || (isEdit && (isReleased === false))) && (
                          <GradientButton
                            disabled={!isReadyToRelease}
                            className={isReadyToRelease ? styles.button_release : styles.button_release_disabled}
                            onClick={() => handleSavePath(true)}
                            loading={(!isEdit && pathUploading) || (isEdit && editPathUploading)}
                            content="Release"
                          />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.form__list_container}>
                    <InlineLoaderWrapper loading={coursesLoading} centered>
                      {!coursesLoading && (
                        <DependenciesSelector
                          selected={selectedCourses}
                          stored={storedCourses}
                          selectedToStored={moveSelectedToStored}
                          storedToSelected={moveStoredToSelected}
                          dependencyName="course"
                          itemToJsx={itemToJsxWithClick}
                          sortFn={compareName}
                          addNewDependencyFn={() => setIsConfirming(true)}
                        />
                      )}
                    </InlineLoaderWrapper>
                  </div>
                </div>
              </div>
            </div>
            <ConfirmationModal
              open={isConfirming}
              title="Your unsaved changes will be lost."
              text="Are you absolutely sure?"
              onConfirm={forwardAddCourse}
              onCancel={() => setIsConfirming(false)}
              className={styles.confirmation}
            />
          </div>
        </>
      )
  );
};

const mapStateToProps = (state: IAppState) => ({
  tags: extractTags(state),
  courses: extractCourses(state),
  tagsLoading: areTagsLoading(state),
  coursesLoading: areCoursesLoading(state),
  pathUploading: isPathUploading(state),
  editPath: extractEditPath(state),
  editPathLoading: isEditPathLoading(state),
  editPathUploading: isEditPathUploading(state)
});

const mapDispatchToProps = {
  triggerFetchTags: fetchTagsRoutine,
  triggerFetchCourses: fetchCoursesRoutine,
  triggerSavePath: savePathRoutine,
  fetchEditPath: fetchPathToEditRoutine,
  updatePath: updatePathRoutine,
  fetchAuthorData: fetchAuthorRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPathPage);
