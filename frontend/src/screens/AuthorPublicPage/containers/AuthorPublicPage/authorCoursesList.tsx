import React from 'react';
import { connect } from 'react-redux';
import { IAuthorCourse } from '../../models/IAuthorCourse';
import { CoursePreview } from '@components/CoursePreview';
import { IAuthorData } from '@screens/AuthorPublicPage/models/IAuthorData';
import styles from './styles.module.sass';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';

export interface IAuthorCoursesList {
  authorData: IAuthorData;
  courses: IAuthorCourse[];
}

function secondsToMinutes(mins: any): number {
  return Math.floor(mins / 60);
}

function secondsToTime(mins: any): string { // have to be fixed with moment.js
  const hours = Math.floor(mins / 60);
  const divisorForMinutes = mins % 60;
  const minutes = Math.floor(divisorForMinutes);
  return `${hours}h ${minutes}m`;
}

const CoursesList: React.FC<IAuthorCoursesList> = ({ authorData, courses }) => (
  <>
    {(!courses || courses?.length < 1)
      ? (<RowPlaceholder description="Courses will appear later." webOnLeft={false} />)
      : courses.map(c => (
        <div className={styles.coursePreviewWrapper}>
          <CoursePreview
            key={c.id}
            id={c.id}
            authorName={`${authorData.firstName} ${authorData.lastName}`}
            authorId={authorData.userId}
            tags={null}
            rating={0}
            image={c.imageSrc}
            lecturesNumber={0}
            durationMinutes={secondsToMinutes(c.duration)}
            level={c.level}
            flag={null}
            action={null}
            name={c.name}
            description={null}
          />
        </div>
      ))}
  </>
);

const mapStateToProps = (state: any) => ({
  courses: state.authorPublicData.authorData.courses
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);
