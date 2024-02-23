export type STATS = {
  title: string;
  _id: string;
  amount: number;
  sub: string;
  description: string;
};

export type TASK_METRICS = {
  perChangeDiffInBugs: number;
  perChangeDiggInStories: number;
  perChangeDiffInTotal: number;
  totalCompleted: number;
  offset: number;
  bugsCompleted: number;
  storiesCompleted: number;
}

