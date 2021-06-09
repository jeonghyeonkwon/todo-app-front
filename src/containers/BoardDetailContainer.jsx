import React, { useEffect } from 'react';
import BoardDetail from '../components/main/BoardDetail';
import { withRouter } from 'react-router-dom';
import CommentList from '../components/main/CommentList';
import styled from 'styled-components';
const BoardDetailStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 4;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const BoardDetailContainer = ({ location }) => {
  const boardType = location.pathname.split('/')[1];
  const boardId = location.pathname.split('/')[3];
  return (
    <BoardDetailStyled>
      <BoardDetail section={boardType}></BoardDetail>
      <CommentList boardType={boardType} boardId={boardId}></CommentList>
    </BoardDetailStyled>
  );
};

export default withRouter(BoardDetailContainer);
