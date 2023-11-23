import { Status } from '../../createTaskForm/enums/status';

export type TaskCounterType =
  | Status.completed
  | Status.inProgress
  | Status.todo;

export interface ITaskCounter {
  count?: number;
  status?: TaskCounterType;
}
