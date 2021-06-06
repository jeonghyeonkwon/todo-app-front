import React from 'react';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#a0d0bf',
    color: theme.palette.common.white,
    padding: 10,
    fontSize: 16,
  },
  body: {
    padding: 5,
    fontSize: 14,
    '& > a:hover': {
      color: 'dodgerblue',
      transition: '0.3s',
    },
  },
  width: (props) => props.width,
  textAlign: (props) => props.align || 'left',
  colSpan: (props) => props.colSpan || 1,
}))(TableCell);

const BoardCell = ({ column, children, align, colSpan }) => {
  return (
    <>
      {column ? (
        <StyledTableCell width={column.width} align={column.align}>
          {column.label}
        </StyledTableCell>
      ) : (
        <StyledTableCell align={align} colSpan={colSpan}>
          {children}
        </StyledTableCell>
      )}
    </>
  );
};

export default BoardCell;
