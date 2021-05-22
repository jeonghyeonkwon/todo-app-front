import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../modules/auth';
import { check } from '../../modules/user';
const Support = styled.div`
  margin-top: 30px;

  label {
    font-size: 14px;
    display: block;
  }
  div {
    text-align: right;
    a {
      display: inline-block;
      margin-top: 5px;
      font-size: 19px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: dodgerblue;
      }
    }
  }
`;
const BtnGroup = styled.div`
  margin-top: 40px;
  button {
    display: block;
    width: 100%;
    margin: 10px 5px 10px 0px;
    outline: none;
    font-size: 20px;
    padding: 5px;
    border-radius: 5px;
    &[type='submit'] {
      background: rgb(205, 224, 246);
    }
  }
`;
const Field = styled.div`
  label {
    display: block;
    font-weight: bold;
    font-size: 20px;
    margin-top: 20px;
  }
  input {
    margin-top: 10px;
    width: 100%;
    font-size: 20px;
    transition: 0.5s;
    &:focus {
      outline-color: dodgerblue;
    }
  }
`;
const LoginForm = styled.form`
  width: 350px;
  height: 600px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.3);
`;
const LoginComponent = styled.div`
  flex: 4;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const Login = ({ history }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const { token, authError } = useSelector(({ auth }) => ({
    token: auth.auth.token,

    authError: auth.authError,
  }));
  useEffect(() => {
    //console.log(token);
    if (token) {
      //console.log(`token : ${token}`);
      try {
        localStorage.setItem('jwttoken', JSON.stringify(token));
        dispatch(check(token));
      } catch (e) {
        console.log('localStorage 작동을 하지 않습니다.');
      } finally {
        history.push('/');
      }
    }
    if (authError) {
      //console.log(`authError : ${authError} `);
      alert('로그인에 실패하였습니다. 다시 확인해 주세요.');
      window.location.reload();
    }
  }, [token, authError]);
  const loginHandler = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <LoginComponent>
      <LoginForm>
        <h1>로그인</h1>
        <Field>
          <label>아이디</label>
          <input
            type="text"
            value={form.username}
            name="username"
            onChange={onChange}
          ></input>
        </Field>
        <Field>
          <label>비밀번호</label>
          <input
            type="password"
            value={form.password}
            name="password"
            onChange={onChange}
          ></input>
        </Field>
        <Support>
          <label>회원가입 정보가 기억나지 않나요???</label>
          <div>
            <Link to="/search/searchId">아이디 찾기</Link>
            <b>/</b>
            <Link to="/search/searchPw">비밀번호 찾기</Link>
          </div>
        </Support>
        <BtnGroup>
          <button type="submit" onClick={loginHandler}>
            로그인
          </button>
          <button type="button">회원가입</button>
        </BtnGroup>
      </LoginForm>
    </LoginComponent>
  );
};

export default withRouter(Login);
