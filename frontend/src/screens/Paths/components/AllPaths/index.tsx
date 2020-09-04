import React from 'react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';

import styles from '../../containers/PathsPage/styles.module.sass';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { Input } from 'semantic-ui-react';
import { IPathCardProps, PathCard } from '@components/PathCard';
import { TagTabSelector } from '@screens/Courses/components/TagTabSelector';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';
import { ITagData } from '@screens/CoursePage/models/ITagData';

export interface IAllPaths {
  paths: IPathCardProps[];
  tags: ITagData[];
  fetchData: IBindingAction;
  fetchPathsByTag: IBindingCallback1<string>;
  loadingData: boolean;
  loadingAllPaths: boolean;
  loadingPathsByTag: boolean;
}

export const AllPaths: React.FC<IAllPaths> = ({
  paths, tags, fetchData, fetchPathsByTag, loadingData, loadingAllPaths, loadingPathsByTag
}) => {
  function handleFetch(id: string) {
    if (id) {
      fetchPathsByTag(id);
    } else {
      fetchData();
    }
  }

  return (
    <>
      <div id="all_courses" className={`${styles.wide_container} ${styles.content_row}`}>
        <h3 className={`${styles.title}`}>Paths</h3>
        <div className={styles.courses_title}>
          <TagTabSelector fetchData={id => handleFetch(id)} loading={loadingPathsByTag || loadingData} tags={tags} />
          <div className={styles.filter}>
            <Input size="mini" icon="search" fluid placeholder="Filter..." />
          </div>
        </div>
      </div>
      <div className={`${styles.wide_container} ${styles.content_row}`} style={{ minHeight: '150px' }}>
        <InlineLoaderWrapper loading={loadingAllPaths || loadingPathsByTag} centered>
          <div className={styles.courses_container}>
            {paths.length > 0 ? (
              paths.map(p => (
                <PathCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  logoSrc={p.logoSrc}
                  courses={p.courses}
                  duration={p.duration}
                />
              ))
            ) : (
              <RowPlaceholder
                className={styles.row_placeholder}
                title="No paths found by this tag"
                description="Try to select another one"
              />
            )}
          </div>
        </InlineLoaderWrapper>
      </div>
    </>
  );
};
