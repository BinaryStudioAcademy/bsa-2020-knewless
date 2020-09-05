import React from 'react';
import { Button } from 'semantic-ui-react';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import styles from './styles.module.sass';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';

export interface IAuthorCardsSegment {
  title: string;
  onCreateClick?: () => void;
  onViewAllClick: () => void;
  loading: boolean;
}

export const AuthorCardsSegment: React.FunctionComponent<IAuthorCardsSegment> = (
  { title, onCreateClick, onViewAllClick, loading = false, children }
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
        <GrayOutlineButton
          onClick={onCreateClick}
          className={styles.btn_right}
        >
          Create new
        </GrayOutlineButton>
      )}
    </div>
    <div className={styles.cards_layout}>
      <InlineLoaderWrapper loading={loading} centered>
        {children}
      </InlineLoaderWrapper>
    </div>
  </>
);
