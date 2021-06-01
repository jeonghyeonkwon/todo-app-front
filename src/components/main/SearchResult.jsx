import React from 'react';
import styled from 'styled-components';
import { Button, Paper, TextField } from '@material-ui/core';
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
const FindIdList = styled.div`
  background: #d1e7fb;
  width: 100%;
  padding: 50px;
  span {
    display: block;
    color: green;
    font-size: 20px;
    font-weight: 400;
  }
`;
const SearchResultComponent = styled.div`
  flex: 4;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const SearchResult = ({ type, findId, findPw }) => {
  const classes = useStyles();
  return (
    <SearchResultComponent>
      <Paper elevation={3} className={classes.paper}>
        {type === 'searchId' ? (
          <>
            <Typography variant="h4">아이디 찾기</Typography>
            <FindIdList>
              <Typography variant="h5">검색된 아이디</Typography>
              {findId.map((data) => (
                <span>{data}</span>
              ))}
            </FindIdList>
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
      </Paper>
    </SearchResultComponent>
  );
};

export default SearchResult;
