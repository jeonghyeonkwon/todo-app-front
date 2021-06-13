import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Modal, Fade, TextField, Button, Backdrop } from '@material-ui/core';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: 500,
    padding: theme.spacing(2, 4, 3),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& > div': {
      textAlign: 'center',
    },
    '& > p': {
      border: '1px solid #eee',
      padding: '5px',
      display: 'block',
      overflow: 'auto',
      borderRadius: '5px',
      height: 300,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const StyledModal = ({
  setting,
  form,
  handleClose,
  onChangeDate,
  onChangeForm,
  onClickAchieve,
  onClickWrite,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={setting.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={setting.open}>
        {setting.cardId === 0 ? (
          <div className={classes.paper}>
            <h2 id="transition-modal-title">할 일 추가</h2>
            <TextField
              id="outlined-basic"
              label="제목"
              variant="outlined"
              fullWidth
              name="title"
              value={form.title}
              onChange={onChangeForm}
            />
            <TextField
              id="outlined-basic"
              label="내용"
              variant="outlined"
              fullWidth
              rows={8}
              multiline
              name="content"
              value={form.content}
              onChange={onChangeForm}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                label="목표까지 날짜(00시 기준으로 성공과 실패가 바뀝니다.)"
                value={form.goal}
                onChange={onChangeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>
            <div>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={onClickWrite}
              >
                추가하기
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                className={classes.button}
              >
                취소하기
              </Button>
            </div>
          </div>
        ) : (
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{setting.todoData.title}</h2>
            <span>
              {setting.todoData.createTodo} ~ {setting.todoData.goal}
            </span>
            <p>{setting.todoData.content}</p>
            <div>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleClose}
                className={classes.button}
              >
                닫기
              </Button>
              {setting.todoData.status === 'expected' ||
              setting.todoData.status === 'today' ? (
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={(e) => onClickAchieve(e, setting.todoData.id)}
                >
                  성공으로!!
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </Fade>
    </Modal>
  );
};

export default StyledModal;
