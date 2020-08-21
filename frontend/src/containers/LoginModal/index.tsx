import React from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react';
import LoginForm from '@components/LoginForm';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.sass';

interface ILoginModal {
  onOpen: boolean;
  isLoginLoading: boolean;
  isAuthorized: boolean;
  isLoginFailure: boolean;
  setOpen: IBindingCallback1<string>;
  loginUser: IBindingAction;
  redirectTo: string;
}

export const LoginModal: React.FC<ILoginModal> = ({ onOpen, setOpen, isLoginLoading, loginUser, isAuthorized, isLoginFailure, redirectTo }) => (
  isAuthorized
    ? <Redirect to={redirectTo} />
    : (
      <Modal
        basic
        onClose={() => setOpen('')}
        onOpen={() => setOpen('')}
        open={onOpen}
        size='tiny'
        trigger={<Button>Basic Modal</Button>}
      >
        {isLoginFailure && (
          <div className={styles.main_container_tost}>
            <div className={styles.main_container_tost__error_message}>
              Email or password is incorrect
            </div>
          </div>
        )}
        <div style={{ backgroundColor: '#121421', padding: '50px 0' }}>
          <LoginForm isLanding={true} isLoginLoading={isLoginLoading} login={loginUser} />
        </div>
      </Modal>

    )
);