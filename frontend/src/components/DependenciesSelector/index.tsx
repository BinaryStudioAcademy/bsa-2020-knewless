import React, { useState } from 'react';
import styles from './styles.module.sass';
import { Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { FilterableList, IFilterableItem } from '../FilterableList';
import GrayOutlineButton from '../buttons/GrayOutlineButton';

export interface IDepsSelectorProps {
  selected: IFilterableItem[];
  stored: IFilterableItem[];
  storedToSelected: (item: IFilterableItem) => void;
  selectedToStored: (item: IFilterableItem) => void;
  itemToJsx: (item: IFilterableItem, click: (item) => void, isSelected: boolean) => JSX.Element;
  dependencyName: string;
  sortFn?: (item1: IFilterableItem, item2: IFilterableItem) => number;
  addNewDependencyFn: () => void;
}

export const DependenciesSelector: React.FC<IDepsSelectorProps> = (
  { selected, stored, selectedToStored, storedToSelected, itemToJsx, dependencyName, sortFn,
    addNewDependencyFn }
) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>{`${dependencyName.substring(0, 1).toUpperCase().concat(dependencyName.substring(1))}s:`}</span>
          <GrayOutlineButton
            content={`Add ${dependencyName.toLowerCase()}...`}
            className={styles.add_button}
            onClick={() => setModalOpen(true)}
          />
        </div>
        <div className={styles.list_container}>
          <FilterableList
            items={selected}
            itemToJsx={item => itemToJsx(item, selectedToStored, true)}
            sortFn={sortFn}
            scrolling
            placeholderTitle={`You can add ${dependencyName.toLowerCase()}s`}
            placeholderDescription="Just click the button above."
          />
        </div>
      </div>
      <Modal open={modalOpen} closeIcon onClose={() => setModalOpen(false)}>
        <ModalHeader className={styles.modal__header}>{`Select ${dependencyName.toLowerCase()}s`}</ModalHeader>
        <ModalContent className={styles.modal__content}>
          <FilterableList
            items={stored}
            itemToJsx={item => itemToJsx(item, storedToSelected, false)}
            sortFn={sortFn}
            scrolling
            placeholderTitle="It's empty"
            placeholderDescription={`But you can create more ${dependencyName.toLowerCase()}s!`}
            placeholderFn={addNewDependencyFn}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
