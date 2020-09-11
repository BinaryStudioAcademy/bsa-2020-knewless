import React, { useEffect, useState } from 'react';
import { Form, Placeholder, PlaceholderLine, Popup, Progress } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { IStudent } from 'screens/MainPage/models/IStudent';
import noAvatar from 'assets/images/no_avatar.jpg';
import { IPersonalGoalItem, IPersonalGoalProgress } from '@screens/MainPage/models/PersonalGoal';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { extractCurrentGoal, extractGoals } from '@screens/MainPage/models/IMainStudentPageData';
import {
  extractCurrentGoalLoading,
  extractGoalsLoading,
  extractSetGoalLoading
} from '@screens/MainPage/models/IMainStudentPageState';
import { setCongratsShownRoutine, setCurrentGoalRoutine } from '@screens/MainPage/routines';
import GradientButton from '@components/buttons/GradientButton';
import AvatarWithGradient from '@components/avatar/AvatarWithBackground';
import { secondsFormatted } from '@helpers/seconds.helper';
import moment from 'moment';
import { CongratulationsAnimation } from '@screens/MainPage/containers/CongratulationsAnimation';

interface IUserInfoBlockProps {
  student: IStudent;
  studentLoading: boolean;
  goals?: IPersonalGoalItem[];
  goalsLoading?: boolean;
  currentGoal?: IPersonalGoalProgress | undefined;
  currentGoalLoading?: boolean;
  settingGoalLoading?: boolean;
  trySetCurrentGoal?: (goalId: string) => void;
  trySetCongratsShown: () => void;
}

interface IDropdownItem {
  text: string;
  value: string;
}

const UserInfoBlock: React.FunctionComponent<IUserInfoBlockProps> = (
  {
    student: { firstName, job, avatar }, goals, currentGoal,
    currentGoalLoading, goalsLoading, settingGoalLoading, trySetCurrentGoal,
    studentLoading, trySetCongratsShown
  }
) => {
  const [goalItems, setGoalItems] = useState<IDropdownItem[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  useEffect(() => {
    setGoalItems(goals.filter(g => !currentGoal || g.durationSeconds >= currentGoal?.secondsDone
      || g.id === currentGoal?.goalId)
      .map(g => ({
        text: g.name,
        value: g.id
      })));
  }, [currentGoal, goals]);

  useEffect(() => {
    if (currentGoal) {
      setSelectedGoalId(currentGoal.goalId);
    }
  }, [currentGoal]);

  return (
    <div className={styles.userMainInfoBlock}>
      <div className={styles.centerContainer}>
        <div className={styles.userInfo}>
          <AvatarWithGradient
            imageSrc={avatar || noAvatar}
            className={styles.avatar}
            animated={false}
            isLoading={studentLoading}
          />
          <div className={styles.greeting}>
            {studentLoading ? (
              <Placeholder className={styles.namePlaceholder}>
                <PlaceholderLine />
                <PlaceholderLine />
                <PlaceholderLine />
              </Placeholder>
            ) : (
              <>
                <p className={styles.greetingText}>
                  {firstName ? `Hello, ${firstName}!` : ''}
                </p>
                <p className={styles.studentRole}>{job}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles.goalInfo}>
          <div className={styles.progressBlock}>
            {currentGoalLoading ? (
              <Placeholder>
                <PlaceholderLine />
                <PlaceholderLine />
              </Placeholder>
            ) : (
              <>
                {currentGoal ? (
                  <>
                    {currentGoal.done && !currentGoal.congratulationShown
                    && (
                    <CongratulationsAnimation
                      title="You've completed the goal!"
                      onCompletion={trySetCongratsShown}
                    />
                    )}
                    {currentGoal.done ? (
                      // eslint-disable-next-line jsx-a11y/accessible-emoji
                      <p className={styles.goalTitle}>You rock 🤘 Goal completed</p>
                    ) : (
                      <p className={styles.goalTitle}>Current goal progress</p>
                    )}
                    <Popup
                      wide
                      content={(
                        <div className={styles.popup_container}>
                          <span>{`Starting from ${moment(currentGoal.goalStarted).format('ddd, D MMMM')}`}</span>
                          <span>
                            {`Watched ${secondsFormatted(currentGoal.secondsDone)} of
                          ${secondsFormatted(currentGoal.secondsNeededOverall)}`}
                          </span>
                        </div>
)}
                      trigger={(
                        <Progress
                          progress="percent"
                          percent={currentGoal.percentsDone}
                          className={styles.progressBar}
                          color="blue"
                          size="medium"
                          indicating={currentGoal.done}
                        />
                      )}
                    />
                  </>
                ) : (
                  <>
                    <p className={styles.goalTitle}>Set a personal Goal</p>
                    <p className={styles.goalDescription}>Track your progress and stay motivated</p>
                  </>
                )}
              </>
            )}
          </div>
          <Form className={styles.goalInfoForm}>
            <Form.Dropdown
              fluid
              selection
              placeholder={goalItems.length === 0 ? 'No goals available' : 'Select your goal'}
              className={styles.goalDropdownMenu}
              options={goalItems}
              disabled={goalItems.length <= 1}
              loading={goalsLoading}
              onChange={(_, { value }) => setSelectedGoalId(value as string)}
              value={selectedGoalId || ''}
              required
            />
            <GradientButton
              type="submit"
              onClick={() => trySetCurrentGoal(selectedGoalId === '' ? undefined : selectedGoalId)}
              loading={settingGoalLoading}
              disabled={
                currentGoal?.goalId === selectedGoalId || goalsLoading
                || (!currentGoal && (selectedGoalId === ''))
              }
              className={styles.submitGoalButton}
            >
              Save
            </GradientButton>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const mapStateToProps = (state: IAppState) => ({
  goals: extractGoals(state),
  goalsLoading: extractGoalsLoading(state),
  currentGoal: extractCurrentGoal(state),
  currentGoalLoading: extractCurrentGoalLoading(state),
  settingGoalLoading: extractSetGoalLoading(state)
});

export const mapDispatchToProps = {
  trySetCurrentGoal: setCurrentGoalRoutine,
  trySetCongratsShown: setCongratsShownRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoBlock);
