import React, { useState, useEffect } from 'react';
import { IItem } from '../sharedInterface/IItem';
import { Card, Icon, Label, Divider } from 'semantic-ui-react';
import styles from './styles.module.sass';

interface IElementProps {
    id: string;
    name: string;
    description: string;
    remove: Function;
}

const Item: React.FunctionComponent<IElementProps> = ({
  id,
  name,
  description,
  remove
}) => {
  const handleClick = () => {
    const lecture: IItem = {
      id,
      name,
      description
    };
    remove(lecture);
  };
  return (
    <Card
      className={styles.lecture}
      description={description}
    >
      <Card.Content>
        <Card.Header>
          {name}
        </Card.Header>
        <Divider fitted />
        <Card.Description style={{ textoverflow: 'ellipsis' }}>
          {description}
        </Card.Description>
      </Card.Content>
      <Label
        basic
        className={styles.addIcon}
        as="a"
        attached="top right"
        size="tiny"
        color="green"
        onClick={() => handleClick()}
      >
        <Icon size="large" name="check" />
      </Label>
    </Card>
  );
};

export default Item;
