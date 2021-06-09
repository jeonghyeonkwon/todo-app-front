import React, { useEffect, useState, useCallback } from 'react';

import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  DETAIL,
  COMMENT_LIST,
  fetchBoard,
  commentWrite,
  initialize,
  commentList,
  closingAction,
} from '../../modules/study';
import BoardDetail from '../../components/main/BoardDetail';
import CommentList from '../../components/main/CommentList';
const BoardDetailStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 4;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const StudyDetailContainer = ({ location }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const {
    id,
    accountId,
    detail,
    loading,
    success,
    error,
    list,
    commentLoading,
    closing,
    closingError,
  } = useSelector(({ user, study, loading }) => ({
    id: user.account.id,
    accountId: user.account.accountId,
    detail: study.detail,
    loading: loading[DETAIL],
    success: study.success.comment,
    error: study.error.comment,
    list: study.comment,
    commentLoading: loading[COMMENT_LIST],
    closing: study.success.closing,
    closingError: study.error.closing,
  }));
  const [page, setPage] = useState(0);

  const boardId = location.pathname.split('/')[3];
  useEffect(() => {
    dispatch(initialize());
    dispatch(fetchBoard('study', boardId));
    dispatch(commentList('study', boardId, page));
  }, []);
  const onChange = (e) => {
    const { name, value } = e.target;
    setComment(value);
  };
  const onClickComment = (e) => {
    e.preventDefault();

    dispatch(commentWrite(id, 'study', detail.id, comment));
  };
  const onChangePage = useCallback(
    (e, value) => {
      setPage(value - 1);
    },
    [page],
  );
  useEffect(() => {
    dispatch(commentList('study', boardId, page));
  }, [page]);
  useEffect(() => {
    if (success) {
      alert('댓글 작성을 완료했습니다.');
      window.location.reload();
    }
    if (error) {
      alert('댓글 작성에 실패했습니다. 다시 시도해 주세요');
      window.location.reload();
    }
  }, [success, error]);
  useEffect(() => {
    if (closing) {
      alert('마감 완료 했습니다.');
      window.location.reload();
    }
    if (closingError) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
      window.location.reload();
    }
  }, [closing, closingError]);
  const onClickClosing = (e) => {
    e.preventDefault();
    dispatch(closingAction(id, detail.id));
  };
  useEffect(() => {
    return () => dispatch(initialize());
  }, []);
  return (
    <BoardDetailStyled>
      <BoardDetail
        boardType="study"
        detail={detail}
        accountId={accountId}
        comment={comment}
        onChange={onChange}
        onClickComment={onClickComment}
        loading={loading}
        onClickClosing={onClickClosing}
      />
      {list.totalElements && (
        <CommentList
          loading={commentLoading}
          list={list}
          page={page}
          onChange={onChangePage}
        />
      )}
    </BoardDetailStyled>
  );
};

export default withRouter(StudyDetailContainer);
