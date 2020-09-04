import React, { useState } from 'react';
import { Icon, Label, Popup } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.sass';
import Notifications from '@containers/Notifications';
import PopupMenu from '../PopupMenu';
import PopupAddMenu from '../PopupAddMenu';
import AvatarWithGradient from '@components/avatar/AvatarWithBackground';

const UserElement = ({ user, authorId, isSettingsFilled, setNoAuthorized }) => {
  const [IsOpen, setIsOpen] = useState(false);
  const handleOnClose = () => {
    setIsOpen(false);
  };
  const handleOnOpen = () => {
    setIsOpen(true);
  };
  return (<div className={styles.profileWrp}>
    {user?.role?.name === 'AUTHOR' ?
      <Popup
        id={styles.popupAdd}
        on="click"
        trigger={
          <Label
            basic
            size="tiny"
            className={styles.toolbarBtn}
          >
            <Icon name="add" size="big" inverted />
          </Label>}
        open={IsOpen}
        onOpen={handleOnOpen}
        onClose={handleOnClose}
        position="bottom right"
        hoverable
      >
        <Popup.Content>
          <PopupAddMenu isSettingsFilled={isSettingsFilled} close={handleOnClose} />
        </Popup.Content>
      </Popup>
      :
      <NavLink exact to={user.id && !isSettingsFilled ? "/settings" : "/favourites"}>
        <Label
          basic
          size="tiny"
          className={styles.toolbarBtn}
        >
          <Icon name="heart" size="big" inverted />
        </Label>
      </NavLink>
    }
    <Notifications userId={user.id} styleName={styles.toolbarBtn} />
    <Popup
      id={styles.popup}
      on="click"
      trigger={<AvatarWithGradient className={styles.avatar} imageSrc={user.avatar} />}
      position="bottom right"
      hoverable
    >
      <Popup.Content>
        <PopupMenu setNoAuthorized={setNoAuthorized} isSettingsFilled={isSettingsFilled} user={user} authorId={authorId} />
      </Popup.Content>
    </Popup>
  </div>
  );
};

export default UserElement;
