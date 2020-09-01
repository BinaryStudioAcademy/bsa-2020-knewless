import React, { useEffect, useState } from 'react';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { Input, ModalContent, ModalHeader } from 'semantic-ui-react';
import modalStyles from './modal.module.sass';
import tabStyles from './tabs.module.sass';
import { ITagData } from '@screens/CoursePage/models/ITagData';
import { filterByName } from '@components/FilterableList/helper';
import { ModalDark } from '@components/DarkModal';

export interface ITagTabSelectorProps {
  tags: ITagData[];
  fetchData: (id?: string) => void;
  loading: boolean;
  maxTags?: number;
}

const ALL_TAG: ITagData = { name: 'All', id: '', imageSrc: '' };

export const TagTabSelector: React.FC<ITagTabSelectorProps> = (
  { tags, fetchData, loading, maxTags = 5 }
) => {
  const [activeTag, setActiveTag] = useState<ITagData>(ALL_TAG);
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [shownTags, setShownTags] = useState<ITagData[]>([]);
  const [otherTags, setOtherTags] = useState<ITagData[]>([]);
  const [modalFilter, setModalFilter] = useState('');

  useEffect(() => {
    setShownTags(tags.slice(0, maxTags));
    setOtherTags(tags.slice(maxTags));
  }, [tags]);

  const handleClickTab = (tag: ITagData) => {
    if (activeTag !== tag) {
      setActiveTag(tag);
      fetchData(tag.id === '' ? undefined : tag.id);
    }
  };

  const selectTagFromMore = (selectedTag: ITagData) => {
    const lastTag = shownTags.slice(maxTags - 1);
    setShownTags(prev => [selectedTag, ...prev.slice(0, maxTags - 1)]);
    setOtherTags(prev => [...lastTag, ...prev.filter(f => f.id !== selectedTag.id)]);
    handleClickTab(selectedTag);
    setMoreModalOpen(false);
  };

  return (
    <>
      <div className={tabStyles.tags_title_container}>
        <div className={tabStyles.tags_wrapper}>
          <div className={tabStyles.tags_content}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
              onClick={() => handleClickTab(ALL_TAG)}
              className={`${tabStyles.tag} ${activeTag.name === 'All' && tabStyles.active}`}
            >
              All
            </div>
            <InlineLoaderWrapper loading={loading} centered>
              {loading || shownTags.map(t => (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                <div
                  key={t.id}
                  onClick={() => handleClickTab(t)}
                  className={`${tabStyles.tag} ${activeTag.id === t.id && tabStyles.active}`}
                >
                  {t.name}
                </div>
              ))}
            </InlineLoaderWrapper>
            {otherTags.length !== 0 && (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              loading || <div className={tabStyles.tag} onClick={() => setMoreModalOpen(true)}>More...</div>
            )}
          </div>
        </div>
      </div>
      <ModalDark
        open={moreModalOpen}
        onClose={() => setMoreModalOpen(false)}
        closeIcon="close"
        className={modalStyles.root}
      >
        <ModalHeader>
          Select a tag
        </ModalHeader>
        <ModalContent className={modalStyles.container}>
          <Input
            className={modalStyles.search}
            icon="search"
            onChange={(event, { value }) => setModalFilter(value)}
            fluid
            placeholder="Filter out..."
          />
          <div className={modalStyles.items_container}>
            {otherTags.filter(t => filterByName(t, modalFilter)).map(t => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div className={modalStyles.item} onClick={() => selectTagFromMore(t)}>
                <div className={modalStyles.image_container}>
                  <img className={modalStyles.image} src={t.imageSrc} alt="Tag" />
                </div>
                <span className={modalStyles.name}>{t.name}</span>
              </div>
            ))}
          </div>
        </ModalContent>
      </ModalDark>
    </>
  );
};
