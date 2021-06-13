import React from 'react';
import BoardDetail from '../components/main/BoardDetail';
import { withRouter } from 'react-router-dom';
import CommentList from '../components/main/CommentList';

const BoardDetailContainer = ({ location }) => {
  const boardType = location.pathname.split('/')[1];
  const boardId = location.pathname.split('/')[3];
  return (
    <>
      <BoardDetail section={boardType}></BoardDetail>
      <CommentList boardType={boardType} boardId={boardId}></CommentList>
    </>
  );
};

export default withRouter(BoardDetailContainer);
