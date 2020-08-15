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
    <div className={styles.header}>
      <div className={styles.header__title}>{title}</div>
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
        <Button
          as="a"
          onClick={onCreateClick}
          basic
          compact
          id={styles.borderless_btn}
          className={styles.btn_right}
        >
          Create new
        </Button>
      )}
    </div>
    <div className={styles.cards_layout}>
      <InlineLoaderWrapper loading={loading} centered>
        {children}
      </InlineLoaderWrapper>
    </div>
  </>
);
