import React from 'react';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#a0d0bf',
    color: theme.palette.common.white,
    padding: 10,
    fontSize: 16,
    width: (props) => props.width,
    textAlign: (props) => props.align || 'left',
  },
  body: {
    padding: 5,
    fontSize: 14,
  },
}))(TableCell);

const BoardCell = ({ column, children, align }) => {
  return (
    <>
      {column ? (
        <StyledTableCell width={column.width} align={column.align}>
          {column.label}
        </StyledTableCell>
      ) : (
        <StyledTableCell align={align}>{children}</StyledTableCell>
      )}
    </>
  );
};

export default BoardCell;
