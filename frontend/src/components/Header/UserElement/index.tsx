import React from 'react';
import { Icon, Label, Popup } from 'semantic-ui-react';
import styles from './styles.module.sass';
import Notifications from '@containers/Notifications';
import PopupMenu from '../PopupMenu';
import AvatarWithGradient from '@components/avatar/AvatarWithBackground';

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
    <Notifications userId={user.id} styleName={styles.toolbarBtn} />
    <Popup
      id={styles.popup}
      on="click"
      trigger={<AvatarWithGradient className={styles.avatar} imageSrc={user.avatar} />}
      position="bottom right"
      hoverable
    >
      <Popup.Content>
        <PopupMenu user={user} />
      </Popup.Content>
    </Popup>
  </div>
);

export default UserElement;
