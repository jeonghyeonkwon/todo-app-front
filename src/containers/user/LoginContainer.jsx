import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/main/Login';
import { login } from '../../modules/auth';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';
const LoginContainer = ({ history }) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const dispatch = useDispatch();

  const { token, authError } = useSelector(({ auth }) => ({
    token: auth.user.token,
    authError: auth.authError,
  }));
  const onClickLogin = useCallback((e) => {
    e.preventDefault();
    const { username, password } = form;
    if ([username, password].includes('')) {
      alert('공백을 채워주세요');
      return;
    }
    dispatch(login(form));
  });
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  });
  useEffect(() => {
    if (authError) {
      alert('로그인에 실패하였습니다. 정보를 확인해 주세요');
      window.location.reload();
    }
    if (token) {
      try {
        localStorage.setItem('jwttoken', JSON.stringify(token));
        dispatch(check(token));
      } catch (e) {
        console.log('localStorage 작동을 하지 않습니다.');
      } finally {
        history.push('/');
      }
    }
  }, [token, authError]);
  return <Login onChange={onChange} onClickLogin={onClickLogin} form={form} />;
};

export default withRouter(LoginContainer);
