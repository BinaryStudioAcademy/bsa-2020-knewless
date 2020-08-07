import React, { useState, useEffect } from 'react';
import { IItem } from '../sharedInterface/IItem';
import { Button } from 'semantic-ui-react';

interface IElementProps {
    id: string;
    name: string;
    remove: Function;
}

const Item: React.FunctionComponent<IElementProps> = ({
  id,
  name,
  remove
}) => {
  const handleClick = () => {
    const lecture: IItem = {
      id,
      name
    };
    remove(lecture);
  };
  return (
    <Button onClick={() => handleClick()}>
      {name}
    </Button>
  );
};

export default Item;
