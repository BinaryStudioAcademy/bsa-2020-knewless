import { ISearchSegmentProps } from '@screens/SearchResultsPage/components/model';
import { IAuthorSearchResult } from '@screens/SearchResultsPage/models/EsModels';
import React from 'react';
import { CommonCard } from '@screens/SearchResultsPage/components/CommonCard';
import { AuthorCard } from '../Card';
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
      <div className={styles.container_grid}>
        {results.map(author => (
          <div className={styles.card}>
            <AuthorCard
              id={author.sourceId}
              key={author.id}
              name={author.name}
              image={author.metadata.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
