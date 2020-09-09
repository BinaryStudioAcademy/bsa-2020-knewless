import React, { useCallback, useState } from 'react';
import { Input } from 'semantic-ui-react';
import { filterByName } from '../AddCourseFilterableList/helper';
import styles from './styles.module.sass';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import { ListPlaceholder } from '@components/placeholder/ListPlaceholder';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IBindingCallback1 } from '@models/Callbacks';

export interface IAddCourseFilterableListProps {
  items: IFilterableItem[];
  itemToJsx: (item: IFilterableItem) => JSX.Element;
  scrolling?: boolean;
  sortFn?: (item1: IFilterableItem, item2: IFilterableItem) => number;
  openModal?: (open: boolean) => void;
  placeholderTitle?: string;
  placeholderDescription?: string;
  placeholderFnText?: string;
  placeholderFn?: () => void;
  onDragEnd: IBindingCallback1<any>;
}

export interface IFilterableItem {
  id: string;
  name: string;
}

export const DragNDropList: React.FC<IAddCourseFilterableListProps> = ({
  items, itemToJsx, sortFn, scrolling = false, openModal,
  placeholderTitle, placeholderDescription, placeholderFn,
  placeholderFnText = 'Add new...', onDragEnd
}) => {
  const [filterString, setFilter] = useState('');

  const handleSort = useCallback((a, b) => {
    if (sortFn !== undefined) {
      return sortFn(a, b);
    }
    return 0;
  }, [sortFn]);

  return (
    <div className={styles.container}>
      {openModal && (
        <div className={styles.topRow}>
          <GrayOutlineButton
            content="Upload new"
            className={styles.upload_button}
            onClick={() => openModal(true)}
          />
        </div>
      )}
      <Input
        icon="search"
        placeholder="Filter..."
        onChange={event => setFilter(event.target.value)}
        className={styles.search_box}
      />
      {items.length === 0 ? (
        <ListPlaceholder
          button={placeholderFn ? { onClick: placeholderFn, text: placeholderFnText } : undefined}
          title={placeholderTitle}
          description={placeholderDescription}
        />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.filter(i => filterByName(i, filterString)).sort(handleSort).map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {itemToJsx(item)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
