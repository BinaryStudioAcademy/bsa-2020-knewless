import React from 'react';
import styles from './styles.module.sass';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { RoleTypes } from '@containers/AppRouter/models/IRole';
import LogoWithText from '@components/LogoWithText';

interface IRolePopUpProps {
  setSettingsMode: (role: RoleTypes) => void;
}

const RolePopUp: React.FunctionComponent<IRolePopUpProps> = ({ setSettingsMode }) => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <LogoWithText />
        <div className={styles.title}>
          Sign up as
        </div>
        <div className={styles.buttons_container}>
          <Button
            className={`${styles.role_btn} ${styles.student_btn}`}
            onClick={() => {
              setSettingsMode(RoleTypes.USER);
              history.push('/settings');
            }}
          >
            Student
          </Button>
          <div className={styles.separator} />
          <Button
            className={`${styles.role_btn} ${styles.author_btn}`}
            onClick={() => {
              setSettingsMode(RoleTypes.AUTHOR);
              history.push('/settings');
            }}
          >
            Author
          </Button>
        </div>
        <div className={styles.info}>
          Role is only chosen once
        </div>
      </div>
    </div>
  );
};

export default RolePopUp;
