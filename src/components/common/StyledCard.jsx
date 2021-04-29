import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
  root: {
    border: '1px solid #c7c3c3',
    margin: 5,
    width: 300,
    height: 220,
    display: 'inline-block',
    position: 'relative',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  contents: {
    width: '100%',
    display: 'block',
    height: 70,
    overflow: 'hidden',
  },
  button: {
    position: 'absolute',
    left: 15,
    bottom: 5,
  },
}));
const font = {
  expected: {
    text: '진행중',
    color: 'initial',
  },
  failure: {
    text: '실패',
    color: 'error',
  },
  achieve: {
    text: '성공',
    color: 'primary',
  },
  today: {
    text: '오늘 마감',
    color: 'secondary',
  },
};
const StyledCard = ({ data, status, kind, handleOpen }) => {
  const classes = useStyles();

  return (
    <>
      {kind ? (
        <Card className={classes.root} key={data.id}>
          <CardContent>
            <Typography
              className={classes.title}
              color={font[status].color}
              gutterBottom
            >
              {font[status].text}
            </Typography>
            <Typography variant="h5" component="h2">
              {data.title.length > 15
                ? `${data.title.slice(0, 11)}...`
                : data.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {data.createTodo}~{data.goal}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={classes.contents}
            >
              {data.content.length > 60
                ? `${data.content.slice(0, 57)}...`
                : data.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => handleOpen(data.id, data)}
              className={classes.button}
              color="primary"
            >
              자세히
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card className={classes.root}>
          <Button
            style={{
              background: '#979696',
              width: '100%',
              height: '100%',
              color: '#fff',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
            onClick={() => handleOpen(0)}
          >
            <AddIcon style={{ fontSize: '45px' }} />
            Add Todo
          </Button>
        </Card>
      )}
    </>
  );
};

export default StyledCard;
