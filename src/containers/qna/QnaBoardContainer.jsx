import React from 'react';
import Board from '../../components/main/Board';
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
const QnaBoardContainer = () => {
  return <Board columns={columns}></Board>;
};

export default QnaBoardContainer;
