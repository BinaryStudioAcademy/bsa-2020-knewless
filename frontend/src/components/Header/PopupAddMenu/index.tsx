import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { history } from '@helpers/history.helper';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'screens/Authentication/constants';
import { IUser } from '@containers/AppRouter/models/IUser';
import MiddleEllipsis from 'react-middle-ellipsis';
import { RoleTypes } from '@containers/AppRouter/models/IRole';
import PathDarkIcon from '../icons/pathsDark';
import { IBindingAction } from 'models/Callbacks';
export interface IPopupAddMenuProps {
  isSettingsFilled: boolean;
  close: IBindingAction;
}

const PopupAddMenu: React.FC<IPopupAddMenuProps> = ({ isSettingsFilled , close }) => {
  const handleOnClickPath = () => {
    close();
    isSettingsFilled? history.push('/add_path') : history.push('/settings');
  };
  const handleOnClickCourse = () => {
    close();
    isSettingsFilled? history.push('/add_course') : history.push('/settings');
  };
  const handleOnClickArticle = () => {
    close();
    isSettingsFilled? history.push('/add_article') : history.push('/settings');
  };

  return (
    <>
      <List verticalAlign="middle" className={styles.popupMenu}>
      <List.Item className={styles.itemMenu} onClick={handleOnClickPath}>
          <div className={styles.iconWrap}> <PathDarkIcon /></div>
          <span>Add path</span>
        </List.Item>
        <List.Item className={styles.itemMenu} onClick={handleOnClickCourse}>
        <div className={styles.iconWrap}>
          <Icon name="newspaper outline" className={styles.iconMenu}/>
          </div>
           <span>Add course </span>
           </List.Item>
        <List.Item className={styles.itemMenu} onClick={handleOnClickArticle}>
        <div className={styles.iconWrap}><Icon name="file alternate outline" className={styles.iconMenu}/>
        </div> 
        <span>Add article</span>
         </List.Item>
      </List>
    </>
  );
};

export default PopupAddMenu;
