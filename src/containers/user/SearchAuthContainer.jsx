import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  findId,
  findPw,
  searchMessage,
  updatePassword,
  SEARCHID,
  SEARCHPW,
  initialize,
} from '../../modules/auth';
import SearchResult from '../../components/main/SearchResult';
import Search from '../../components/main/Search';

const SearchAuthContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const {
    searchId,
    searchPw,
    msg,
    updateAuth,
    updateAuthError,
    idLoading,
    pwLoading,
  } = useSelector(({ auth, loading }) => ({
    idLoading: loading[SEARCHID],
    pwLoading: loading[SEARCHPW],
    searchId: auth.search.searchId,
    searchPw: auth.search.searchPw,
    msg: auth.search.msg,
    updateAuth: auth.search.updateAuth,
    updateAuthError: auth.search.updateAuthError,
  }));
  const section = location.pathname.split('/')[2];
  useEffect(() => {
    console.log(`section : ${section}`);
  }, [section]);
  const [form, setForm] = useState({
    accountId: '',
    accountName: '',
    tel: '',
  });
  const [newPassword, setNewPassword] = useState({
    id: 0,
    newPw: '',
    reNewPw: '',
  });
  useEffect(() => {
    if (updateAuth) {
      alert('비밀번호 변경이 완료되었습니다');
      history.push('/');
      window.location.reload();
    }
    if (updateAuthError) {
      alert('비밀번호 변경에 오류가 생겼습니다. 다시 시도 해 주세요');
      window.location.reload();
    }
  }, [updateAuth, updateAuthError]);
  useEffect(() => {
    if (searchPw) {
      setNewPassword({
        ...newPassword,
        id: searchPw,
      });
    }
  }, [searchPw]);
  useEffect(() => {
    return dispatch(initialize());
  }, []);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  });
  const onChangeUpdate = useCallback((e) => {
    const { name, value } = e.target;

    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  });
  const onClickUpdatePw = useCallback(
    (e) => {
      e.preventDefault();
      const { newPw, reNewPw } = newPassword;
      console.log(`newPw ${newPw} reNewPw ${reNewPw}`);
      if (newPw !== reNewPw) {
        alert('비밀번호가 서로 다릅니다.');
        return;
      }
      if ([newPw, reNewPw].includes('')) {
        alert('공백을 채워주세요.');
        return;
      }
      dispatch(updatePassword(newPassword));
    },
    [onChangeUpdate],
  );
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const { accountId, accountName, tel } = form;
    if (section === 'searchId') {
      if ([accountName, tel].includes('')) {
        dispatch(searchMessage('공백을 채워주세요'));
        return;
      }
    } else {
      if ([accountId, accountName, tel].includes('')) {
        dispatch(searchMessage('공백을 채워주세요'));
        return;
      }
    }
    section === 'searchId' ? dispatch(findId(form)) : dispatch(findPw(form));
  });

  return (
    <>
      {searchId.length === 0 && searchPw === 0 ? (
        <Search
          type={section}
          onChange={onChange}
          form={form}
          onSubmit={onSubmit}
          msg={msg}
        />
      ) : (
        <>
          <SearchResult
            type={section}
            findId={searchId}
            loading={section === 'searchId' ? idLoading : pwLoading}
            newPassword={newPassword}
            onChange={onChangeUpdate}
            onClickUpdatePw={onClickUpdatePw}
          />
        </>
      )}
    </>
  );
};

export default withRouter(SearchAuthContainer);
