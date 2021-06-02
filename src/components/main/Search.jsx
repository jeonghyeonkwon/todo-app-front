import React from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 30,
    width: 500,
    height: (props) => props,
    position: 'relative',
    '& > .MuiTextField-root': {
      width: '100%',
      marginTop: 30,
    },
  },
  btng: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,

    textAlign: 'center',
    '& > .MuiButton-root': {
      margin: 20,
    },
  },
}));
const SearchComponent = styled.div`
  flex: 4;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const MessageAlert = styled.div`
  color: crimson;
  width: 100%;
  padding: 5px;
  text-align: center;
  margin-top: 20px;
`;

const titleType = {
  searchId: '아이디 찾기',
  searchPw: '비밀번호 찾기',
};
const props = { searchId: 400, searchPw: 500 };
const Search = ({ type, onChange, form, onSubmit, msg }) => {
  const classes = useStyles(props[type]);

  return (
    <SearchComponent>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4">{titleType[type]}</Typography>

        {type === 'searchPw' && (
          <TextField
            label="아이디"
            onChange={onChange}
            name="accountId"
            value={form.accountId}
          />
        )}
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
        {msg && <MessageAlert>{msg}</MessageAlert>}
        {type === 'searchId' ? (
          <div className={classes.btng}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              아이디 찾기
            </Button>
            <Button
              variant="contained"
              color="secondary"
              href="/search/searchPw"
            >
              비밀번호 찾기
            </Button>
          </div>
        ) : (
          <div className={classes.btng}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              비밀번호 찾기
            </Button>
            <Button
              variant="contained"
              color="secondary"
              href="/search/searchId"
            >
              아이디 찾기
            </Button>
          </div>
        )}
      </Paper>
    </SearchComponent>
  );
};

export default Search;
