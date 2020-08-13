import Logo from './logo';
import { NavLink } from 'react-router-dom';
import PathIcon from './icons/paths';
import React, { useState } from 'react';
import { Input, Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.sass';
import LoginRegister from './LoginRegister';
import UserElement from './UserElement';
import { connect } from 'react-redux';
import { IAppState } from '../../models/AppState';
import { IUser } from '../../containers/AppRouter/models/IUser';

enum RoutPointer {
    home,
    courses,
    paths
}

interface IHeaderProps {
  currentUser: IUser;
  isAuthorized: boolean;
}

const Header = ({ currentUser, isAuthorized }: IHeaderProps) => {
  const [currentRout, setCurrentRout] = useState(RoutPointer.home);
  const [search, setSearch] = useState('');

  const [serchStyle, setSearchStyle] = useState(styles.searchHidden);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < 390) {
      setSearchStyle(styles.searchHidden);
    } else {
      setSearchStyle(styles.search);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return (
    <div className={styles.headerWrp}>
      <div className={styles.customHeader}>
        <div className={styles.left_side}>
          <NavLink exact to="/">
            <div className={styles.mainName}>
              <Logo />
              KnewLess
            </div>
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
                  onClick={() => setCurrentRout(RoutPointer.home)}
                >
                  <div className={styles.iconWrp}>
                    <Icon name="home" size="big" inverted />
                  </div>
                  <div className={styles.routName}>Home</div>
                </Label>
                {currentRout === 0 ? <div className={styles.homeLine} /> : ''}
              </NavLink>
            </div>
            <div className={styles.column}>
              <NavLink exact to="/">
                <Label
                  basic
                  size="tiny"
                  className={styles.routElement}
                  onClick={() => setCurrentRout(RoutPointer.courses)}
                >
                  <div className={styles.iconWrp}>
                    <Icon name="newspaper outline" size="big" inverted />
                  </div>
                  <div className={styles.routName}>Courses</div>
                </Label>
                {currentRout === 1 ? <div className={styles.homeLine} /> : ''}
              </NavLink>
            </div>
            <div className={styles.column}>
              <NavLink exact to="/">
                <Label
                  basic
                  size="tiny"
                  className={styles.routElement}
                  onClick={() => setCurrentRout(RoutPointer.paths)}
                >
                  <div className={styles.iconWrp}>
                    <PathIcon />
                  </div>
                  <div className={styles.routName}>Paths</div>
                </Label>
                {currentRout === 2 ? <div className={styles.homeLine} /> : ''}
              </NavLink>
            </div>
          </div>
          <Input
            id="searchInput"
            type="text"
            icon="search"
            value={search}
            className={serchStyle}
            placeholder="Search..."
            onChange={ev => setSearch(ev.target.value)}
            inverted
          />
        </div>
        <div className={styles.right_side}>
          {isAuthorized ? <UserElement user={currentUser} /> : <LoginRegister /> }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { appRouter, auth } = state;
  return {
    currentUser: appRouter.user,
    isAuthorized: auth.auth.isAuthorized
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
