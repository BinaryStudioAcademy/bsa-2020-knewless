import React from 'react';
import { Label, List, Divider } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'screens/Authentication/constants';

const PopupMenu = () => {
  const history = useHistory();
  const handleOnClickProfile = () => {
    history.push('/profile');
  };
  const handleOnClickHistory = () => {
    history.push('/history');
  };
  const handleOnClickSettings = () => {
    history.push('/settings');
  };
  const handleOnClickSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    history.push('/');
    history.go();
  };

  return (
    <List verticalAlign="middle" className={styles.popupMenu}>
      <List.Item className={styles.itemMenu} onClick={handleOnClickProfile}>
        <List.Icon className={styles.iconMenu} name="user outline" verticalAlign="middle" />
        <List.Content>
          <List.Description className={styles.titleMenu} as="a">Profile</List.Description>
        </List.Content>
      </List.Item>
      <List.Item className={styles.itemMenu} onClick={handleOnClickHistory}>
        <List.Icon className={styles.iconMenu} name="clock outline" verticalAlign="middle" />
        <List.Content>
          <List.Description className={styles.titleMenu} as="a">History</List.Description>
        </List.Content>
      </List.Item>
      <List.Item className={styles.itemMenu} onClick={handleOnClickSettings}>
        <List.Icon className={styles.iconMenu} name="setting" verticalAlign="middle" />
        <List.Content>
          <List.Description className={styles.titleMenu} as="a">Account Settings</List.Description>
        </List.Content>
      </List.Item>
      <hr className={styles.dividerMenu} />
      <List.Item className={styles.lastItemMenu} onClick={handleOnClickSignOut}>
        <List.Icon className={styles.iconMenu} name="sign-out alternate" verticalAlign="middle" />
        <List.Content>
          <List.Description className={styles.titleMenu} as="a">Sign out</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
};
export default PopupMenu;
