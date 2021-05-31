import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from '../../components/main/SignUp';
import { withRouter } from 'react-router-dom';
import {
  localList,
  changeField,
  idCheck,
  registerUser,
  initialize,
  CONST_LOCALLIST,
} from '../../modules/register';
const RegisterContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { local, loading, form, msg, auth, authError } = useSelector(
    ({ register, loading }) => ({
      local: register.localList,
      loading: loading[CONST_LOCALLIST],
      form: register.form,
      msg: register.msg,
      auth: register.auth,
      authError: register.authError,
    }),
  );
  //입력 폼 변경시
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'accountId') {
      dispatch(
        changeField({
          key: name,
          value,
        }),
      );
      dispatch(
        changeField({
          key: 'validateCheck',
          value: false,
        }),
      );
    } else {
      dispatch(
        changeField({
          key: name,
          value,
        }),
      );
    }
  });
  //아이디 중복 체크
  const onClickIdCheck = useCallback((e) => {
    e.preventDefault();
    const { accountId } = form;
    if (accountId === '') {
      alert('아이디를 입력하세요');
      return;
    }
    console.log(e);
    dispatch(idCheck(accountId));
  });
  const onSubmitRegister = useCallback((e) => {
    e.preventDefault();
    const { accountId, password, rePassword, name, validateCheck } = form;
    if ([accountId, password, rePassword, name].includes('')) {
      alert('공백을 채워주세요');
      return;
    }
    if (password !== rePassword) {
      alert('비밀번호가 서로 일치하지 않습니다.');
      return;
    }
    if (!validateCheck) {
      alert('아이디 중복 체크를 해주세요');
      return;
    }
    dispatch(registerUser(form));
  });
  useEffect(() => {
    if (authError) {
      alert('회원가입에 실패하였습니다. 다시 시도해 주세요');
      window.location.reload();
    }
    if (auth) {
      alert('회원 가입 성공!');

      history.push('/login');
      return dispatch(initialize());
    }
  }, [auth, authError, dispatch]);
  useEffect(() => {
    dispatch(localList());
  }, []);
  return (
    <SignUp
      local={local}
      loading={loading}
      form={form}
      onChange={onChange}
      onClickIdCheck={onClickIdCheck}
      message={msg}
      onSubmitRegister={onSubmitRegister}
    />
  );
};

export default withRouter(RegisterContainer);
