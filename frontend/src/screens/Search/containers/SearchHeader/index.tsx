import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.sass';
import { Search, SearchCategoryProps, SearchResultData, SearchResultProps } from 'semantic-ui-react';
import { IAppState } from '@models/AppState';
import { fetchSearchRoutine } from '@screens/Search/routines/routines';
import { connect } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';
import Highlighter from 'react-highlight-words';
import { history } from '@helpers/history.helper';

export interface ISearchResult {
  id: string;
  name: string;
  sourceId: string;
  metadata?: object;
  type: EsDataTypes;
  tags: string[];
}

export enum EsDataTypes {
  PATH='PATH', AUTHOR='AUTHOR', COURSE='COURSE', SCHOOL='SCHOOL'
}

interface ISearchHeaderProps {
  search: Function;
  clear: IBindingAction;
  result: ISearchResult[];
  loading: boolean;
  className: string;
}

const SearchHeader: FunctionComponent<ISearchHeaderProps> = ({ className, clear, search, result, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const timeoutRef = useRef(0);

  const onSearchChange = useCallback((event, data) => {
    setQuery(data.value);
    setIsOpen(false);
    clearTimeout(timeoutRef.current);
    clear();

    if (data.value.length > 1) {
      timeoutRef.current = setTimeout(() => {
        search(data.value);
        setIsOpen(true);
      }, 400);
    }
  }, []);

  const onSearchFieldKeyPressed = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && query.length > 0) {
      setIsOpen(false);
      // setQuery('');
      history.push(`/search?q=${query}`);
    }
  };

  const onResultSelect = (event, data: SearchResultData) => {
    const item: ISearchResult = data.result;
    // setQuery('');
    setIsOpen(false);

    switch (item.type) {
      case EsDataTypes.AUTHOR: {
        history.push(`/author/${item.sourceId}`);
        break;
      }
      case EsDataTypes.COURSE: {
        history.push(`/course/${item.sourceId}`);
        break;
      }
      case EsDataTypes.PATH: {
        history.push(`/path/${item.sourceId}`);
        break;
      }
      case EsDataTypes.SCHOOL: {
        history.push(`/school/${item.sourceId}`);
        break;
      }
      default: break;
    }
  };

  const categoryRenderer = ({ name }: SearchCategoryProps) => (<span>{name}</span>); // Category name

  const resultRenderer = ({ name }: SearchResultProps) => (
    <Highlighter
      highlightClassName={styles.bold_text}
      searchWords={query.split(' ')}
      textToHighlight={name}
    />
  );

  useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Search
      category
      categoryRenderer={categoryRenderer}
      className={`${styles.searchField} ${className}`}
      loading={loading}
      open={isOpen && !loading}
      onBlur={() => setIsOpen(false)}
      results={result}
      onFocus={() => query.length > 1 && setIsOpen(true)}
      placeholder="Search"
      onResultSelect={onResultSelect}
      onKeyPress={onSearchFieldKeyPressed}
      resultRenderer={resultRenderer}
      onSearchChange={onSearchChange}
      value={query}
    />
  );
};

const mapStateToProps = (state: IAppState) => {
  const { requests, search } = state.search;
  return ({
    loading: requests.fetchSearchRequest.loading,
    result: search.data
  });
};

const mapDispatchToProps = {
  search: fetchSearchRoutine.trigger,
  clear: fetchSearchRoutine.fulfill
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader);