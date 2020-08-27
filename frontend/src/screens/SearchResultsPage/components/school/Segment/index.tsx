import { ISearchSegmentProps } from '@screens/SearchResultsPage/components/model';
import { ISchoolSearchResult } from '@screens/SearchResultsPage/models/EsModels';
import React from 'react';
import { CommonCard } from '@screens/SearchResultsPage/components/CommonCard';
import { history } from '@helpers/history.helper';
import styles from './styles.module.sass';
import { EsDataType } from '@screens/Search/models/EsDataTypes';

export interface ISchoolSegmentProps extends ISearchSegmentProps {
  results: ISchoolSearchResult[];
}

const RESULTS_OVERFLOW_CAP = 5;

export const SchoolSegment: React.FC<ISchoolSegmentProps> = ({ results, category }) => {
  const isOverflowing = category !== EsDataType.SCHOOL && results.length > RESULTS_OVERFLOW_CAP;

  return (
    <div>
      <h3 className={styles.title}>Found schools:</h3>
      <div className={styles.container}>
        {results.map(school => (
          <CommonCard
            name={school.name}
            category={school.type}
            onClick={() => history.push(`/school/${school.sourceId}`)}
          />
        ))}
      </div>
    </div>
  );
};
