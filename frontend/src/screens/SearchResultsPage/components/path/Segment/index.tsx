import { ISearchSegmentProps } from '@screens/SearchResultsPage/components/model';
import { IPathSearchResult } from '@screens/SearchResultsPage/models/EsModels';
import React from 'react';
import { minutesToDuration } from '@components/PathCard/helper';
import { PathCard } from '@components/PathCard';
import styles from './styles.module.sass';
import { history } from '@helpers/history.helper';
import { EsDataType } from '@screens/Search/models/EsDataTypes';

export interface IPathSegmentProps extends ISearchSegmentProps {
  results: IPathSearchResult[];
}

const RESULTS_OVERFLOW_CAP = 2;

export const PathSegment: React.FC<IPathSegmentProps> = ({ results, category }) => {
  const isOverflowing = category !== EsDataType.PATH && results.length > RESULTS_OVERFLOW_CAP;

  return (
    <div>
      <h3 className={styles.title}>Found paths:</h3>
      <div className={styles.container}>
        {results.map(path => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <div className={styles.card} onClick={() => history.push(`/paths/${path.sourceId}`)}>
            <PathCard
              id={path.sourceId}
              name={path.name}
              logoSrc={path.metadata.image}
              courses={path.metadata.courses}
              duration={minutesToDuration(path.metadata['total minutes'])}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
