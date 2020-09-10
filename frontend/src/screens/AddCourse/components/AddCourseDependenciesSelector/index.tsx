import React, { useState } from 'react';
import styles from './styles.module.sass';
import { Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { AddCourseFilterableList, IFilterableItem } from '../AddCourseFilterableList';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import { DragNDropList } from '@screens/AddCourse/components/DragNDropList';
import { IBindingCallback1 } from '@models/Callbacks';

export interface IDepsSelectorProps {
  selected: IFilterableItem[];
  stored: IFilterableItem[];
  storedToSelected: (item: IFilterableItem) => void;
  selectedToStored: (item: IFilterableItem) => void;
  itemToJsx: (item: IFilterableItem, click: (item) => void, isSelected?: boolean) => JSX.Element;
  dependencyName: string;
  sortFn?: (item1: IFilterableItem, item2: IFilterableItem) => number;
  openModalAction: (open: boolean) => void;
  updateLectures: () => void;
  onDragEnd: IBindingCallback1<any>;
}

export const AddCourseDependenciesSelector: React.FC<IDepsSelectorProps> = ({
  selected,
  stored,
  selectedToStored,
  storedToSelected,
  itemToJsx,
  dependencyName,
  sortFn,
  openModalAction,
  updateLectures: update,
  onDragEnd
}) => {
  const [modalChooseOpen, setModalChooseOpen] = useState(false);
  const handleOpen = () => {
    update();
    setModalChooseOpen(true);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.textcontainer}>Lectures</div>
          <div className={styles.button_group}>
            <GrayOutlineButton
              content="Add lectures..."
              className={styles.add_button}
              onClick={() => handleOpen()}
            />
          </div>
        </div>
        <div className={styles.list_container}>
          <DragNDropList
            items={selected}
            itemToJsx={item => itemToJsx(item, selectedToStored, true)}
            sortFn={undefined}
            scrolling
            placeholderTitle={`You can add more ${dependencyName.toLowerCase()}s`}
            placeholderDescription="Just click the button above."
            onDragEnd={onDragEnd}
          />
        </div>
      </div>
      <Modal open={modalChooseOpen} closeIcon onClose={() => setModalChooseOpen(false)}>
        <ModalHeader className={styles.modal__header}>{`Select ${dependencyName.toLowerCase()}s`}</ModalHeader>
        <ModalContent className={styles.modal__content}>
          <AddCourseFilterableList
            items={stored}
            itemToJsx={item => itemToJsx(item, storedToSelected, false)}
            sortFn={sortFn}
            scrolling
            openModal={openModalAction}
            placeholderTitle="Its empty here"
            placeholderDescription="But you can create more."
          />
        </ModalContent>
      </Modal>
    </>
  );
};
