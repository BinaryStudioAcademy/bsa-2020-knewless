import { ISearchSegmentProps } from '@screens/SearchResultsPage/components/model';
import { ICourseSearchResult } from '@screens/SearchResultsPage/models/EsModels';
import { CoursePreview } from '@components/CoursePreview';
import React from 'react';
import styles from './styles.module.sass';
import { EsDataType } from '@screens/Search/models/EsDataTypes';

export interface ICourseSegmentProps extends ISearchSegmentProps {
  results: ICourseSearchResult[];
}

const RESULTS_OVERFLOW_CAP = 3;

export const CourseSegment: React.FC<ICourseSegmentProps> = ({ results, category }) => {
  const isOverflowing = category !== EsDataType.COURSE && results.length > RESULTS_OVERFLOW_CAP;

  return (
    <div>
      <h3 className={styles.title}>Found courses:</h3>
      <div className={styles.container}>
        {results.map(course => (
          <CoursePreview
            className={styles.card}
            rating={course.metadata.rating}
            authorName={course.metadata.author}
            id={course.sourceId}
            authorId={course.metadata.authorId}
            tags={course.tags}
            image={course.metadata.image}
            lecturesNumber={course.metadata.lectures}
            durationMinutes={course.metadata['total minutes']}
            description={course.metadata.description}
            name={course.name}
            level={course.metadata.level}
            flag={null}
            action={null}
          />
        ))}
      </div>
    </div>
  );
};
