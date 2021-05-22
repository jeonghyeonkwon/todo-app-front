import { Button, Paper, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 30,
    width: 500,

    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: 30,
    },
  },
  btng: {
    textAlign: 'center',
    '& > .MuiButton-root': {
      margin: 20,
    },
  },
}));
const SearchPwComponent = styled.div`
  flex: 4;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const SearchPw = ({ history }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    accountId: '',
    accountName: '',
    tel: '',
  });
  const [newPassword, setNewPassword] = useState({
    id: null,
    newPw: '',
    reNewPw: '',
  });
  const [checkId, setCheckId] = useState(null);

  const onClickSearch = async (e) => {
    e.preventDefault();
    const { accountId, accountName, tel } = form;
    console.log(`몇자리 ${tel.length}`);
    if (!accountId || !accountName || !tel) {
      alert('빈 공백을 채워주세요');
      return;
    } else if (tel.length < 10 || tel.length > 14) {
      alert('전화번호를 10자리 이상 13자리 이하로 입력하세요');
      return;
    }
    await axios
      .get(
        `http://localhost:8080/api/search-pw?accountId=${form.accountId}&accountName=${form.accountName}&tel=${form.tel}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setCheckId(res.data);
          setNewPassword({
            ...newPassword,
            id: res.data,
          });
        }
      })
      .catch((e) => {
        if (e.response.status === 404) {
          alert(e.response.data);
          window.location.reload();
        }
      });
  };
  const onClickUpdatePw = async (e) => {
    e.preventDefault();
    const { newPw, reNewPw } = newPassword;
    console.log(newPassword);
    if (!newPw || !reNewPw) {
      alert('공백을 채워주세요');
      return;
    } else if (newPw !== reNewPw) {
      alert('새로운 비밀번호와 재입력이 일치하지 않습니다');
      return;
    }
    await axios
      .patch(`http://localhost:8080/api/search-pw/${checkId}`, newPassword)
      .then((res) => {
        if (res.status === 200) {
          alert('비밀번호 변경이 완료되었습니다.');
          history.push('/login');
        }
      })
      .catch((e) => {
        alert('정보 수정에 오류가 발생했습니다. 다시 시도해 주세요');
        window.location.reload();
      });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === 'tel' && form.tel.length > 12) {
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const onChangePassword = (e) => {
    const { value, name } = e.target;
    console.log(newPassword);
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };
  //전화번호 하이픈
  useEffect(() => {
    console.log(form.tel);
    if (form.tel.length === 10) {
      console.log('10자리 도달', form.tel);
      setForm({
        ...form,
        tel: form.tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      });
    }
    if (form.tel.length === 13) {
      console.log('13자리 도달', form.tel);
      setForm({
        ...form,
        tel: form.tel
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    }
  }, [form.tel]);
  return (
    <SearchPwComponent>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4">비밀번호 찾기</Typography>
        {!checkId ? (
          <>
            <TextField
              label="아이디"
              onChange={onChange}
              name="accountId"
              value={form.accountId}
            />
            <TextField
              label="이름"
              onChange={onChange}
              name="accountName"
              value={form.accountName}
            />
            <TextField
              label="전화번호"
              onChange={onChange}
              name="tel"
              value={form.tel}
            />
          </>
        ) : (
          <>
            <TextField
              label="새로운 비밀번호"
              type="password"
              onChange={onChangePassword}
              name="newPw"
              value={newPassword.newPw}
            />
            <TextField
              label="새로운 비밀번호 재입력"
              type="password"
              onChange={onChangePassword}
              name="reNewPw"
              value={newPassword.reNewPw}
            />
          </>
        )}

        <div className={classes.btng}>
          {checkId ? (
            <Button
              variant="contained"
              color="primary"
              onClick={onClickUpdatePw}
            >
              비밀번호 변경하기
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={onClickSearch}>
              비밀번호 찾기
            </Button>
          )}

          <Button variant="contained" color="secondary" href="/search/searchId">
            아이디 찾기
          </Button>
        </div>
      </Paper>
    </SearchPwComponent>
  );
};

export default withRouter(SearchPw);
