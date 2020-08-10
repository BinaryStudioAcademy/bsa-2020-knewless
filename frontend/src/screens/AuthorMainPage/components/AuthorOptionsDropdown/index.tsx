import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from './styles.module.sass';

export interface IAuthorOptionsDropdownProps {
  onEditClick?: () => void;
}

export const AuthorOptionsDropdown: React.FunctionComponent<IAuthorOptionsDropdownProps> = ({
  onEditClick
}) => (
  <Dropdown compact icon="ellipsis vertical">
    <Dropdown.Menu id={styles.author_dropdown_menu}>
      {onEditClick && (
        <Dropdown.Item
          icon="edit"
          text="Edit"
          onClick={onEditClick}
          id={styles.dropdown_item}
        />
      )}
    </Dropdown.Menu>
  </Dropdown>
);
