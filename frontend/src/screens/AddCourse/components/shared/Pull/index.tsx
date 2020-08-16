import React, { useState } from 'react';
import { IItem } from '../sharedInterface/IItem';
import { filter } from '../service';
import Item from '../element';
import { Input } from 'semantic-ui-react';

interface IPullSetProps {
    items: Array<IItem>;
    remove: Function;
}

const PullSet: React.FunctionComponent<IPullSetProps> = ({
  items,
  remove
}) => {
  const [search, setSearch] = useState('');
  return (
    <div>
      <Input
        type="text"
        value={search}
        placeholder="search course..."
        onChange={ev => setSearch(ev.target.value)}
        inverted
      />
      {items.map(i => {
        if (filter(i, search)) {
          return (
            <Item
              key={i.id}
              id={i.id}
              name={i.name}
              remove={remove}
            />
          );
        }
        return '';
      })}
    </div>
  );
};

export default PullSet;
