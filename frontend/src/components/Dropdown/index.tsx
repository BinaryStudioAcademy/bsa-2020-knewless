import React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import styles from './styles.module.sass';
import './dropdown.sass';

export const OutlineDropdown: React.FC<DropdownProps> = props => {
  const { className, children, value } = props;
  return (
    <Dropdown
      {...props}
      value={value || ''}
      className={`${className || ''} ${styles.dropdown} full_width`}
    >
      {children}
    </Dropdown>
  );
};
