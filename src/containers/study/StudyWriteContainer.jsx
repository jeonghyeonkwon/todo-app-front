import React, { useState, useCallback, useEffect } from 'react';
import CreateBoard from '../../components/main/CreateBoard';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { studyWrite, initialize } from '../../modules/study';

const StudyWriteContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const { id, write, error } = useSelector(({ user, study }) => ({
    id: user.account.id,
    write: study.write,
    error: study.error.write,
  }));
  const skill = location.pathname.split('/')[2];
  const [form, setForm] = useState({
    title: '',
    contents: '',
    applicant: 0,
    programmingType: [],
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'applicant' && value < 0) {
      setForm({
        ...form,
        applicant: 0,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
    console.log('form change');
    console.log(form);
  };
  const onChangeType = (e, v) => {
    if (v.length > 2) {
      const [trash, ...val] = v;
      setForm({ ...form, programmingType: [...val] });
    } else {
      setForm({ ...form, programmingType: [...v] });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      alert('로그인후 이용해 주세요');
      return;
    }
    const { title, contents, programmingType } = form;
    if ([title, contents].includes('')) {
      alert('공백을 채워주세요');
      return;
    } else if (programmingType.length === 0) {
      alert('기술유형을 1~2개 넣어 주세요');
      return;
    }
    dispatch(studyWrite(id, 'study', skill, form));
  };
  useEffect(() => {
    if (write) {
      alert('게시글 작성에 완료했습니다.');
      history.push('/');
      window.location.reload();
    }
    if (error) {
      alert('게시글 작성에 실패 했습니다. 다시 시도해 주세요');
      window.location.reload();
    }
  }, [write, error]);
  const onClickBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  useEffect(() => {
    return () => dispatch(initialize());
  }, []);
  return (
    <CreateBoard
      boardType="study"
      skill={skill}
      onChange={onChange}
      onChangeType={onChangeType}
      form={form}
      onSubmit={onSubmit}
      onClickBack={onClickBack}
    />
  );
};
export default withRouter(StudyWriteContainer);
