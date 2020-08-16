import React from 'react';
import { IItem } from '../sharedInterface/IItem';
import Item from '../element';

interface ISelectedSetProps {
    items: Array<IItem>;
    remove: Function;
}

const SelectedSet: React.FunctionComponent<ISelectedSetProps> = ({
  items,
  remove
}) => (
  <div>
    {items.map(i => (
      <Item
        key={i.id}
        id={i.id}
        name={i.name}
        remove={remove}
      />
    ))}
  </div>
);

export default SelectedSet;
