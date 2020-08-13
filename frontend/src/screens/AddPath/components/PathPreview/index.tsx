import React, { createRef, useEffect, useState } from 'react';
import { IPathCardProps, PathCard } from '../../../../components/PathCard';
import { ITag } from '../../models/domain';
import { Image, Popup, PopupContent, PopupHeader } from 'semantic-ui-react';
import styles from './styles.module.sass';

export interface IPathPreviewProps extends IPathCardProps {
  availableTags: ITag[];
  selectedTag: ITag | undefined;
  handleTagSelection: (tag: ITag) => void;
}

export const PathPreview: React.FC<IPathPreviewProps> = props => {
  const { name, logoSrc, courses, duration, selectedTag, availableTags, handleTagSelection } = props;
  const imageRef = createRef<HTMLImageElement>();
  const [noTags, setNoTags] = useState(availableTags.length === 0);
  useEffect(() => setNoTags(availableTags.length === 0), [availableTags]);

  return (
    <>
      <Popup
        className={styles.popup}
        hoverable
        trigger={(
          <div>
            <PathCard
              name={name}
              logoSrc={selectedTag?.imageSrc || logoSrc}
              courses={courses}
              duration={duration}
              imageRef={imageRef}
              clickableImage
            />
          </div>
        )}
        triggerRef={imageRef}
        context={imageRef}
        closeOnTriggerClick={false}
        on="click"
      >
        {noTags || <PopupHeader>Choose a preview image</PopupHeader>}
        <PopupContent className={styles.scrollable}>
          {noTags ? 'Please select tags first' : (
            availableTags.map(tag => (
              <Image
                className={styles.imagePreview}
                src={tag.imageSrc}
                onClick={() => handleTagSelection(tag)}
              />
            ))
          )}
        </PopupContent>
      </Popup>
    </>
  );
};
