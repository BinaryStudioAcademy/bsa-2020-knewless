import React, { createRef, useCallback, useState } from 'react';
import styles from './styles.module.sass';
import { ICourse, IPath } from '../../models/domain';
import { Footer } from '../../../../components/Footer';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';
import { PathCard } from '../../../../components/PathCard';
import { DependenciesSelector } from '../../../../components/DependenciesSelector';
import ReactTags from 'react-tag-autocomplete';
import './react_tags.sass';
import { IFilterableItem } from '../../../../components/FilterableList';
import { CourseCard } from '../../components/ClickableCourseCard';
import { compareName } from '../../../../components/FilterableList/helper';
import { minutesToDuration } from '../../../../components/PathCard/helper';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISavePathProps {

}
// eslint-disable-next-line max-len
const js = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png';

const courses: ICourse[] = [
  {
    id: '1',
    name: 'Java Spring',
    author: 'You',
    category: 'Programming',
    level: 'Intermediate',
    timeMinutes: 3600
  },
  {
    id: '2',
    name: '.Net Spring',
    author: 'You',
    category: 'Programming',
    level: 'Hard',
    timeMinutes: 2800
  },
  {
    id: '3',
    name: 'JS Spring',
    author: 'You',
    category: 'Programming',
    level: 'Advanced',
    timeMinutes: 1313
  },
  {
    id: '4',
    name: 'Rust Spring',
    author: 'You',
    category: 'Programming',
    level: 'Easy',
    timeMinutes: 4908
  },
  {
    id: '5',
    name: 'Go Spring',
    author: 'You',
    category: 'Programming',
    level: 'Easy',
    timeMinutes: 62
  },
  {
    id: '6',
    name: 'Dart Spring',
    author: 'You',
    category: 'Design',
    level: 'Intermediate',
    timeMinutes: 192
  },
  {
    id: '7',
    name: 'Kotlin Spring',
    author: 'You',
    category: 'Programming',
    level: 'Intermediate',
    timeMinutes: 235
  },
  {
    id: '8',
    name: 'Lua Spring',
    author: 'You',
    category: 'Architecture',
    level: 'Intermediate',
    timeMinutes: 900
  },
  {
    id: '9',
    name: 'Haskell Spring',
    author: 'You',
    category: 'Programming',
    level: 'Intermediate',
    timeMinutes: 85
  },
  {
    id: '10',
    name: 'Ruby Spring',
    author: 'You',
    category: 'Programming',
    level: 'Intermediate',
    timeMinutes: 145
  },
  {
    id: '11',
    name: 'Ruby Spring 1',
    author: 'You',
    category: 'Programming',
    level: 'Intermediate',
    timeMinutes: 145
  },
  {
    id: '12',
    name: 'Ruby Spring 2',
    author: 'You',
    category: 'Programming',
    level: 'Intermediate',
    timeMinutes: 145
  },
  {
    id: '13',
    name: 'Ruby Spring 3',
    author: 'You',
    category: 'Programming',
    level: 'Intermediate',
    timeMinutes: 145
  },
  {
    id: '14',
    name: 'Ruby Spring 4',
    author: 'You',
    category: 'Programming',
    level: 'Intermediate',
    timeMinutes: 145
  }
];

const suggestions = [
  { id: 1, name: 'Java' },
  { id: 2, name: 'Programming' },
  { id: 3, name: 'JS' },
  { id: 4, name: '.Net' },
  { id: 5, name: 'PHP' }
];

export const AddPathPage: React.FC<ISavePathProps> = () => {
  const tagsRef = createRef();
  const [selectedCourses, setSelectedCourses] = useState([] as ICourse[]);
  const [storedCourses, setStoredCourses] = useState(courses);
  const [pathName, setPathName] = useState('');
  const [pathDescription, setPathDescription] = useState('');
  const [tags, setTags] = useState([
    { id: 1, name: 'Java' },
    { id: 2, name: 'Programming' }
  ]);

  function handleSavePath() {
    const path: IPath = {
      name: pathName,
      description: pathDescription,
      courses: selectedCourses,
      tags: tags.map(t => t.name)
    };
    alert(JSON.stringify(path));
  }

  function onTagAddition(tag) {
    setTags([...tags, tag]);
  }

  function onTagDeletion(i) {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  }

  const moveStoredToSelected = useCallback((dependency: IFilterableItem) => {
    setStoredCourses(prev => prev.filter(c => c.id !== dependency.id));
    setSelectedCourses(prev => [...prev, dependency as ICourse]);
  }, [storedCourses, selectedCourses]);

  const moveSelectedToStored = useCallback((dependency: IFilterableItem) => {
    setSelectedCourses(prev => prev.filter(c => c.id !== dependency.id));
    setStoredCourses(prev => [...prev, dependency as ICourse]);
  }, [storedCourses, selectedCourses]);

  const itemToJsxWithClick = (item: IFilterableItem, click: (item) => void) => {
    const course = item as ICourse;
    return (
      <CourseCard
        author={course.author}
        category={course.category}
        level={course.level}
        name={course.name}
        timeMinutes={course.timeMinutes}
        key={course.id}
        onClick={() => click(course)}
      />
    );
  };

  const countOverallDuration = useCallback(() => {
    const minutes = selectedCourses.map(c => c.timeMinutes).reduce((a, b) => a + b, 0);
    return minutesToDuration(minutes);
  }, [selectedCourses]);

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <h1 className={`${styles.title} ${styles.wide_container}`}>New Path</h1>
        <div className={`${styles.equal_containers} ${styles.wide_container}`}>
          <div className={styles.form__container}>
            <h4 className={styles.form__name_input_label}>Name:</h4>
            <Input
              className={styles.form__name_input}
              onChange={ev => setPathName(ev.target.value)}
              fluid
            />
            <h4 className={styles.form__tags_label}>Tags:</h4>
            <div className={styles.form__tags_input}>
              <ReactTags
                ref={tagsRef}
                onDelete={onTagDeletion}
                onAddition={onTagAddition}
                suggestions={suggestions}
                tags={tags}
              />
            </div>
            <h4 className={styles.form__description_label}>Description:</h4>
            <Form className={styles.form__description}>
              <TextArea
                className={styles.form__description_area}
                rows="5"
                onChange={(ev: any) => setPathDescription(ev.target.value)}
              />
            </Form>
            <h4 className={styles.form__preview_label}>Preview:</h4>
            <div className={styles.form__preview}>
              <PathCard
                name={pathName}
                logoSrc={js}
                courses={selectedCourses.length}
                duration={countOverallDuration()}
              />
            </div>
            <div className={styles.button_row}>
              <Button content="Cancel" id={styles.btn_cancel} />
              <Button content="Save" id={styles.btn_save} onClick={handleSavePath} />
            </div>
          </div>
          <div className={styles.list__container}>
            <DependenciesSelector
              selected={selectedCourses}
              stored={storedCourses}
              selectedToStored={moveSelectedToStored}
              storedToSelected={moveStoredToSelected}
              dependencyName="course"
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

