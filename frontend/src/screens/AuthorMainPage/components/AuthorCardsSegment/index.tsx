import React from 'react';
import { Button } from 'semantic-ui-react';
import { InlineLoaderWrapper } from '../../../../components/InlineLoaderWrapper';
import styles from './styles.module.sass';

export interface IAuthorCardsSegment {
  title: string;
  onCreateClick?: () => void;
  onViewAllClick: () => void;
  loading: boolean;
}

export const AuthorCardsSegment: React.FunctionComponent<IAuthorCardsSegment> = (
  { title, onCreateClick, onViewAllClick, loading, children }
) => (
  <>
    <h1 className={styles.title}>
      {title}
      <Button
        as="a"
        onClick={onViewAllClick}
        basic
        compact
        id={styles.borderless_btn}
      >
        {' '}
        View all &gt;
      </Button>
      {onCreateClick && (
        <div className={styles.btns_right}>
          <Button
            as="a"
            onClick={onCreateClick}
            basic
            compact
            id={styles.borderless_btn}
          >
            Create new
          </Button>
        </div>
      )}
    </h1>
    <div className={styles.cards_layout}>
      <InlineLoaderWrapper loading={loading} centered>
        {children}
      </InlineLoaderWrapper>
    </div>
  </>
);
