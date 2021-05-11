import { Button, Paper, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
          <Button variant="contained" color="primary">
            아이디 찾기
          </Button>
          <Button variant="contained" color="secondary" href="/search/searchId">
            비밀번호 찾기
          </Button>
        </div>
      </Paper>
    </SearchIdComponent>
  );
};

export default SearchId;
