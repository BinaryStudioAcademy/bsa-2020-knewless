export interface IPersonalGoalItem {
  id: string;
  name: string;
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
}
