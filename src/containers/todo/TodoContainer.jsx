import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  LIST,
  fetchTodo,
  achieveTodo,
  writeTodo,
  initialize,
} from '../../modules/todo';
import { Pagination } from '@material-ui/lab';
import StyledModal from '../../components/common/StyledModal';
import styled from 'styled-components';

import TodoTab from '../../components/main/TodoTab';
import StyledCard from '../../components/common/StyledCard';

const PagenationForm = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TodoContainer = () => {
  const [setting, setSetting] = useState({
    tab: 0,
    open: false,
    page: 0,
    cardId: 0,
    todoData: {},
  });

  //----------------------------페이지----------------------------
  const dispatch = useDispatch();
  const {
    accountId,
    list,
    todoError,
    todoLoading,
    achieveSuccess,
    achieveError,
    writeSuccess,
    writeError,
  } = useSelector(({ user, todo, loading }) => ({
    accountId: user.account.id,
    list: todo.list,
    todoError: todo.error.list,
    todoLoading: loading[LIST],
    achieveSuccess: todo.success.achieve,
    achieveError: todo.error.achieve,
    writeSuccess: todo.success.write,
    writeError: todo.error.write,
  }));
  useEffect(() => {
    if (achieveSuccess) {
      alert('할 일을 성공했습니다.');
      window.location.reload();
    }
    if (achieveError) {
      alert('작업 중 오류가 발생 했습니다..');
      window.location.reload();
    }
    if (writeSuccess) {
      alert('할 일을 추가했습니다.');
      window.location.reload();
    }
    if (writeError) {
      alert('할 일 추가에 실패했습니다. 다시 시도해 주세요');
      window.location.reload();
    }
  }, [achieveSuccess, achieveError, writeSuccess, writeError]);
  //페이지 변경
  const onChangePage = useCallback(
    (e, value) => {
      setSetting({
        ...setting,
        page: value - 1,
      });
    },
    [setting],
  );
  // 탭 액션
  const onChangeTab = useCallback(
    (e, value) => {
      setSetting({
        ...setting,
        page: 0,
        tab: value,
      });
    },
    [setting],
  );
  const onChangeTabIndex = (index) => {
    setSetting({
      ...setting,
      tab: index,
    });
  };
  // 모달 액션
  const modalOpen = useCallback((id, data) => {
    setSetting({
      ...setting,
      open: true,
      cardId: id,
      todoData: data,
    });
  });
  const modalClose = useCallback(() => {
    setSetting({
      ...setting,
      open: false,
      cardId: 0,
      todoData: {},
    });
  });
  useEffect(() => {
    if (accountId !== null)
      dispatch(fetchTodo(accountId, setting.tab, setting.page));
  }, [accountId, setting.tab, setting.page]);
  useEffect(() => {
    console.log('---------Setting----------');
    console.log(setting);
  }, [setting]);
  //----------------------------모달----------------------------

  const [form, setForm] = useState({
    title: '',
    content: '',
    goal: new Date(),
  });

  const onChangeDate = (date) => {
    setForm({
      ...form,
      goal: date,
    });
  };
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onClickAchieve = useCallback(
    (e, cardId) => {
      e.preventDefault();
      console.log('리덕스 액션');
      dispatch(achieveTodo(accountId, cardId));
    },
    [accountId],
  );
  const onClickWrite = (e) => {
    e.preventDefault();
    const { title, content } = form;
    if ([title, content].includes('')) {
      alert('공백을 채워주세요');
      return;
    }
    dispatch(writeTodo(accountId, form));
  };
  useEffect(() => {
    return () => dispatch(initialize());
  }, []);
  return (
    <>
      {setting.open && (
        <StyledModal
          setting={setting}
          handleClose={modalClose}
          onChangeDate={onChangeDate}
          onChangeForm={onChangeForm}
          onClickAchieve={onClickAchieve}
          onClickWrite={onClickWrite}
          form={form}
        />
      )}
      <TodoTab
        setting={setting}
        onChangeTab={onChangeTab}
        loading={todoLoading}
        onChangeTabIndex={onChangeTabIndex}
        onChangePage={onChangePage}
      >
        {setting.tab === 0 && setting.page === 0 && (
          <StyledCard handleOpen={modalOpen} />
        )}
        {list.content &&
          list.content.map((card) => (
            <StyledCard
              data={card}
              handleClose={modalClose}
              kind
              handleOpen={modalOpen}
            />
          ))}
      </TodoTab>
      <PagenationForm>
        <Pagination
          shape="rounded"
          size="large"
          page={setting.page + 1}
          onChange={onChangePage}
          count={list.totalPages}
        />
      </PagenationForm>
    </>
  );
};

export default TodoContainer;
