import React from 'react';
export interface ITaskFooter {
  onStatusChange?: (e: React.ChangeEvent<HTMLElement>) => void;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
  ) => void;
}
