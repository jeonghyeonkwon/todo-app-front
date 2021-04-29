import React from 'react';
import Board from '../../components/main/Board';
const columns = [
  { id: 'no', label: 'No.', width: '7%' },
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
    id: 'status',
    label: '모집인원',
    width: '7%',
    align: 'center',
  },
  {
    id: 'hitCnt',
    label: '조회수',
    width: '10%',
    align: 'center',
  },
  {
    id: 'createBoard',
    label: '작성날짜',
    width: '10%',
    align: 'right',
  },
];
const StudyBoardContainer = () => {
  return <Board columns={columns}></Board>;
};

export default StudyBoardContainer;
