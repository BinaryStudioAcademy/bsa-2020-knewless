import React from 'react';
import {Redirect} from 'react-router-dom';
import { List } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { history } from '@helpers/history.helper';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'screens/Authentication/constants';
import { IUser } from '@containers/AppRouter/models/IUser';
import MiddleEllipsis from 'react-middle-ellipsis';
import { RoleTypes } from '@containers/AppRouter/models/IRole';
import { IBindingAction } from '@models/Callbacks';

export interface IPopupMenuProps {
  user: IUser;
  authorId?: string;
  isSettingsFilled: boolean;
  setNoAuthorized: IBindingAction;
}

const PopupMenu: React.FC<IPopupMenuProps> = ({ user, authorId, isSettingsFilled, setNoAuthorized }) => {
  const handleOnClickProfile = () => {
    let profilePath;
    if (user.role.name === RoleTypes.USER) {
      profilePath = '/profile';
    } else if (user.role.name === RoleTypes.AUTHOR && !!authorId) {
      profilePath = `/author/${authorId}`;
    } else {
      profilePath = '/login';
    }
    isSettingsFilled ? history.push(profilePath) : history.push('/settings');
  };
  const handleOnClickHistory = () => {
    isSettingsFilled? history.push('/history') : history.push('/settings');
  };
  const handleOnClickSettings = () => {
    history.push('/settings');
  };
  const handleOnClickSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setNoAuthorized();
  };

  return (
    <>
      <List verticalAlign="middle" className={styles.popupMenu}>
        <List.Item className={styles.itemMenu} onClick={handleOnClickProfile}>
          <List.Icon className={styles.iconMenu} name="user outline" verticalAlign="middle" />
          <List.Content className={styles.no_overflow}>
            <List.Header>Profile</List.Header>
            {user && user.email && (
              <List.Description className={styles.email}>
                <MiddleEllipsis>
                  <span className={`ellipseMe ${styles.email_line}`}>
                    {user.email}
                  </span>
                </MiddleEllipsis>
              </List.Description>
            )}
          </List.Content>
        </List.Item>
        {user.role.name !== RoleTypes.AUTHOR && (
          <List.Item className={styles.itemMenu} onClick={handleOnClickHistory}>
            <List.Icon className={styles.iconMenu} name="clock outline" verticalAlign="middle" />
            <List.Content>
              <List.Description className={styles.titleMenu} as="a">History</List.Description>
            </List.Content>
          </List.Item>
        )}
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
    </>
  );
};

export default PopupMenu;
