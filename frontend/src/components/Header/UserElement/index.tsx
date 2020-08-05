import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { User } from '../index';

interface IUserElementProps {
  user: User;
}

const UserElement = ({ user }: IUserElementProps) => (
  <div className={styles.profileWrp}>
    <Label
      basic
      size="tiny"
      className={styles.toolbarBtn}
      onClick={() => { console.log('clicked'); }}
    >
      <Icon name="heart" size="large" inverted />
    </Label>
    <Label
      basic
      size="tiny"
      className={styles.toolbarBtn}
      onClick={() => { console.log('clicked'); }}
    >
      <Icon name="bell" size="large" inverted />
    </Label>
    <div className={styles.imageborder}>
      <img src={user.avatar} className={styles.avatar} alt={user.name} />
    </div>
  </div>
);

export default UserElement;
