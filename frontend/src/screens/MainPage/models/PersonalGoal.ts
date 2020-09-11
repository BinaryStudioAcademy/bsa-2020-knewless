export interface IPersonalGoalItem {
  id: string;
  name: string;
  durationSeconds: number;
}

export interface IPersonalGoalProgress {
  goalId: string;
  goalName: string;
  percentsDone: number;
  secondsDone: number;
  secondsLeft: number;
  secondsNeededOverall: number;
  goalStarted: string;
  goalExpires: string;
  done: boolean;
  congratulationShown: boolean;
}
