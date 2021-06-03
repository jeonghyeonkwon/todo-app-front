import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TableContainer, Table, Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  table: {
    minWith: 650,
  },
}));
const Board = ({ children }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {children}
      </Table>
    </TableContainer>
  );
};

export default Board;
