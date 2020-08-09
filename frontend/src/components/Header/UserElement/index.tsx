import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { User } from '../index';
import Notifications from '../../../containers/Notifications';

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
      <Icon name="heart" size="big" inverted />
    </Label>
    <Notifications user={{ id: 'f5f987b5-eaee-4709-93f4-94ac585cb812' }} styleName={styles.toolbarBtn} />
    <div className={styles.imageborder}>
      <img src={user.avatar} className={styles.avatar} alt={user.name} />
    </div>
  </div>
);

export default UserElement;
