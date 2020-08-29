import { NavLink, useLocation } from 'react-router-dom';
import PathIcon from './icons/paths';
import React, { useCallback, useEffect, useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.sass';
import LoginRegister from './LoginRegister';
import UserElement from './UserElement';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { IUser } from '@containers/AppRouter/models/IUser';
import SearchHeader from '@screens/Search/containers/SearchHeader/index';
import LogoWithText from '@components/LogoWithText';

interface IHeaderProps {
  currentUser: IUser;
  isAuthorized: boolean;
  authorId?: string;
}

const Header = ({ currentUser, isAuthorized, authorId }: IHeaderProps) => {
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
          <NavLink exact to="/">
            <LogoWithText />
          </NavLink>
        </div>
        <div className={styles.middle}>
          <div className={styles.icons}>
            <div className={styles.column}>
              <NavLink exact to="/">
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
              <NavLink exact to="/courses">
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
              <NavLink exact to="/paths">
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
          </div>
          <SearchHeader className={location.pathname === '/search' ? styles.searchHidden : searchStyle} />
        </div>
        <div className={styles.right_side}>
          {isAuthorized ? <UserElement user={currentUser} authorId={authorId} /> : <LoginRegister />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { appRouter, auth, authorMainPage } = state;
  return {
    currentUser: appRouter.user,
    authorId: authorMainPage.data.author.id,
    isAuthorized: auth.auth.isAuthorized
  };
};

export default connect(mapStateToProps)(Header);
