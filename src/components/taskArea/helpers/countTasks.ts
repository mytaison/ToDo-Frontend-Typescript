import { ITaskAPI } from '../interfaces/ITaskAPI';
import { TaskCounterType } from '../../taskCounter/interfaces/ITaskCounter';

export const countTasks = (
  tasks: ITaskAPI[],
  status: TaskCounterType,
): number => {
  if (!Array.isArray(tasks)) {
    return 0;
  }
  const totalTasks = tasks.filter((task) => {
    return task.status === status;
  });
  return totalTasks.length;
};
