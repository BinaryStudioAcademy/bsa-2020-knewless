import React, { createRef, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { ICourse, IPath, ITag } from '../../models/domain';
import { Footer } from '@components/Footer';
import { Form, Input, Label, TextArea } from 'semantic-ui-react';
import { DependenciesSelector } from '@components/DependenciesSelector';
import { IFilterableItem } from '@components/FilterableList';
import { CourseCard } from '../../components/ClickableCourseCard';
import { compareName } from '@components/FilterableList/helper';
import { minutesToDuration } from '@components/PathCard/helper';
import { fetchCoursesRoutine, fetchTagsRoutine, savePathRoutine } from '../../routines';
import { IAppState } from '@models/AppState';
import { extractCourses, extractTags } from '../../models/AddPathData';
import { connect } from 'react-redux';
import { areCoursesLoading, areTagsLoading, isPathUploading } from '../../models/AddPathState';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import noImage from '@images/no_image.png';
import { TagSelector } from '@components/TagSelector';
import { GradientButton } from '@components/buttons/GradientButton';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import { PathPreview } from '../../components/PathPreview';
import { history } from '@helpers/history.helper';
import Confirmation from '@components/Confirmation';
import {
  DESCRIPTION_MESSAGE,
  isValidPathDescription,
  isValidPathName,
  PATH_NAME_MESSAGE
} from '@helpers/validation.helper';

export interface ISavePathProps {
  courses: ICourse[];
  tags: ITag[];
  tagsLoading: boolean;
  coursesLoading: boolean;
  pathUploading: boolean;
  triggerFetchCourses: Function;
  triggerFetchTags: Function;
  triggerSavePath: (path: IPath) => void;
}

export const AddPathPage: React.FC<ISavePathProps> = ({
  courses, tags, tagsLoading, coursesLoading, pathUploading,
  triggerFetchCourses, triggerFetchTags, triggerSavePath
}) => {
  const tagsRef = createRef();
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

  useEffect(() => {
    triggerFetchCourses();
    triggerFetchTags();
  }, []);

  useEffect(() => {
    setStoredCourses(courses);
    setSelectedCourses([]);
  }, [courses]);

  useEffect(() => {
    setStoredTags(tags);
    setSelectedTags([]);
  }, [tags]);

  function validatePathName(newName?: string) {
    const lastChangesName = typeof newName === 'string' ? newName : pathName;
    setIsPathNameValid(!!lastChangesName && isValidPathName(lastChangesName));
  }

  function validateDescription(newName?: string) {
    setIsDescriptionValid(isValidPathDescription(typeof newName === 'string' ? newName : pathDescription));
  }

  const isRequiredFieldsValid = (): boolean => isPathNameValid && isDescriptionValid;

  function handleSavePath() {
    if (isRequiredFieldsValid()) {
      const path: IPath = {
        name: pathName,
        description: pathDescription,
        courses: selectedCourses,
        tags: selectedTags,
        imageTag: pathImageTag
      };
      triggerSavePath(path);
    }
  }

  function handleCancel() {
    // todo: implement
  }

  function onTagAddition(tag) {
    setSelectedTags(prev => [...prev, tag]);
    setStoredTags(prev => prev.filter(t => t.id !== tag.id));
  }

  function onTagDeletion(i) {
    const deletedTag = selectedTags[i];
    if (deletedTag === pathImageTag) {
      setPathImageTag(undefined);
    }
    if (deletedTag !== undefined) {
      setSelectedTags(prev => prev.filter((_, index) => index !== i));
      setStoredTags(prev => [...prev, deletedTag]);
    }
  }

  const moveStoredToSelected = useCallback((dependency: IFilterableItem) => {
    setStoredCourses(prev => prev.filter(c => c.id !== dependency.id));
    setSelectedCourses(prev => [...prev, dependency as ICourse]);
  }, [storedCourses, selectedCourses]);

  const moveSelectedToStored = useCallback((dependency: IFilterableItem) => {
    setSelectedCourses(prev => prev.filter(c => c.id !== dependency.id));
    setStoredCourses(prev => [...prev, dependency as ICourse]);
  }, [storedCourses, selectedCourses]);

  function handleImageTagSelection(tag: ITag) {
    setPathImageTag(tag);
  }

  const itemToJsxWithClick = (item: IFilterableItem, click: (item) => void, isSelected: boolean) => {
    const course = item as ICourse;
    return (
      <CourseCard
        author={course.author}
        category={course.category}
        level={course.level}
        name={course.name}
        timeMinutes={course.timeMinutes}
        key={course.id}
        previewSrc={course.image}
        rating={course.rating}
        onClick={() => click(course)}
        isSelectedIcon={isSelected}
      />
    );
  };

  const countOverallDuration = useCallback(() => {
    const minutes = selectedCourses.map(c => c.timeMinutes).reduce((a, b) => a + b, 0);
    return minutesToDuration(minutes);
  }, [selectedCourses]);

  const forwardAddCourse = () => {
    setIsConfirming(false);
    history.push('/add_course');
  };

  return (
    <>
      <div className={styles.title_container}>
        <h3 className={`${styles.title} ${styles.wide_container}`}>New Path</h3>
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
                    className={
                      `${!isPathNameValid && styles.no_bottom_rounding_field}`
                    }
                    onChange={ev => {
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
                      className={
                        `${styles.form__description_area} ${!isDescriptionValid && styles.no_bottom_rounding_field}`
                      }
                      rows="5"
                      onChange={(ev: any) => {
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
                      onClick={handleCancel}
                    />
                    <GradientButton
                      disabled={!isPathNameValid}
                      className={styles.btn_save}
                      content="Save"
                      onClick={handleSavePath}
                      loading={pathUploading}
                    />
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
        <Footer />
        <Confirmation
          open={isConfirming}
          title="Data will be reset!"
          text="Your unsaved changes will be lost."
          onConfirm={forwardAddCourse}
          onCancel={() => setIsConfirming(false)}
          className={styles.confirmation}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  tags: extractTags(state),
  courses: extractCourses(state),
  tagsLoading: areTagsLoading(state),
  coursesLoading: areCoursesLoading(state),
  pathUploading: isPathUploading(state)
});

const mapDispatchToProps = {
  triggerFetchTags: fetchTagsRoutine,
  triggerFetchCourses: fetchCoursesRoutine,
  triggerSavePath: savePathRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPathPage);

