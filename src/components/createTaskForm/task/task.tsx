import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import { ITask } from './interfaces/ITask';
import { Status } from '../enums/status';
import { Priority } from '../enums/priority';
import PropTypes from 'prop-types';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderClass';

export const Task: FC<ITask> = (props): ReactElement => {
  const {
    priority = Priority.normal,
    status = Status.todo,
    title = 'Title of the Task',
    date = new Date(),
    description = 'Task Description',
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;
  return (
    <Box
      display={'flex'}
      width={'100%'}
      justifyContent={'flex-start'}
      flexDirection={'column'}
      mb={4}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date}></TaskHeader>
      <TaskDescription description={description}></TaskDescription>
      <TaskFooter
        onClick={onClick}
        onStatusChange={onStatusChange}
      ></TaskFooter>
    </Box>
  );
};
Task.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  priority: PropTypes.string,
  status: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
};
