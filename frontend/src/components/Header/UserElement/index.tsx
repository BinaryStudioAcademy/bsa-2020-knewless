import React from 'react';
import { Icon, Label, Popup } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.sass';
import Notifications from '@containers/Notifications';
import PopupMenu from '../PopupMenu';
import AvatarWithGradient from '@components/avatar/AvatarWithBackground';

const UserElement = ({ user, authorId }) => (
  <div className={styles.profileWrp}>
    <NavLink exact to="/favourites">
      <Label
        basic
        size="tiny"
        className={styles.toolbarBtn}
      >
        <Icon name="heart" size="big" inverted />
      </Label>
    </NavLink>
    <Notifications userId={user.id} styleName={styles.toolbarBtn} />
    <Popup
      id={styles.popup}
      on="click"
      trigger={<AvatarWithGradient className={styles.avatar} imageSrc={user.avatar} />}
      position="bottom right"
      hoverable
    >
      <Popup.Content>
        <PopupMenu user={user} authorId={authorId} />
      </Popup.Content>
    </Popup>
  </div>
);

export default UserElement;
