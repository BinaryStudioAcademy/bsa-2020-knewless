import React, { FC } from 'react';
import { ModalDark } from '@components/DarkModal';
import { ModalContent, ModalHeader } from 'semantic-ui-react';
import { IStudentSubscriptions } from '@screens/StudentPage/containers/StudentProfilePage';
import StudentFollowCard from '@components/StudentFollowCard';
import styles from './styles.module.sass';
import { IBindingCallback1 } from '@models/Callbacks';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';

interface IStudentFollowModalProps {
  subscriptions: IStudentSubscriptions[];
  followAuthor: IBindingCallback1<string>;
  unfollowAuthor: IBindingCallback1<string>;
  onClose: IBindingCallback1<any>;
  isOpen: boolean;
}

const StudentFollowsModal: FC<IStudentFollowModalProps> = ({ subscriptions, followAuthor, unfollowAuthor, onClose, isOpen }) => (
  <ModalDark onClose={onClose} closeIcon size="small" open={isOpen}>
    <ModalHeader className={styles.title}>Your subscriptions</ModalHeader>
    <ModalContent className={styles.content}>
      {subscriptions.length > 0
        ? subscriptions.map(card => <StudentFollowCard subscription={card} followAuthor={followAuthor} unfollowAuthor={unfollowAuthor} />)
        : <RowPlaceholder />}
    </ModalContent>
  </ModalDark>
);

export default StudentFollowsModal;
