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
import { setCurrentGoalRoutine } from '@screens/MainPage/routines';
import GradientButton from '@components/buttons/GradientButton';
import AvatarWithGradient from '@components/avatar/AvatarWithBackground';
import { secondsFormatted } from '@screens/MainPage/containers/UserInfoBlock/seconds.helper';

interface IUserInfoBlockProps {
  student: IStudent;
  studentLoading: boolean;
  goals?: IPersonalGoalItem[];
  goalsLoading?: boolean;
  currentGoal?: IPersonalGoalProgress | undefined;
  currentGoalLoading?: boolean;
  settingGoalLoading?: boolean;
  trySetCurrentGoal?: (goalId: string) => void;
}

interface IDropdownItem {
  text: string;
  value: string;
}

const UserInfoBlock: React.FunctionComponent<IUserInfoBlockProps> = (
  {
    student: { firstName, job, avatar }, goals, currentGoal,
    currentGoalLoading, goalsLoading, settingGoalLoading, trySetCurrentGoal,
    studentLoading
  }
) => {
  const [goalItems, setGoalItems] = useState<IDropdownItem[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  useEffect(() => {
    setGoalItems(goals.map(g => ({
      text: g.name,
      value: g.id
    })) || []);
  }, [goals]);

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
                    <p className={styles.goalTitle}>Current goal progress</p>
                    <Popup
                      content={`Watched ${secondsFormatted(currentGoal.secondsDone)} of
                          ${secondsFormatted(currentGoal.secondsNeededOverall)}`}
                      trigger={(
                        <Progress
                          progress="percent"
                          value={currentGoal.percentsDone}
                          total={100}
                          className={styles.progressBar}
                          color="blue"
                          autoSuccess
                          size="medium"
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
              disabled={goalItems.length === 0}
              loading={goalsLoading}
              onChange={(_, { value }) => setSelectedGoalId(value as string)}
              value={selectedGoalId || ''}
              required
              clearable
            />
            <GradientButton
              type="submit"
              onClick={() => trySetCurrentGoal(selectedGoalId === '' ? undefined : selectedGoalId)}
              loading={settingGoalLoading}
              disabled={currentGoal?.goalId === selectedGoalId || goalsLoading}
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
  trySetCurrentGoal: setCurrentGoalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoBlock);
