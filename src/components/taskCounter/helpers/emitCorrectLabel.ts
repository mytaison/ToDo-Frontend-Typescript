import { TaskCounterType } from '../interfaces/ITaskCounter';
import { Status } from '../../createTaskForm/enums/status';

export const emitCorrectLabel = (status: TaskCounterType): string => {
  switch (status) {
    case Status.todo:
      return 'To Do';
    case Status.inProgress:
      return 'In Progress';
    case Status.completed:
      return 'Completed';
    default:
      return '';
  }
};
