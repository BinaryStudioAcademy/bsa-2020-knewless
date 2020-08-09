import React, { useState } from 'react';
import styles from './styles.module.sass';
import { Button, Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { FilterableList, IFilterableItem } from '../FilterableList';

export interface IDepsSelectorProps {
  selected: IFilterableItem[];
  stored: IFilterableItem[];
  storedToSelected: (item: IFilterableItem) => void;
  selectedToStored: (item: IFilterableItem) => void;
  itemToJsx: (item: IFilterableItem, click: (item) => void) => JSX.Element;
  dependencyName: string;
  sortFn?: (item1: IFilterableItem, item2: IFilterableItem) => number;
}

export const DependenciesSelector: React.FC<IDepsSelectorProps> = (
  { selected, stored, selectedToStored, storedToSelected, itemToJsx, dependencyName, sortFn }
) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{`${dependencyName}s`}</h2>
          <Button
            content={`Add ${dependencyName.toLowerCase()}...`}
            className={styles.add_button}
            id={styles.add_courses}
            onClick={() => setModalOpen(true)}
          />
        </div>
        <div className={styles.list_container}>
          <FilterableList
            items={selected}
            itemToJsx={item => itemToJsx(item, selectedToStored)}
            sortFn={sortFn}
            scrolling
          />
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader className={styles.modal__header}>{`Add ${dependencyName.toLowerCase()}s`}</ModalHeader>
        <ModalContent className={styles.modal__content}>
          <FilterableList
            items={stored}
            itemToJsx={item => itemToJsx(item, storedToSelected)}
            sortFn={sortFn}
            scrolling
          />
        </ModalContent>
      </Modal>
    </>
  );
};
