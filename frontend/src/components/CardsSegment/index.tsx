import React from 'react';
import styles from './styles.module.sass';
import { Button } from 'semantic-ui-react';
import { InlineLoaderWrapper } from '../InlineLoaderWrapper';

export interface ICardsSegment {
  title: string;
  onViewAllClick: () => void;
  loading: boolean;
}

export const CardsSegment: React.FunctionComponent<ICardsSegment> = (
  { title, onViewAllClick, loading, children }
) => (
  <div>
    <h1 className={styles.title}>
      {title}
      <Button
        as="a"
        onClick={onViewAllClick}
        basic
        compact
        className={styles.btn_view_all}
      >
        {' '}
        View all &gt;
      </Button>
    </h1>
    <div className={styles.cards_layout}>
      <InlineLoaderWrapper loading={loading} centered>
        {children}
      </InlineLoaderWrapper>
    </div>
  </div>
);
