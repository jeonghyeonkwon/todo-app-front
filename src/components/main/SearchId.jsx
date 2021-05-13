import { Button, Paper, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import axios from 'axios';
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
const SearchIdComponent = styled.div`
  flex: 4;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const SearchId = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    accountName: '',
    tel: '',
  });
  const onClickSearch = async (e) => {
    e.preventDefault();
    const { accountName, tel } = form;
    console.log(`몇자리 ${tel.length}`);
    if (!accountName || !tel) {
      alert('빈 공백을 채워주세요');
      return;
    } else if (tel.length < 10 || tel.length > 14) {
      alert('전화번호를 10자리 이상 13자리 이하로 입력하세요');
      return;
    }
    await axios
      .post('http://localhost:8080/api/search-id', form)
      .then((res) => {
        if (res.status === 200) {
        }
      })
      .catch((e) => {
        alert(e.response.data.message);
        window.location.reload();
      });
  };
  const onChange = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
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
    <SearchIdComponent>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4">아이디 찾기</Typography>

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
        <div className={classes.btng}>
          <Button variant="contained" color="primary" onClick={onClickSearch}>
            아이디 찾기
          </Button>
          <Button variant="contained" color="secondary" href="/search/searchPw">
            비밀번호 찾기
          </Button>
        </div>
      </Paper>
    </SearchIdComponent>
  );
};

export default SearchId;
