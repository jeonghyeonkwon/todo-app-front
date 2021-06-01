import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  text-align: center;
  a,
  button {
    display: block;
    width: 100%;
    margin: 10px 5px 10px 0px;
    outline: none;
    cursor: pointer;
    font-size: 20px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    transition: 0.5s;
    &:hover {
      color: #fff;
    }
    &[type='submit'] {
      background: rgb(205, 224, 246);
    }
    &[type='submit']:hover {
      background: rgb(59, 89, 152);
    }
  }
  a:hover {
    background: gray;
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
const Login = ({ onChange, onClickLogin, form }) => {
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
          <button type="submit" onClick={onClickLogin}>
            로그인
          </button>
          <Link to="/register">회원가입</Link>
        </BtnGroup>
      </LoginForm>
    </LoginComponent>
  );
};

export default Login;
