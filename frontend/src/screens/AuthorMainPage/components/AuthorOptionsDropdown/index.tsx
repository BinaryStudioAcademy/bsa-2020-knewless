import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from './styles.module.sass';

export interface IAuthorOptionsDropdownProps {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export const AuthorOptionsDropdown: React.FunctionComponent<IAuthorOptionsDropdownProps> = ({
  onEditClick,
  onDeleteClick
}) => (
  <Dropdown
    icon="chevron down"
    compact
  >
    <Dropdown.Menu>
      {onEditClick && (
        <Dropdown.Item
          icon="edit inverted"
          text="Edit"
          onClick={onEditClick}
          className={styles.dropdown_item}
        />
      )}
      {onDeleteClick && (
        <Dropdown.Item
          icon="trash inverted"
          text="Delete"
          onClick={onDeleteClick}
          className={styles.dropdown_item}
        />
      )}
    </Dropdown.Menu>
  </Dropdown>
);
