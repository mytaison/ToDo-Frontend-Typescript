import { TaskCounterType } from '../interfaces/ITaskCounter';
import { Status } from '../../createTaskForm/enums/status';

export const emitCorrectBorderColor = (status: TaskCounterType): string => {
  switch (status) {
    case Status.todo:
      return 'error.light';
    case Status.inProgress:
      return 'warning.light';
    case Status.completed:
      return 'success.light';
    default:
      return 'gray.900';
  }
};
