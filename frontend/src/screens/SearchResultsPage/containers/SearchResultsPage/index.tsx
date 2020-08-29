import React, { createRef, useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import {
  extractIsFetching,
  extractSearchResults, extractTags,
  extractTotalResults
} from '@screens/SearchResultsPage/models/ISearchPageState';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { fetchSearchRoutine, fetchTagsRoutine } from '@screens/SearchResultsPage/routines';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import { OutlineDropdown } from '@components/Dropdown';
import { Icon, Input } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import urlQueryString from 'query-string';
import { EsDataType, esTypeOptions } from '@screens/Search/models/EsDataTypes';
import { ISearchResult } from '@screens/SearchResultsPage/models/EsModels';
import { SearchFeed } from '@screens/SearchResultsPage/components/SearchFeed';
import { Footer } from '@components/Footer';
import { AdvancedFilter } from '@screens/SearchResultsPage/components/AdvancedFilter';
import {
  IAdvancedSearchRequest,
  ISearchMatchFilter,
  ISearchRangeFilter,
  ISearchSorting
} from '@screens/SearchResultsPage/services/search.service';
import { IFilters } from '@screens/SearchResultsPage/components/model';
import { Tag } from '@components/TagSelector';
import { history } from '@helpers/history.helper';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISearchResultPageProps {
  results: ISearchResult[];
  total: number;
  isFetching: boolean;
  triggerSearch: (query: IAdvancedSearchRequest) => void;
  fetchedTags: Tag[];
  triggerTagsFetch: () => void;
}

const ENTER_CHAR_CODE = 13;

export const SearchResultsPage: React.FC<ISearchResultPageProps> = (
  { results, total, isFetching, triggerSearch, fetchedTags, triggerTagsFetch }
) => {
  const [visualFilters, setVisualFilters] = useState<IFilters>({});
  const [matchQueryFilters, setMatchQueryFilters] = useState<ISearchMatchFilter[]>([]);
  const [rangeQueryFilters, setRangeQueryFilters] = useState<ISearchRangeFilter[]>([]);
  const [query, setQuery] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchPage, setSearchPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchSize, setSearchSize] = useState<number>(200);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const [sortingQuery, setSortingQuery] = useState<ISearchSorting[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [sortOptions, setSortOptions] = useState([]);
  const [selectedSortOptionValue, setSelectedSortOption] = useState();
  const location = useLocation();
  const searchInputRef = createRef<Input>();

  const handleSearchTrigger = (input?: string) => {
    triggerSearch({
      query: input === undefined ? query : input,
      page: searchPage,
      size: searchSize,
      matchFilters: matchQueryFilters,
      rangeFilters: rangeQueryFilters,
      sorting: sortingQuery
    });
  };

  function urlToState() {
    const parsedParams = urlQueryString.parse(location.search);
    setVisualFilters({ ...parsedParams });
    const parsedQuery = parsedParams.q as string || '';
    setQuery(parsedQuery);
    handleSearchTrigger(parsedQuery);
  }

  function resetFilters() {
    setSelectedSortOption(undefined);
    setFiltersExpanded(false);
  }

  function resetQueryParameters() {
    setSortingQuery([]);
    setRangeQueryFilters([]);
    setMatchQueryFilters([]);
  }

  useEffect(() => {
    urlToState();
    triggerTagsFetch();
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (!isFetching && pageLoaded) {
      handleSearchTrigger();
    }
  }, [matchQueryFilters, rangeQueryFilters, sortingQuery]);

  useEffect(() => {
    location.search = urlQueryString.stringify({ q: query });
    // fixme: initial load of the page while there are parameters in the url is not working
    //    the line below is commented out until I fix proper state load from url
    history.push(location);
  }, [query]);

  function handleCategoryChange(value) {
    // if category deselected, we clear the filters
    if (value === '') {
      setVisualFilters({});
    } else {
      setVisualFilters(prev => ({ ...prev, c: EsDataType[value as string] }));
    }
  }

  useEffect(() => {
    resetFilters();
    resetQueryParameters();
    if (visualFilters.c !== undefined) {
      setMatchQueryFilters([{ field: 'type', value: visualFilters.c }]);
    } else {
      setSortOptions([]);
    }
  }, [visualFilters.c]);

  useEffect(() => {
    setVisualFilters(prev => ({ ...prev, s: selectedSortOptionValue }));
  }, [selectedSortOptionValue]);

  function handleEnterPress(ev) {
    if (ev.charCode === ENTER_CHAR_CODE) {
      setQuery(inputValue);
      handleSearchTrigger(inputValue);
    }
  }

  return (
    <div>
      <div className={styles.main_container}>
        <div className={`${filtersExpanded ? styles.filters_background_expanded : styles.filters_background}`}>
          <div className={styles.wide_container} style={{ height: '100%' }}>
            <div className={styles.filters_container}>
              <Input
                ref={searchInputRef}
                fluid
                icon="search"
                className={styles.search_input}
                onChange={(_, { value }) => setInputValue(value)}
                value={inputValue}
                placeholder="What do you want to find?"
                onKeyPress={handleEnterPress}
              />
              <OutlineDropdown
                className={styles.control}
                icon="caret down"
                options={esTypeOptions}
                placeholder="Category"
                onChange={(e, { value }) => handleCategoryChange(value)}
                value={visualFilters.c}
                clearable
              />
              <OutlineDropdown
                className={styles.control}
                icon="caret down"
                options={sortOptions}
                placeholder="Sorting"
                onChange={(e, { value }) => setSelectedSortOption(value as any)}
                value={selectedSortOptionValue}
                disabled={sortOptions.length === 0}
                title={sortOptions.length === 0 && 'No sorting available'}
                clearable
              />
              <GrayOutlineButton
                className={`${styles.btn_icon} ${filtersExpanded && styles.filled} ${styles.control}`}
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                disabled={visualFilters.c === undefined}
              >
                <Icon name="filter" />
              </GrayOutlineButton>
              <GrayOutlineButton
                onClick={() => setVisualFilters({})}
                className={`${styles.control} ${styles.btn_icon}`}
              >
                <Icon name="ban" />
              </GrayOutlineButton>
            </div>
          </div>
        </div>
        <div className={`${filtersExpanded ? styles.filters_advanced_container
          : styles.filters_advanced_container_hidden}`}
        >
          <div className={`${filtersExpanded ? styles.wide_container : ''}`}>
            <AdvancedFilter
              expanded={filtersExpanded}
              className={styles.filters_advanced}
              category={visualFilters.c}
              visualFilters={visualFilters}
              updateVisualFilters={setVisualFilters}
              updateMatchFilters={setMatchQueryFilters}
              updateRangeFilters={setRangeQueryFilters}
              updateSorting={setSortingQuery}
              setSortingOptions={setSortOptions}
              fetchedTags={fetchedTags}
            />
          </div>
        </div>
        <div className={styles.wide_container}>
          <div className={styles.title_container}>
            <InlineLoaderWrapper loading={isFetching} centered className={styles.spinner}>
              {isFetching || (
                query.trim() !== '' && (
                  <h2 className={styles.search_title}>
                    Search results for
                    <span className={styles.search_query}>
                      &nbsp;&nbsp;
                      {`'${query}'`}
                    </span>
                  </h2>
                )
              )}
              {isFetching || (
                <h3 className={styles.results_label}>
                  {`${total} ${total === 1 ? 'result' : 'results'}`}
                </h3>
              )}
            </InlineLoaderWrapper>
          </div>
        </div>
        <div className={styles.wide_container}>
          <InlineLoaderWrapper loading={isFetching} centered className={styles.spinner} />
          {isFetching || (<SearchFeed results={results} category={EsDataType[visualFilters.c]} />)}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => (
  {
    results: extractSearchResults(state),
    total: extractTotalResults(state),
    isFetching: extractIsFetching(state),
    fetchedTags: extractTags(state)
  }
);

const mapDispatchToProps = {
  triggerSearch: fetchSearchRoutine,
  triggerTagsFetch: fetchTagsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);
