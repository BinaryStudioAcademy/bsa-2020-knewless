import Logo from './logo';
import { NavLink } from 'react-router-dom';
import UserElement from './UserElement';
import PathIcon from './icons/paths';
import React, { useState } from 'react';
import { Input, Grid, Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.sass';
import LoginRegister from './LoginRegister';

enum RoutPointer {
    home,
    courses,
    paths
}

export class User {
    id: string;

    name: string;

    avatar: string;

    notifications?: []
}

interface IHeaderProps {
    currentUser?: User;
}

const Header = ({ currentUser }: IHeaderProps) => {
  const [currentRout, setCurrentRout] = useState(RoutPointer.home);
  const [search, setSearch] = useState('');

  const [serchStyle, setSearchStyle] = useState(styles.searchHidden);

  const handleSearchReturn = e => {
    const elem = document.getElementById('searchInput');
    if (e.key !== 'Escape' && e.target !== elem && !elem.contains(e.target)) return;
    if (e.key === 'Escape') setSearch('');
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < 390) {
      setSearchStyle(styles.searchHidden);
    } else {
      setSearchStyle(styles.search);
    }
  };
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('keydown', handleSearchReturn);
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
          <Grid centered columns="3" textAlign="center">
            <Grid.Column verticalAlign="middle">
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
              </NavLink>
              {currentRout === 0 ? <div className={styles.homeLine} /> : ''}
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
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
              </NavLink>
              {currentRout === 1 ? <div className={styles.homeLine} /> : ''}
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
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
              </NavLink>
              {currentRout === 2 ? <div className={styles.homeLine} /> : ''}
            </Grid.Column>
          </Grid>
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
          {currentUser ? <UserElement user={currentUser} /> : <LoginRegister /> }
        </div>
      </div>
    </div>
  );
};

export default Header;
