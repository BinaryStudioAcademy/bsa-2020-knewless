import { ISearchSegmentProps } from '@screens/SearchResultsPage/components/model';
import { IAuthorSearchResult } from '@screens/SearchResultsPage/models/EsModels';
import React from 'react';
import { CommonCard } from '@screens/SearchResultsPage/components/CommonCard';
import { history } from '@helpers/history.helper';
import styles from './styles.module.sass';
import { EsDataType } from '@screens/Search/models/EsDataTypes';

export interface IAuthorSegmentProps extends ISearchSegmentProps {
  results: IAuthorSearchResult[];
}

const RESULTS_OVERFLOW_CAP = 5;

export const AuthorSegment: React.FC<IAuthorSegmentProps> = ({ results, category }) => {
  const isOverflowing = category !== EsDataType.AUTHOR && results.length > RESULTS_OVERFLOW_CAP;

  return (
    <div>
      <h3 className={styles.title}>Found authors:</h3>
      <div className={styles.container}>
        {results.map(author => (
          <CommonCard
            name={author.name}
            category={author.type}
            onClick={() => history.push(`/author/${author.sourceId}`)}
          />
        ))}
      </div>
    </div>
  );
};
