import React, { FormEvent } from 'react';
import { Form, Button } from 'semantic-ui-react';
import goalMenuConfig from './config/goalMenuConfig.json';
import styles from './styles.module.sass';
import { IStudent } from 'screens/MainPage/models/IStudent';
import noAvatar from 'assets/images/no_avatar.jpg';

interface IUserInfoBlockProps {
  student: IStudent;
}

const UserInfoBlock: React.FunctionComponent<IUserInfoBlockProps> = (
  { student: { firstName, job, avatar } }
) => {
  const handleSubmit = (e: FormEvent) => {
    // handle submit
  };
  return (
    <div className={styles.userMainInfoBlock}>
      <div className={styles.centerContainer}>
        <div className={styles.userInfo}>
          <div className={styles.userImageWrp}>
            <img
              src={avatar || noAvatar}
              className={styles.userImage}
              alt="User avatar"
            />
          </div>
          <div className={styles.greeting}>
            <p className={styles.greetingText}>
              {firstName ? `Hello, ${firstName}!` : ''}
            </p>
            <p className={styles.studentRole}>{job}</p>
          </div>
        </div>
        <div className={styles.goalInfo}>
          <p className={styles.setGoalText}>Set a personal Goal</p>
          <p className={styles.trackProgressText}>Track your progress and stay motivated</p>
          <Form className={styles.goalInfoForm}>
            <Form.Dropdown
              fluid
              selection
              placeholder="Select your goal"
              className={styles.goalDropdownMenu}
              options={goalMenuConfig}
              required
            />
            <Button
              type="submit"
              className={styles.saveBtn}
              onSubmit={e => handleSubmit(e)}
            >
              <p className={styles.btnText}>Save</p>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoBlock;
