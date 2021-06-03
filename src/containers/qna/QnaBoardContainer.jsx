import React, { useCallback, useEffect, useState } from 'react';
import Board from '../../components/main/Board';
import BoardTitle from '../../components/main/board/BoardTitle';
import styled from 'styled-components';
import BoardHead from '../../components/main/board/BoardHead';
import BoardRow from '../../components/main/board/BoardRow';
import BoardCell from '../../components/main/board/BoardCell';
import BoardBody from '../../components/main/board/BoardBody';
import Tags from '../../components/common/Tags';
import { Pagination } from '@material-ui/lab';
const columns = [
  { id: 'no', label: 'No.', width: '10%' },
  { id: 'title', label: '제목', width: '25%' },
  {
    id: 'writer',
    label: '작성자',
    width: '10%',
    align: 'right',
  },
  {
    id: 'types',
    label: '세부 분야',
    width: '20%',
    align: 'center',
  },
  {
    id: 'hitCnt',
    label: '조회수',
    width: '8%',
    align: 'center',
  },
  {
    id: 'createBoard',
    label: '작성날짜',
    width: '10%',
    align: 'right',
  },
];
const BoardContainer = styled.div`
  display: flex;
  padding: 50px;
  flex: 4;
  height: 800px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const QnaBoardContainer = () => {
  const [page, setPage] = useState(0);
  const onChangePage = useCallback((e, value) => {
    console.log(` value ${value}`);
    setPage(value - 1);
  }, []);
  useEffect(() => {
    console.log(page);
  }, [page]);
  return (
    <BoardContainer>
      <BoardTitle totalElements={40}>질문게시판</BoardTitle>
      <Board>
        <BoardHead>
          <BoardRow>
            {columns.map((column) => (
              <BoardCell key={column.id} column={column} />
            ))}
          </BoardRow>
        </BoardHead>
        <BoardBody>
          <BoardRow>
            <BoardCell>85</BoardCell>
            <BoardCell>게시글 입니다 여기 제목이 출력되는 곳이에요</BoardCell>
            <BoardCell align="right">givejeong</BoardCell>
            <BoardCell align="center">
              <Tags data="java" />
              <Tags data="html" />
            </BoardCell>
            <BoardCell align="center">5557</BoardCell>
            <BoardCell align="right">21-04-30 15:55</BoardCell>
          </BoardRow>
        </BoardBody>
      </Board>
      <Pagination
        style={{
          marginTop: 20,
          display: 'inline-block',
        }}
        size="large"
        count={10}
        value={page}
        onChange={onChangePage}
        variant="outlined"
        color="primary"
        boundaryCount={10}
      />
    </BoardContainer>
  );
};

export default QnaBoardContainer;
