import React from 'react';
import { Icon, Label, Popup } from 'semantic-ui-react';
import styles from './styles.module.sass';
import Notifications from '../../../containers/Notifications';
import PopupMenu from '../PopupMenu';

const UserElement = ({ user }) => (
  <div className={styles.profileWrp}>
    <Label
      basic
      size="tiny"
      className={styles.toolbarBtn}
      onClick={() => { console.log('clicked'); }}
    >
      <Icon name="heart" size="big" inverted />
    </Label>
    <Notifications user={{ id: user.id }} styleName={styles.toolbarBtn} />
    <Popup
      id={styles.popup}
      on="click"
      trigger={(
        <div className={styles.imageborder}>
          <img src={user.avatar} className={styles.avatar} alt={user.nickname} />
        </div>
        )}
      position="bottom right"
      flowing
      hoverable
    >
      <Popup.Content>
        <PopupMenu />
      </Popup.Content>
    </Popup>
  </div>
);

export default UserElement;
