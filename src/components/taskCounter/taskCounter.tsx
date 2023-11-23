import { Avatar, Box, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { ITaskCounter } from './interfaces/ITaskCounter';
import { Status } from '../createTaskForm/enums/status';
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';
import PropTypes from 'prop-types';

export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
  const { count = 0, status = Status.completed } = props;
  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Avatar
          sx={{
            backgroundColor: 'transparent',
            border: '5px solid',
            width: '96px',
            height: '96px',
            marginBottom: '16px',
            borderColor: `${emitCorrectBorderColor(status)}`,
          }}
        >
          <Typography
            color={'#fff'}
            fontWeight={'bold'}
            fontSize={'20px'}
            variant="h5"
          >
            {count}
          </Typography>
        </Avatar>
        <Typography>{emitCorrectLabel(status)}</Typography>
      </Box>
    </>
  );
};
TaskCounter.propTypes = {
  count: PropTypes.number,
  status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.completed]),
};
