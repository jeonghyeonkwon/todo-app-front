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
const StyledModal = ({ handleClose, open, cardId, data }) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 할일 추가 상태
  const [form, setForm] = useState({
    title: '',
    content: '',
    goal: '',
  });
  //목표까지 날짜
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setForm({
      ...form,
      goal: date,
    });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    setForm({
      ...form,
      goal: selectedDate,
    });
  }, selectedDate);

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onClickSuccess = async (e) => {
    e.preventDefault();

    const response = (token) =>
      axios.patch(`http://localhost:8080/api/todo/${data.id}`, data.id, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
        },
      });
    try {
      const token = localStorage.getItem('jwttoken');

      await response(token)
        .then((res) => {
          if (res.status === 200) {
            alert('성공 처리 완료되었습니다.');
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
          alert('작성 중 에러가 발생했습니다 다시 시도해 주세요');
          window.location.reload();
        });
    } catch (e) {
      alert('로그인에 문제가 있습니다. 다시 로그인해 주세요.');
    }
  };
  const onClickCreate = async (e) => {
    e.preventDefault();
    const { title, content } = form;
    if (!title || !content) {
      alert('내용을 채워주세요.');
      return;
    }

    const response = (token) =>
      axios.post(`http://localhost:8080/api/todo`, form, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token.replace(/\"/gi, '')}`,
        },
      });
    try {
      const token = localStorage.getItem('jwttoken');

      await response(token)
        .then((res) => {
          if (res.status === 201) {
            alert('할일을 추가 완료되었습니다.');
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
          alert('작성 중 에러가 발생했습니다 다시 시도해 주세요');
          window.location.reload();
        });
    } catch (e) {
      alert('로그인에 문제가 있습니다. 다시 로그인해 주세요.');
    }
  };

  return (
    <>
      {/* 할일 추가 */}
      {cardId === 0 ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">할 일 추가</h2>
              <TextField
                id="outlined-basic"
                label="제목"
                variant="outlined"
                fullWidth
                name="title"
                value={form.title}
                onChange={onChange}
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
                onChange={onChange}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="목표까지 날짜(00시 기준으로 성공과 실패가 바뀝니다.)"
                  value={selectedDate}
                  onChange={handleDateChange}
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
                  onClick={onClickCreate}
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
          </Fade>
        </Modal>
      ) : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">{data.title}</h2>
              <span>
                {data.createTodo} ~ {data.goal}
              </span>
              <p>{data.content}</p>
              <div>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleClose}
                  className={classes.button}
                >
                  닫기
                </Button>
                {data.status == 'expected' ||
                  (data.status === 'today' && (
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.button}
                      onClick={onClickSuccess}
                    >
                      성공으로!!
                    </Button>
                  ))}
              </div>
            </div>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default StyledModal;
