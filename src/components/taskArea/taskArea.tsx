import { Grid, Box, Alert, LinearProgress } from '@mui/material';
import React, { FC, ReactElement, useContext, useEffect } from 'react';
import format from 'date-fns/format';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../createTaskForm/task/task';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sendAPIRequest } from '../../helpers/sendAPIRequest';
import { ITaskAPI } from './interfaces/ITaskAPI';
import { Status } from '../createTaskForm/enums/status';
import { IUpdateTask } from './interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
  const taskUpdatedContext = useContext(TaskStatusChangedContext);

  const { error, isPending, data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      return await sendAPIRequest<ITaskAPI[]>(
        'http://localhost:3200/tasks',
        'GET',
      );
    },
  });

  // Update Task Mutation
  const updateTaskMutation = useMutation({
    mutationFn: (data: IUpdateTask) => {
      return sendAPIRequest('http://localhost:3200/tasks', 'PUT', data);
    },
  });

  // Side Effects
  useEffect(() => {
    refetch();
    console.log('Refetching');
  }, [taskUpdatedContext.updated]);
  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      console.log('Success');
      taskUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }

  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({ id, status: Status.completed });
  }

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status Of Your Tasks As On {format(new Date(), 'PPPP')}</h2>
      </Box>
      <Grid container display={'flex'} justifyContent={'center'}>
        <Grid
          item
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            status={Status.todo}
            count={data ? countTasks(data, Status.todo) : undefined}
          ></TaskCounter>
          <TaskCounter
            status={Status.inProgress}
            count={data ? countTasks(data, Status.inProgress) : undefined}
          ></TaskCounter>
          <TaskCounter
            status={Status.completed}
            count={data ? countTasks(data, Status.completed) : undefined}
          ></TaskCounter>
        </Grid>
        <Grid item display={'flex'} flexDirection={'column'} xs={10} md={8}>
          {error && (
            <Alert severity="error">
              There was an error fetching the tasks.
            </Alert>
          )}
          {!error && Array.isArray(data) && data.length === 0 && (
            <Alert severity="warning">No task has been created.</Alert>
          )}
          {isPending ? (
            <LinearProgress></LinearProgress>
          ) : (
            Array.isArray(data) &&
            data.length > 0 &&
            data.map((task, index) => {
              return task.status !== Status.completed ? (
                <Task
                  key={index}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  date={new Date(task.date)}
                  status={task.status}
                  priority={task.priority}
                  onStatusChange={onStatusChangeHandler}
                  onClick={markCompleteHandler}
                ></Task>
              ) : (
                false
              );
            })
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
