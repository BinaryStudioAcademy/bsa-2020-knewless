import React, { createRef, useEffect, useState } from 'react';
import { List } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'screens/Authentication/constants';
import { IUser } from '@containers/AppRouter/models/IUser';

export interface IPopupMenuProps {
  user: IUser;
}

const PopupMenu: React.FC<IPopupMenuProps> = ({ user }) => {
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
  const [prefixOverflow, setPrefixOverflow] = useState<boolean>(false);
  const prefixRef = createRef<HTMLDivElement>();
  const emailPrefix = (email: string) => (email.substring(0, email.indexOf('@')));
  const emailPostfix = (email: string) => (email.substring(email.indexOf('@')));
  useEffect(() => {
    const e = prefixRef.current;
    setPrefixOverflow(e.offsetHeight < e.scrollHeight - 1 || e.offsetWidth < e.scrollWidth);
  }, [user?.email]);

  return (
    <>
      <List verticalAlign="middle" className={styles.popupMenu}>
        <List.Item className={styles.itemMenu} onClick={handleOnClickProfile}>
          <List.Icon className={styles.iconMenu} name="user outline" verticalAlign="middle" />
          <List.Content className={styles.no_overflow}>
            <List.Header>Profile</List.Header>
            {user && user.email && (
            <List.Description className={styles.email}>
              <div
                ref={prefixRef}
                className={styles.email_prefix}
              >
                {emailPrefix(user.email)}
              </div>
              <div className={prefixOverflow ? styles.email_prefix_overflowed : ''}>{emailPostfix(user.email)}</div>
            </List.Description>
            )}
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
    </>
  );
};

export default PopupMenu;
