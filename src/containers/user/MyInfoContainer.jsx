import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyInfo from '../../components/main/MyInfo';
import { localList, LOCAL } from '../../modules/common';
import { fetchUser, INFO, updateUser } from '../../modules/auth';
const MyInfoContainer = () => {
  const dispatch = useDispatch();
  const { local, info, localLoading, infoLoading, success, error } =
    useSelector(({ common, loading, auth }) => ({
      local: common.local,
      localLoading: loading[LOCAL],
      info: auth.info,
      infoLoading: loading[INFO],
      success: auth.update.success,
      error: auth.update.error,
    }));
  const [form, setForm] = useState({
    currentPw: '',
    newPw: '',
    reNewPw: '',
    name: '',
    local: '',
    withDrawalPw: '',
  });
  useEffect(() => {
    if (success) {
      alert('수정이 완료되었습니다.');
      window.location.reload();
    }
    if (error) {
      alert('에러가 발생했습니다. 다시 시도해 주세요');
      window.location.reload();
    }
  }, [success, error]);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!local.length) dispatch(localList());
    dispatch(fetchUser());
  }, []);

  const onChangePanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    setForm({
      ...form,
      currentPw: '',
      newPw: '',
      reNewPw: '',
      tel: '',
      name: '',
      local: '',
      withDrawalPw: '',
    });
  }, [expanded]);
  const handleChangeForm = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onClickUpdate = (e, updateName) => {
    e.preventDefault();
    const { currentPw, newPw, reNewPw, name, tel, local } = form;
    switch (updateName) {
      case 'password':
        if (!currentPw || !newPw || !reNewPw) {
          alert('빈 공간을 채워주세요');
          return;
        }

        if (newPw !== reNewPw) {
          alert('새로운 비밀번호와 새로운 비밀번호가 일치하지 않습니다.');
          return;
        }
        break;
      case 'name':
        if (!name) {
          alert('빈 공간을 채워주세요');
          return;
        }
        break;
      case 'tel':
        if (!tel) {
          alert('빈 공간을 채워주세요');
          return;
        }
        break;
      case 'local':
        if (!local) {
          alert('지역을 채워주세요');
          return;
        }
        break;
    }
    dispatch(updateUser(info.id, updateName, form));
  };
  const onClickDelete = (e) => {
    e.preventDefault();
  };
  return (
    <MyInfo
      local={local}
      info={info}
      loading={infoLoading || localLoading}
      expanded={expanded}
      onChangePanel={onChangePanel}
      handleChangeForm={handleChangeForm}
      form={form}
      onClickUpdate={onClickUpdate}
      onClickDelete={onClickDelete}
    />
  );
};

export default MyInfoContainer;
