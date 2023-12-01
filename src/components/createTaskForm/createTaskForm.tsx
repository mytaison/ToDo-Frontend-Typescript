import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  useContext,
} from 'react';

import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/status';
import { Priority } from './enums/priority';
import { sendAPIRequest } from '../../helpers/sendAPIRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
  // Declare component states
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const taskUpdatedContext = useContext(TaskStatusChangedContext);

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (data: ICreateTask) => {
      return sendAPIRequest('http://localhost:3200/tasks', 'POST', data);
    },
  });

  function createTaskHandler() {
    if (!title || !description || !date) {
      return;
    }
    const task: ICreateTask = {
      title: title,
      description: description,
      date: date.toString(),
      status: status,
      priority: priority,
    };
    createTaskMutation.mutate(task);
  }

  // Managing Side Effects
  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      taskUpdatedContext.toggle();
    }
    const successTimeout = setTimeout(() => setShowSuccess(false), 5000);
    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      width={'100%'}
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          Task has been created successfully.
        </Alert>
      )}
      <Typography mb={2} component={'h2'} variant="h6">
        Create A Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          disabled={createTaskMutation.isPending}
        ></TaskTitleField>
        <TaskDescriptionField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          disabled={createTaskMutation.isPending}
        ></TaskDescriptionField>
        <TaskDateField
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
          disabled={createTaskMutation.isPending}
        ></TaskDateField>
        <Stack sx={{ width: '100%' }} direction="row" spacing={2}>
          <TaskSelectField
            label="Status"
            name="status"
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as string);
            }}
            disabled={createTaskMutation.isPending}
          ></TaskSelectField>
          <TaskSelectField
            label="Priority"
            name="priority"
            items={[
              {
                value: Priority.high,
                label: Priority.high.toUpperCase(),
              },
              {
                value: Priority.normal,
                label: Priority.normal.toUpperCase(),
              },
              {
                value: Priority.low,
                label: Priority.low.toUpperCase(),
              },
            ]}
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value as string);
            }}
            disabled={createTaskMutation.isPending}
          ></TaskSelectField>
        </Stack>
        {createTaskMutation.isPending && <LinearProgress></LinearProgress>}
        <Button
          disabled={
            !title ||
            !description ||
            !date ||
            !status ||
            !priority ||
            createTaskMutation.isPending
          }
          variant="contained"
          size="large"
          fullWidth
          onClick={createTaskHandler}
        >
          Create A Task
        </Button>
      </Stack>
    </Box>
  );
};
