import React from 'react';
import styled from 'styled-components';
import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Loading from '../common/Loading';
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

const SearchResult = ({
  type,
  findId,
  onChange,
  onClickUpdatePw,
  newPassword,
  loading,
}) => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        {type === 'searchId' ? (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Typography variant="h4">아이디 찾기</Typography>
                <FindIdList>
                  <Typography variant="h5">검색된 아이디</Typography>
                  {findId.map((data) => (
                    <span>{data}</span>
                  ))}
                </FindIdList>
                <div className={classes.btng}>
                  <Button variant="contained" color="primary" href="/login">
                    로그인
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    href="/search/searchPw"
                  >
                    비밀번호 찾기
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <TextField
              label="새로운 비밀번호"
              type="password"
              onChange={onChange}
              name="newPw"
              value={newPassword.newPw}
            />
            <TextField
              label="새로운 비밀번호 재입력"
              type="password"
              onChange={onChange}
              name="reNewPw"
              value={newPassword.reNewPw}
            />
            <div className={classes.btng}>
              <Button
                variant="contained"
                color="primary"
                onClick={onClickUpdatePw}
              >
                비밀번호 변경하기
              </Button>
            </div>
          </>
        )}
      </Paper>
    </>
  );
};

export default SearchResult;
