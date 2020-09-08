import React, { FunctionComponent } from 'react';
import Avatar from '@components/avatar/Avatar';
import { IStudentSubscriptions } from '@screens/StudentPage/containers/StudentProfilePage';
import styles from './styles.module.sass';
import { GradientButton } from '@components/buttons/GradientButton';
import { IBindingCallback1 } from '@models/Callbacks';
import { history } from '@helpers/history.helper';

interface IStudentFollowCardProps {
  subscription: IStudentSubscriptions;
  followAuthor: IBindingCallback1<string>;
  unfollowAuthor: IBindingCallback1<string>;
}

const StudentFollowCard: FunctionComponent<IStudentFollowCardProps> = ({ subscription, followAuthor, unfollowAuthor }) => (
  <div className={styles.card_content}>
    <Avatar className={styles.avatar} imageSrc={subscription.avatar} />
    <div className={styles.info}>
      <div>
        <p onClick={() => history.push(`/author/${subscription.id}`)} className={styles.name}>{subscription.name}</p>
        <p className={styles.lectures}>
          {subscription.lectures}
          {' '}
          {subscription.lectures !== 1 ? 'courses' : 'course'}
          {' '}
          authored
        </p>
      </div>
      <div className={styles.author_action_buttons}>
        {!subscription.follow ? (
          <GradientButton className={styles.authorFollowButton} onClick={() => followAuthor(subscription.id)}>
            <div className={styles.textButtonFollow}>Follow</div>
          </GradientButton>
        ) : (
          <GradientButton className={styles.authorFollowButton} onClick={() => unfollowAuthor(subscription.id)}>
            <div className={styles.unfollow}>
              <div className={styles.textButtonUnfollow}>Following</div>
            </div>
          </GradientButton>
        )}
      </div>
    </div>
  </div>
);

export default StudentFollowCard;
