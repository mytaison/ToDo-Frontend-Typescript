import React, { FC, ReactElement } from 'react';
import { TextField } from '@mui/material';
import { ITextField } from './interfaces/ITextField';
import PropTypes from 'prop-types';
export const TaskDescriptionField: FC<ITextField> = (props): ReactElement => {
  const { onChange = (e) => console.log(e.target.value), disabled = false } =
    props;
  return (
    <TextField
      id="description"
      label="Task Description"
      name="description"
      placeholder="Description"
      variant="outlined"
      size="small"
      multiline
      fullWidth
      rows={4}
      disabled={disabled}
      onChange={onChange}
    ></TextField>
  );
};

TaskDescriptionField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
