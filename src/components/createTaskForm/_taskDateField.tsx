import React, { FC, ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { IDateField } from './interfaces/IDateField';
import PropTypes from 'prop-types';

export const TaskDateField: FC<IDateField> = (props): ReactElement => {
  // Destructure Props
  const {
    value = new Date(),
    disabled = false,
    onChange = (date) => console.log(date),
  } = props;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Task Date"
          format="dd/MM/yyyy"
          value={value}
          disabled={disabled}
          onChange={onChange}
        ></DesktopDatePicker>
      </LocalizationProvider>
    </>
  );
};
TaskDateField.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date),
};
