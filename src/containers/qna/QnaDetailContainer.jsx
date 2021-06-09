import React, { useEffect, useState, useCallback } from 'react';

import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  DETAIL,
  COMMENT_LIST,
  fetchBoard,
  commentWrite,
  commentList,
  initialize,
} from '../../modules/qna';
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

const QnaDetailContainer = ({ location }) => {
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
  } = useSelector(({ user, qna, loading }) => ({
    id: user.account.id,
    accountId: user.account.accountId,
    detail: qna.detail,
    loading: loading[DETAIL],
    success: qna.success.comment,
    error: qna.error.comment,
    list: qna.comment,
    commentLoading: loading[COMMENT_LIST],
  }));
  const [page, setPage] = useState(0);
  const boardId = location.pathname.split('/')[3];
  useEffect(() => {
    dispatch(initialize());
    dispatch(fetchBoard('qna', boardId));
    dispatch(commentList('qna', boardId, page));
  }, []);
  const onChange = (e) => {
    const { name, value } = e.target;
    setComment(value);
  };
  const onClickComment = (e) => {
    e.preventDefault();
    dispatch(commentWrite(id, 'qna', detail.id, comment));
  };
  const onChangePage = useCallback(
    (e, value) => {
      setPage(value - 1);
    },
    [page],
  );
  useEffect(() => {
    dispatch(commentList('qna', boardId, page));
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
    return () => dispatch(initialize());
  }, []);

  return (
    <BoardDetailStyled>
      <BoardDetail
        boardType="qna"
        detail={detail}
        accountId={accountId}
        comment={comment}
        onChange={onChange}
        onClickComment={onClickComment}
        loading={loading}
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

export default withRouter(QnaDetailContainer);
