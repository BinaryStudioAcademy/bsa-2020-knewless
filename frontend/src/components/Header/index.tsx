import { NavLink, useLocation } from 'react-router-dom';
import PathIcon from './icons/paths';
import React, { useCallback, useEffect, useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.sass';
import LoginRegister from './LoginRegister';
import UserElement from './UserElement';
import { connect } from 'react-redux';
import { IUser } from '@containers/AppRouter/models/IUser';
import SearchHeader from '@screens/Search/containers/SearchHeader/index';
import LogoWithText from '@components/LogoWithText';
import { setNoAuthorizedRoutine } from '@screens/Home/routines';
import { IBindingAction } from '@models/Callbacks';

interface IHeaderProps {
  currentUser: IUser;
  isAuthorized: boolean;
  authorId?: string;
  isSettingsFilled: boolean;
  setNoAuthorized: IBindingAction;
}

const Header = ({ currentUser, isAuthorized, authorId, isSettingsFilled, setNoAuthorized }: IHeaderProps) => {
  const [searchStyle, setSearchStyle] = useState(styles.searchHidden);
  const location = useLocation();
  const hidingSearch = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < 390) {
      setSearchStyle(styles.searchHidden);
    } else {
      setSearchStyle(styles.search);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && !isAuthorized) {
      window.addEventListener('scroll', hidingSearch);
      setSearchStyle(styles.searchHidden);
    } else {
      window.removeEventListener('scroll', hidingSearch);
      setSearchStyle(styles.search);
    }
  }, [location, isAuthorized]);

  return (
    <div className={styles.headerWrp}>
      <div className={styles.customHeader}>
        <div className={styles.left_side}>
          <NavLink exact to={isSettingsFilled ? '/' : '/settings'}>
            <LogoWithText />
          </NavLink>
        </div>
        <div className={styles.middle}>
          <div className={styles.icons}>
            <div className={styles.column}>
              <NavLink exact to={isAuthorized && !isSettingsFilled ? '/settings' : '/'}>
                <Label
                  basic
                  size="tiny"
                  className={styles.routElement}
                >
                  <div className={styles.iconWrp}>
                    <Icon name="home" size="big" inverted />
                  </div>
                  <div className={styles.routName}>Home</div>
                </Label>
                {location.pathname === '/' && <div className={styles.homeLine} />}
              </NavLink>
            </div>
            <div className={styles.column}>
              <NavLink exact to={isAuthorized && !isSettingsFilled ? '/settings' : '/courses'}>
                <Label
                  basic
                  size="tiny"
                  className={styles.routElement}
                >
                  <div className={styles.iconWrp}>
                    <Icon name="newspaper outline" size="big" inverted />
                  </div>
                  <div className={styles.routName}>Courses</div>
                </Label>
                {location.pathname === '/courses' && <div className={styles.homeLine} />}
              </NavLink>
            </div>
            <div className={styles.column}>
              <NavLink exact to={isAuthorized && !isSettingsFilled ? '/settings' : '/paths'}>
                <Label
                  basic
                  size="tiny"
                  className={styles.routElement}
                >
                  <div className={styles.iconWrp}>
                    <PathIcon />
                  </div>
                  <div className={styles.routName}>Paths</div>
                </Label>
                {location.pathname === '/paths' && <div className={styles.homeLine} />}
              </NavLink>
            </div>
            {currentUser?.role?.name === 'AUTHOR' &&
          <div className={styles.column}>
              <NavLink exact to={isAuthorized && !isSettingsFilled ? '/settings' : '/articles'}>
                <Label
                  basic
                  size="tiny"
                  className={styles.routElement}
                >
                  <div className={styles.iconWrp}>
                    <Icon name="file alternate outline" size="big" inverted />
                  </div>
                  <div className={styles.routName}>Articles</div>
                </Label>
                {location.pathname === '/articles' && <div className={styles.homeLine} />}
              </NavLink>
            </div>}
          </div>
          <SearchHeader className={location.pathname === '/search' ? styles.searchHidden : searchStyle} />
        </div>
        <div className={styles.right_side}>
          {isAuthorized ? <UserElement setNoAuthorized={setNoAuthorized} user={currentUser} authorId={authorId} isSettingsFilled={isSettingsFilled} />
            : <LoginRegister />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { appRouter, auth, authorMainPage } = state;
  const { user, settingsFilled } = state.appRouter;
  return {
    currentUser: appRouter.user,
    authorId: authorMainPage.data.author.id,
    isAuthorized: auth.auth.isAuthorized,
    isSettingsFilled: settingsFilled
  };
};

const mapDispatchToProps = {
  setNoAuthorized: setNoAuthorizedRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
