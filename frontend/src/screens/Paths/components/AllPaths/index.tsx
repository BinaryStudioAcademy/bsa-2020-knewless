import React, { useState } from 'react';
import { ITag } from '@screens/Courses/models/ITag';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';

import styles from '../../containers/PathsPage/styles.module.sass';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { Input } from 'semantic-ui-react';
import { IPathCardProps, PathCard } from '@components/PathCard';

export interface IAllPaths {
  paths: IPathCardProps[];
  tags: ITag[];
  fetchData: IBindingAction;
  fetchPathsByTag: IBindingCallback1<string>;
  loadingData: boolean;
  loadingAllPaths: boolean;
  loadingPathsByTag: boolean;
}

export const AllPaths: React.FC<IAllPaths> = ({
  paths, tags, fetchData, fetchPathsByTag, loadingData, loadingAllPaths, loadingPathsByTag
}) => {
  const [activeTab, setActiveTab] = useState('All');

  const handleClickTab = (tab: string, id?: string) => {
    setActiveTab(tab);
    if (id) {
      fetchPathsByTag(id);
    } else {
      fetchData();
    }
  };

  return (
    <>
      <div id="all_courses" className={`${styles.wide_container} ${styles.content_row}`}>
        <h3 className={`${styles.title}`}>Paths</h3>
        <div className={styles.courses_title}>
          <div className={styles.tags_title_container}>
            <div id="scrolable" className={styles.tags_wrapper}>
              <div className={styles.tags_content}>
                <div
                  onClick={() => handleClickTab('All')}
                  className={`${styles.tag} ${activeTab === 'All' && styles.active}`}
                >
                  All
                </div>
                {loadingData || tags.map(t => (
                  <div
                    key={Math.random() * 100}
                    onClick={() => handleClickTab(t.name, t.id)}
                    className={`${styles.tag} ${activeTab === t.name && styles.active}`}
                  >
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.filter}>
            <Input size="mini" icon="search" fluid placeholder="Filter..." />
          </div>
        </div>
      </div>
      <div className={`${styles.wide_container} ${styles.content_row}`} style={{ minHeight: '150px' }}>
        {loadingAllPaths || loadingPathsByTag
          ? <InlineLoaderWrapper loading={loadingAllPaths || loadingPathsByTag} centered />
          : (
            <div className={styles.courses_container}>
              {
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
                }
            </div>
          )}
      </div>
    </>
  );
};
