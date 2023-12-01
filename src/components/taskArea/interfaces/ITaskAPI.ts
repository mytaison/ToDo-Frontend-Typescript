import { Priority } from '../../createTaskForm/enums/priority';
import { Status } from '../../createTaskForm/enums/status';

export interface ITaskAPI {
  id: string;
  date: string;
  title: string;
  description: string;
  status: Status.todo | Status.inProgress | Status.completed;
  priority: `${Priority}`; // Union of Priority.low,normal,high
}
